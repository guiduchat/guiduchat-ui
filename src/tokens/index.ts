// Tokens da marca guidu.chat em TypeScript puro, sem DOM (U3 do guidu-chat):
// o app Expo usa daqui, e o SCSS do kit usa os mesmos valores (o teste
// tokens.test.ts confere). Mudou a identidade visual? Troque aqui e no
// src/styles/variables, nunca nos componentes.

export const brand = {
  // Cor principal. Clara demais para texto sobre fundo claro: use accentStrong.
  accent: '#e1fb40',
  accentHover: '#e8fc6c',
  accentPressed: '#cde52e',
  // Lima de preenchimento no tema claro (Marcelo, 01/11/2026): botão principal, contador, destaques.
  // Hover e pressionado são derivados (a confirmar).
  accentFill: '#c8e805',
  accentFillHover: '#d3ec37',
  accentFillPressed: '#b4d105',
  // Texto e ícone sobre a cor principal (contraste 16,8:1).
  onAccent: '#0b0c0d',
  // Texto, ícone e controle "da marca" sobre fundo claro (5,5:1 ou mais).
  accentStrong: '#566600',
  // Verde de texto e ícone no tema claro (Marcelo, 01/11/2026). Contraste menor que o AA: decisão dele.
  accentLight: '#5c6b02'
} as const;

// Verde do cupom das ofertas (desenho aprovado pelo Marcelo, 31/10/2026). Texto e ícone
// sobre ele usam os tokens estáticos, escuros nos dois temas.
export const coupon = {
  ticket: '#c4d4ca',
  photo: '#e9f2ed',
  hovered: 'rgb(6 7 8 / 0.12)',
  pressed: 'rgb(6 7 8 / 0.2)',
  disabledText: '#4a5651'
} as const;

export const fontFamily =
  "Outfit, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// Camadas dos cartões por ator (Marcelo, 01/11/2026). `hub` é o padrão (área da pessoa: cartão de
// fora mais escuro); `guidu` (loja e guidu: cartão de fora mais claro). O SCSS repete estes valores.
export const surfaces = {
  light: {
    page: '#ffffff',
    guidu: { outer: '#f7f7f7', inner: '#ededed', band: '#f7f7f7', pagerInactive: '#c0c0c0' },
    hub: { outer: '#ededed', inner: '#f7f7f7', band: '#ededed', pagerInactive: '#acacac' }
  },
  dark: {
    page: '#232323',
    guidu: { outer: '#404040', inner: '#2d2d2d', band: '#404040', pagerInactive: '#7b7b7b' },
    hub: { outer: '#2d2d2d', inner: '#404040', band: '#2d2d2d', pagerInactive: '#858585' }
  },
  // Estrela de nota (StarTile): o quadrado é o mesmo nos dois temas.
  starTileBackground: '#2d2d2d',
  // Estrela apagada (nota abaixo de 5): branco a 24% sobre o quadrado, igual nos dois temas.
  starTileEmptyStar: 'rgb(255 255 255 / 0.24)',
  // Fundo de campo de formulário no claro: #ededed, ou #ffffff sobre uma camada que também é #ededed.
  fieldLight: {
    default: '#ededed',
    guidu: { outer: '#ededed', inner: '#ffffff', band: '#ededed' },
    hub: { outer: '#ffffff', inner: '#ededed', band: '#ffffff' }
  },
  // Barrinha ativa do Carousel: segue o ator e o tema. Claro: lima no hub e verde de texto no guidu;
  // escuro: limão nos dois.
  pagerActive: {
    light: { guidu: brand.accentLight, hub: brand.accentFill },
    dark: { guidu: brand.accent, hub: brand.accent }
  }
} as const;

// Botão secundário (Marcelo, 01/11/2026): fundo #c0c0c0 no claro e #404040 no escuro; texto preto/branco
// (--text-primary). Hover, pressionado e desativado são derivados do fundo, a confirmar.
const secondaryButton = {
  light: { background: '#c0c0c0', hover: '#b5b5b5', pressed: '#a8a8a8', disabled: 'rgb(192 192 192 / 0.5)' },
  dark: { background: '#404040', hover: '#4a4a4a', pressed: '#373737', disabled: 'rgb(64 64 64 / 0.5)' }
} as const;

const surfaceTokens = (scheme: 'light' | 'dark') => ({
  '--page-background': surfaces[scheme].page,
  '--surface-outer-guidu': surfaces[scheme].guidu.outer,
  '--surface-inner-guidu': surfaces[scheme].guidu.inner,
  '--surface-band-guidu': surfaces[scheme].guidu.band,
  '--pager-inactive-guidu': surfaces[scheme].guidu.pagerInactive,
  '--surface-outer-hub': surfaces[scheme].hub.outer,
  '--surface-inner-hub': surfaces[scheme].hub.inner,
  '--surface-band-hub': surfaces[scheme].hub.band,
  '--pager-inactive-hub': surfaces[scheme].hub.pagerInactive,
  '--pager-active-guidu': surfaces.pagerActive[scheme].guidu,
  '--pager-active-hub': surfaces.pagerActive[scheme].hub,
  '--star-tile-background': surfaces.starTileBackground,
  '--star-tile-star': scheme === 'light' ? brand.accentFill : brand.accent,
  '--star-tile-empty-star': surfaces.starTileEmptyStar,
  '--button-secondary-contrast': secondaryButton[scheme].background,
  '--states-button-secondary-contrast-hover': secondaryButton[scheme].hover,
  '--states-button-secondary-contrast-pressed': secondaryButton[scheme].pressed,
  '--states-button-secondary-contrast-disabled': secondaryButton[scheme].disabled
}) as const;

const fieldOnLayers = {
  '--field-on-outer-guidu': surfaces.fieldLight.guidu.outer,
  '--field-on-inner-guidu': surfaces.fieldLight.guidu.inner,
  '--field-on-band-guidu': surfaces.fieldLight.guidu.band,
  '--field-on-outer-hub': surfaces.fieldLight.hub.outer,
  '--field-on-inner-hub': surfaces.fieldLight.hub.inner,
  '--field-on-band-hub': surfaces.fieldLight.hub.band
} as const;

// Tokens do tema que dependem da marca, com o nome da variável CSS do kit.
export const palette = {
  light: {
    ...surfaceTokens('light'),
    '--text-themed': brand.accentLight,
    '--icon-themed': brand.accentLight,
    '--controls-active': brand.accentStrong,
    '--button-primary': brand.accentFill,
    '--states-button-primary-hover': brand.accentFillHover,
    '--states-button-primary-pressed': brand.accentFillPressed,
    '--counter-themed': brand.accentFill,
    '--field-background': surfaces.fieldLight.default,
    '--field-background-contrast': surfaces.fieldLight.default,
    ...fieldOnLayers,
    '--text-on-accent': brand.onAccent,
    '--background-coupon': coupon.ticket,
    '--background-coupon-photo': coupon.photo,
    '--states-background-coupon-hovered': coupon.hovered,
    '--states-background-coupon-pressed': coupon.pressed,
    '--states-text-coupon-disabled': coupon.disabledText
  },
  dark: {
    ...surfaceTokens('dark'),
    '--text-themed': brand.accent,
    '--icon-themed': brand.accent,
    '--controls-active': brand.accent,
    '--button-primary': brand.accent,
    '--states-button-primary-hover': brand.accentHover,
    '--states-button-primary-pressed': brand.accentPressed,
    '--counter-themed': brand.accent,
    '--text-on-accent': brand.onAccent,
    '--background-coupon': coupon.ticket,
    '--background-coupon-photo': coupon.photo,
    '--states-background-coupon-hovered': coupon.hovered,
    '--states-background-coupon-pressed': coupon.pressed,
    '--states-text-coupon-disabled': coupon.disabledText
  }
} as const;

export type ColorScheme = keyof typeof palette;
