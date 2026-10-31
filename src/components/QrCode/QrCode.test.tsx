import { render, screen } from '@testing-library/react';
import jsQR from 'jsqr';
import { encode } from 'uqr';
import { describe, expect, it } from 'vitest';

import { QrCode } from './QrCode';

const QUIET_ZONE = 4;
const SCALE = 6;

// Lê o SVG renderizado de volta para uma imagem (preto e branco) e a entrega ao decodificador.
const decodeSvg = (svg: Element) => {
  const total = Number(svg.getAttribute('viewBox')?.split(' ')[2]);
  const grid = Array.from({ length: total }, () => Array.from<boolean>({ length: total }).fill(false));
  const path = svg.querySelector('path')?.getAttribute('d') ?? '';
  for (const [, x, y, w] of path.matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g)) {
    for (let i = 0; i < Number(w); i += 1) {
      grid[Number(y)]![Number(x) + i] = true;
    }
  }
  const side = total * SCALE;
  const data = new Uint8ClampedArray(side * side * 4);
  for (let py = 0; py < side; py += 1) {
    for (let px = 0; px < side; px += 1) {
      const dark = grid[Math.floor(py / SCALE)]![Math.floor(px / SCALE)];
      const offset = (py * side + px) * 4;
      data.fill(dark ? 0 : 255, offset, offset + 3);
      data[offset + 3] = 255;
    }
  }
  return jsQR(data, side, side)?.data;
};

describe('QrCode', () => {
  it.each([
    'GUIDU-7K3Q-92XM',
    'https://guidu.chat/c/AbCdEf?x=1&y=2',
    `Cupom ação ç ã ${'longo '.repeat(20)}`
  ])('decodifica o SVG de volta para o valor: %s', (value) => {
    render(<QrCode value={value} aria-label="Código do cupom" />);
    const svg = screen.getByRole('img', { name: 'Código do cupom' });
    expect(decodeSvg(svg)).toBe(value);
  });

  it('desenha exatamente a matriz de correção média, com margem de silêncio de 4 módulos', () => {
    const value = 'GUIDU-7K3Q-92XM';
    const matrix = encode(value, { ecc: 'M', border: 0 }).data;
    const { container } = render(<QrCode value={value} aria-label="x" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('viewBox')).toBe(`0 0 ${matrix.length + QUIET_ZONE * 2} ${matrix.length + QUIET_ZONE * 2}`);
    const d = svg.querySelector('path')!.getAttribute('d')!;
    const dark = Array.from(d.matchAll(/h(\d+)v1/g)).reduce((sum, m) => sum + Number(m[1]), 0);
    expect(dark).toBe(matrix.flat().filter(Boolean).length);
    // Nenhum módulo escuro dentro da margem.
    const starts = Array.from(d.matchAll(/M(\d+) (\d+)h/g));
    expect(starts.every(([, x, y]) => Number(x) >= QUIET_ZONE && Number(y) >= QUIET_ZONE)).toBe(true);
  });

  it('tem role="img", o nome do app, fundo branco e módulos escuros', () => {
    const { container } = render(<QrCode value="abc" aria-label="Código" size={160} />);
    const svg = screen.getByRole('img', { name: 'Código' });
    expect(svg.getAttribute('width')).toBe('160');
    expect(container.querySelector('rect')?.getAttribute('fill')).toBe('#fff');
    expect(container.querySelector('path')?.getAttribute('fill')).toBe('#000');
  });

  it('não vaza o valor para atributos nem para texto', () => {
    const value = 'SEGREDO-123';
    const { container } = render(<QrCode value={value} aria-label="Código" />);
    expect(container.innerHTML).not.toContain(value);
  });
});
