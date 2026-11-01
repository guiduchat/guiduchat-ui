import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { StoreOfferCard } from './StoreOfferCard';

describe('StoreOfferCard', () => {
  it('mostra categoria, nome, endereço, nota e a promoção', () => {
    render(
      <StoreOfferCard
        category="Restaurantes & Bares"
        name="Padaria Flor de Geribá"
        address="Av. Geribá, 345"
        rating="4,8 (235)"
        promo="20% de desconto nos produtos da linha artesanal"
      />
    );
    expect(screen.getByRole('heading', { name: 'Padaria Flor de Geribá' })).toBeTruthy();
    for (const text of ['Restaurantes & Bares', 'Av. Geribá, 345', '4,8 (235)', '20% de desconto nos produtos da linha artesanal']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('sem promoção a faixa não aparece; sem foto não cria imagem', () => {
    const { container } = render(<StoreOfferCard name="Padaria" />);
    expect(container.innerHTML).not.toMatch(/__promo/);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('com foto usa o alt do app', () => {
    render(<StoreOfferCard name="N" image={{ src: 'a.jpg', alt: 'Fachada' }} />);
    expect(screen.getByRole('img', { name: 'Fachada' }).getAttribute('src')).toBe('a.jpg');
  });

  it('a seta é botão com o nome do app e avisa o clique', () => {
    const onClick = vi.fn();
    render(<StoreOfferCard name="N" action={{ label: 'Abrir Padaria', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Padaria' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com asChild a seta vira o link do app', () => {
    render(<StoreOfferCard name="N" action={{ label: 'Abrir Padaria', asChild: true, children: <a href="/places/padaria" /> }} />);
    expect(screen.getByRole('link', { name: 'Abrir Padaria' }).getAttribute('href')).toBe('/places/padaria');
    expect(screen.queryByRole('button')).toBeNull();
  });
});
