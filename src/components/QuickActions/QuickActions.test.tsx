import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RatingStars } from '../RatingStars';
import { QuickAction, QuickActions } from './QuickActions';

describe('QuickAction', () => {
  it('vira o link do app com asChild e mantém o rótulo', () => {
    render(
      <QuickActions aria-label="Ações">
        <QuickAction asChild icon={null} label="Ligar"><a href="tel:+5522999998884" /></QuickAction>
      </QuickActions>
    );
    expect(screen.getByRole('link', { name: 'Ligar' }).getAttribute('href')).toBe('tel:+5522999998884');
  });

  it('é um botão de verdade sem asChild', () => {
    render(<QuickAction icon={null} label="Mais" />);
    expect(screen.getByRole('button', { name: 'Mais' }).getAttribute('type')).toBe('button');
  });
});

describe('RatingStars', () => {
  it('preenche conforme a nota, dentro de 0 a 5, e tem nome', () => {
    const { rerender, container } = render(<RatingStars value={4} label="Nota 4 de 5" />);
    const filled = () => (container.querySelector('[style*="width"]') as HTMLElement).style.width;
    expect(screen.getByRole('img', { name: 'Nota 4 de 5' })).toBeTruthy();
    expect(filled()).toBe('80%');
    rerender(<RatingStars value={9} label="Nota" />);
    expect(filled()).toBe('100%');
  });
});
