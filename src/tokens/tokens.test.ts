// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { brand, coupon, fontFamily, palette, surfaces } from './index';

const read = (path: string): string =>
  readFileSync(new URL(path, import.meta.url), 'utf8');

// Lê as variáveis de um @mixin do SCSS: { '--nome': 'valor' }.
const mixinVariables = (scss: string, mixin: string): Record<string, string> => {
  const start = scss.indexOf(`@mixin ${mixin}`);
  const end = scss.indexOf('\n}', start);
  const body = scss.slice(start, end);
  return Object.fromEntries(
    [...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])
  );
};

const luminance = (hex: string): number => {
  const [r, g, b] = (hex.slice(1).match(/\w\w/g) ?? []).map((c) => {
    const v = Number.parseInt(c, 16) / 255;
    return v <= 0.039_28 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('tokens da marca', () => {
  const appearance = read('../styles/variables/appearance.scss');

  it.each(['light', 'dark'] as const)('o SCSS do tema %s usa os valores de @guiduchat/ui/tokens', (scheme) => {
    const scss = mixinVariables(appearance, scheme === 'light' ? 'lightPalette' : 'darkPalette');
    for (const [name, value] of Object.entries(palette[scheme])) {
      expect(scss[name], name).toBe(value);
    }
  });

  it('a fonte do SCSS é a de @guiduchat/ui/tokens', () => {
    const typography = read('../styles/variables/typography.scss');
    const families = [...typography.matchAll(/--family-(?:base|headers):\s*([^;]+);/g)].map(([, v]) => v);
    expect(families.length).toBeGreaterThan(0);
    for (const family of families) expect(family).toBe(fontFamily);
  });

  it("o texto escuro estático tem contraste AA sobre o cupom, nos dois temas", () => {
    for (const bg of [coupon.ticket, coupon.photo]) {
      expect(contrast("#060708", bg), bg).toBeGreaterThanOrEqual(4.5);
    }
    // Desativado: cor escura própria do cupom, legível nos dois verdes.
    for (const bg of [coupon.ticket, coupon.photo]) {
      expect(contrast(coupon.disabledText, bg), bg).toBeGreaterThanOrEqual(4.5);
    }
    for (const scheme of ["light", "dark"] as const) {
      expect(palette[scheme]["--states-text-coupon-disabled"]).toBe(coupon.disabledText);
      expect(palette[scheme]["--background-coupon"]).toBe(coupon.ticket);
      expect(palette[scheme]["--background-coupon-photo"]).toBe(coupon.photo);
    }
  });

  it('as camadas por ator seguem a decisão do Marcelo (01/11/2026), nos dois temas', () => {
    expect(surfaces.light.guidu).toEqual({ outer: '#f7f7f7', inner: '#e3e3e3', band: '#f7f7f7', pagerInactive: '#c0c0c0' });
    expect(surfaces.light.hub).toEqual({ outer: '#e3e3e3', inner: '#f7f7f7', band: '#e3e3e3', pagerInactive: '#acacac' });
    expect(surfaces.dark.guidu).toEqual({ outer: '#404040', inner: '#2d2d2d', band: '#404040', pagerInactive: '#7b7b7b' });
    expect(surfaces.dark.hub).toEqual({ outer: '#2d2d2d', inner: '#404040', band: '#2d2d2d', pagerInactive: '#858585' });
    expect(palette.light['--page-background']).toBe('#ffffff');
    expect(palette.dark['--page-background']).toBe('#191919');
    // Guidu e hub trocam fora e dentro entre si.
    for (const scheme of ['light', 'dark'] as const) {
      expect(surfaces[scheme].guidu.outer).toBe(surfaces[scheme].hub.inner);
      expect(surfaces[scheme].guidu.inner).toBe(surfaces[scheme].hub.outer);
    }
  });

  it('o verde de texto e a barrinha ativa seguem a decisão do Marcelo (01/11/2026)', () => {
    expect(palette.light['--text-themed']).toBe('#5c6b02');
    expect(palette.light['--icon-themed']).toBe('#5c6b02');
    expect(palette.light['--pager-active']).toBe('#5c6b02');
    expect(palette.dark['--text-themed']).toBe('#e1fb40');
    expect(palette.dark['--pager-active']).toBe('#e1fb40');
    // Decisão dele: o verde #5c6b02 do tema claro. Nas camadas claras (página, #f7f7f7 e #e3e3e3) passa do
    // AA de 4,5:1 para texto pequeno. Registrado aqui e no CHANGELOG; não troque a cor sem nova decisão.
    for (const bg of ['#ffffff', '#f7f7f7', '#e3e3e3']) {
      expect(contrast('#5c6b02', bg), bg).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('tem contraste AA (4,5:1) para texto', () => {
    // Texto sobre a cor da marca.
    expect(contrast(brand.onAccent, brand.accent)).toBeGreaterThanOrEqual(4.5);
    // Texto da marca sobre os fundos claros (primário, secundário, superfície).
    for (const bg of ['#ffffff', '#f5f7fa', '#edeef2']) {
      expect(contrast(brand.accentStrong, bg), bg).toBeGreaterThanOrEqual(4.5);
    }
    // Cor da marca sobre os fundos escuros.
    for (const bg of ['#0f0f12', '#17181c', '#25262d']) {
      expect(contrast(brand.accent, bg), bg).toBeGreaterThanOrEqual(4.5);
    }
  });
});
