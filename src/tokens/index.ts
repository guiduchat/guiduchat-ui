// Tokens da marca guidu.chat em TypeScript puro, sem DOM (U3 do guidu-chat):
// o app Expo usa daqui, e o SCSS do kit usa os mesmos valores (o teste
// tokens.test.ts confere). Mudou a identidade visual? Troque aqui e no
// src/styles/variables, nunca nos componentes.

export const brand = {
  // Cor principal. Clara demais para texto sobre fundo claro: use accentStrong.
  accent: '#e1fb40',
  accentHover: '#e8fc6c',
  accentPressed: '#cde52e',
  // Texto e ícone sobre a cor principal (contraste 16,8:1).
  onAccent: '#0b0c0d',
  // Texto, ícone e controle "da marca" sobre fundo claro (5,5:1 ou mais).
  accentStrong: '#566600'
} as const;

// Verde do cupom das ofertas (desenho aprovado pelo Marcelo, 31/10/2026). Texto e ícone
// sobre ele usam os tokens estáticos, escuros nos dois temas.
export const coupon = {
  ticket: '#c4d4ca',
  photo: '#e9f2ed'
} as const;

export const fontFamily =
  "Outfit, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// Tokens do tema que dependem da marca, com o nome da variável CSS do kit.
export const palette = {
  light: {
    '--text-themed': brand.accentStrong,
    '--icon-themed': brand.accentStrong,
    '--controls-active': brand.accentStrong,
    '--button-primary': brand.accent,
    '--states-button-primary-hover': brand.accentHover,
    '--states-button-primary-pressed': brand.accentPressed,
    '--counter-themed': brand.accent,
    '--text-on-accent': brand.onAccent,
    '--background-coupon': coupon.ticket,
    '--background-coupon-photo': coupon.photo
  },
  dark: {
    '--text-themed': brand.accent,
    '--icon-themed': brand.accent,
    '--controls-active': brand.accent,
    '--button-primary': brand.accent,
    '--states-button-primary-hover': brand.accentHover,
    '--states-button-primary-pressed': brand.accentPressed,
    '--counter-themed': brand.accent,
    '--text-on-accent': brand.onAccent,
    '--background-coupon': coupon.ticket,
    '--background-coupon-photo': coupon.photo
  }
} as const;

export type ColorScheme = keyof typeof palette;
