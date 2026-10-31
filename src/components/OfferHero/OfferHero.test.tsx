import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { OfferHero } from './OfferHero';

describe('OfferHero', () => {
  it('mostra a foto com o alt do app', () => {
    render(<OfferHero image={{ src: 'foto.jpg', alt: 'Picanha' }} />);
    expect(screen.getByRole('img', { name: 'Picanha' }).getAttribute('src')).toBe('foto.jpg');
  });

  it('sem foto e sem salvar não quebra nem mostra imagem ou botão', () => {
    render(<OfferHero data-testid="hero" />);
    expect(screen.getByTestId('hero')).toBeTruthy();
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('o marcador mostra aria-pressed e avisa a troca', () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(<OfferHero save={{ label: 'Salvar oferta', pressed: false, onPressedChange }} />);
    const toggle = screen.getByRole('button', { name: 'Salvar oferta' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(toggle.getAttribute('type')).toBe('button');
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    rerender(<OfferHero save={{ label: 'Salvar oferta', pressed: true, onPressedChange }} />);
    expect(screen.getByRole('button', { name: 'Salvar oferta' }).getAttribute('aria-pressed')).toBe('true');
  });
});
