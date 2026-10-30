import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type IconName, icons } from '../../icons/catalog';
import { Icon } from './Icon';

describe('Icon', () => {
  it('usa os padrões da direção visual: 24 px, traço 1,5 e a cor do texto', () => {
    const { container } = render(<Icon icon={icons.search} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
    const path = svg?.querySelector('path');
    expect(path?.getAttribute('stroke-width')).toBe('1.5');
    expect(path?.getAttribute('stroke')).toBe('currentColor');
  });

  it('é decorativo sem label e tem nome com label', () => {
    const { container, rerender } = render(<Icon icon={icons.cart} />);
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');

    rerender(<Icon icon={icons.cart} label="Carrinho" />);
    expect(screen.getByRole('img', { name: 'Carrinho' })).toBeTruthy();
  });

  it('aceita outro tamanho e outro traço', () => {
    const { container } = render(<Icon icon={icons.filter} size={20} strokeWidth={2} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.querySelector('path')?.getAttribute('stroke-width')).toBe('2');
  });
});

describe('catálogo de ícones', () => {
  it('tem os nomes por função que o kit e os apps usam', () => {
    expect(Object.keys(icons).sort()).toEqual([
      'accessible', 'account', 'add', 'apple', 'arrowForward', 'attach', 'back', 'call', 'card',
      'cart', 'chats', 'check', 'chevronDown', 'chevronRight', 'clock', 'close', 'closeCircle',
      'contactless', 'discover', 'drink', 'eye', 'eyeOff', 'facebook', 'filter', 'food', 'google',
      'image', 'info', 'instagram', 'kids', 'location', 'mail', 'map', 'menu', 'mic', 'more',
      'offline', 'parking', 'places', 'priceLevel', 'save', 'saved', 'search', 'send', 'share',
      'star', 'thumbsDown', 'thumbsUp', 'tiktok', 'warning', 'website', 'whatsapp'
    ]);
  });

  it('todo item é um ícone válido (lista de traços SVG)', () => {
    for (const name of Object.keys(icons) as IconName[]) {
      const icon = icons[name];
      expect(Array.isArray(icon) && icon.length > 0, name).toBe(true);
      for (const [tag, attrs] of icon) {
        expect(typeof tag, name).toBe('string');
        expect(typeof attrs, name).toBe('object');
      }
    }
  });
});
