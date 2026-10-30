// Confere no pacote final (dist/index.js) que todo ícone SVG tem viewBox.
// Sem ele, o ícone desenhado em outro tamanho sai cortado. O Storybook usa
// outro plugin de SVG, então só o pacote mostra esse problema.
import { readFileSync } from 'node:fs';

const bundle = readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8');
const svgs = bundle.match(/createElement\("svg",\w+\(\{[^}]*\}/g) ?? [];
const missing = svgs.filter((svg) => !svg.includes('viewBox'));

if (svgs.length === 0) {
  console.error('Nenhum ícone SVG encontrado em dist/index.js: o formato do build mudou?');
  process.exit(1);
}
if (missing.length > 0) {
  console.error(`${missing.length} de ${svgs.length} ícones sem viewBox em dist/index.js:`);
  for (const svg of missing) console.error(`  ${svg.slice(0, 120)}`);
  process.exit(1);
}
console.log(`${svgs.length} ícones, todos com viewBox.`);
