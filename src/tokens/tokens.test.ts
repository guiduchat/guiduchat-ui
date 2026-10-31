// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { brand, coupon, fontFamily, palette } from './index';

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
    for (const scheme of ["light", "dark"] as const) {
      expect(palette[scheme]["--background-coupon"]).toBe(coupon.ticket);
      expect(palette[scheme]["--background-coupon-photo"]).toBe(coupon.photo);
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
