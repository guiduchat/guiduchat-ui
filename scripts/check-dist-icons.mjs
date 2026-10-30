// Confere o pacote final: os ícones embutidos são só os do catálogo
// (src/icons/catalog.ts) e o dist/icons.js cabe no teto. Se alguém importar o
// índice da Hugeicons ('@hugeicons/core-free-icons'), entram os 6.000 ícones
// e este passo falha antes de publicar.
import { readdirSync, readFileSync, statSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const catalog = readFileSync(new URL('../src/icons/catalog.ts', import.meta.url), 'utf8');
const expected = (catalog.match(/^import \w+ from '@hugeicons\/core-free-icons\/\w+';$/gm) ?? []).length;

const bundles = readdirSync(dist).filter((file) => file.endsWith('.js'));
const code = bundles.map((file) => readFileSync(new URL(file, dist), 'utf8')).join('\n');
// Cada ícone começa com [["path"|"circle"|..., {...}].
const embedded = (code.match(/\[\["(path|circle|rect|line|polyline|polygon|ellipse)",/g) ?? []).length;

const MAX_ICONS_KB = 30;
const iconsKb = statSync(new URL('icons.js', dist)).size / 1024;

const errors = [];
if (expected === 0) errors.push('Nenhum ícone no catálogo: o formato de catalog.ts mudou?');
if (embedded !== expected) errors.push(`${embedded} ícones embutidos no dist; o catálogo tem ${expected}.`);
if (iconsKb > MAX_ICONS_KB) errors.push(`dist/icons.js com ${iconsKb.toFixed(1)} KB, acima do teto de ${MAX_ICONS_KB} KB.`);

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log(`${embedded} ícones no dist (igual ao catálogo); dist/icons.js com ${iconsKb.toFixed(1)} KB.`);
