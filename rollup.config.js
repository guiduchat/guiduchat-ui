import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  // Pontos de entrada: os componentes (com "use client" para o
  // Next.js) e os tokens em TypeScript puro, sem DOM (@guiduchat/ui/tokens),
  // que o app Expo e o servidor importam.
  input: {
    index: 'src/index.ts',
    tokens: 'src/tokens/index.ts',
    // Catálogo de ícones (dados puros) para o app nativo e o servidor.
    icons: 'src/icons/index.ts'
  },
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].js',
    // Os componentes usam hooks e o navegador: o pacote principal inteiro é
    // de cliente no Next.js. O banner entra antes do terser; o terser
    // está configurado para não descartar a diretiva.
    banner: (chunk) => (chunk.name === 'index' ? "'use client';" : '')
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.build.json' }),
    resolve(),
    peerDepsExternal(),
    postcss({
      inject: false,
      extract: 'styles.css',
      minimize: true,
      use: {
        sass: {
          silenceDeprecations: ['legacy-js-api']
        }
      },
      modules: {
        generateScopedName: '[local]__[hash:base64:3]'
      }
    }),
    // directives: false mantém o 'use client' do banner.
    terser({ compress: { directives: false } })
  ]
};
