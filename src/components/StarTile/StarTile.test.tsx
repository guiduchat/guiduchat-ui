import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StarTile } from './StarTile';

describe('StarTile', () => {
  it('sem label é decorativo', () => {
    const { container } = render(<StarTile />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });

  it('com label tem nome acessível', () => {
    render(<StarTile label="Nota 4,8" />);
    expect(screen.getByRole('img', { name: 'Nota 4,8' })).toBeTruthy();
  });

  it('o tamanho vem da prop: estrela de 70% e raio de 25%', () => {
    const { container } = render(<StarTile size={40} />);
    const tile = container.firstElementChild as HTMLElement;
    expect(tile.style.width).toBe('40px');
    expect(tile.style.borderRadius).toBe('10px');
    expect(tile.querySelector('svg')?.getAttribute('width')).toBe('28');
  });
});
