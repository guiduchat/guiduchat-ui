import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ListingCard } from './ListingCard';

describe('ListingCard', () => {
  it('local: tipo, nome, endereço e nota', () => {
    render(
      <ListingCard eyebrow="Restaurantes & Bares" title="Padaria Flor de Geribá" subtitle="Av. Geribá, 345" rating="4,8 (235)" />
    );
    expect(screen.getByRole('heading', { name: 'Padaria Flor de Geribá' })).toBeTruthy();
    for (const text of ['Restaurantes & Bares', 'Av. Geribá, 345', '4,8 (235)']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('item: o preço tem prioridade sobre a nota e mostra o complemento', () => {
    render(<ListingCard title="Cerveja" subtitle="Depósito" price="R$54,00" priceNote="(12 unds)" rating="4,8" />);
    expect(screen.getByText('R$54,00')).toBeTruthy();
    expect(screen.getByText('(12 unds)')).toBeTruthy();
    expect(screen.queryByText('4,8')).toBeNull();
  });

  it('sem foto não cria imagem; com foto usa o alt do app', () => {
    const { rerender } = render(<ListingCard title="N" />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<ListingCard title="N" image={{ src: 'a.jpg', alt: 'Fachada' }} />);
    expect(screen.getByRole('img', { name: 'Fachada' }).getAttribute('src')).toBe('a.jpg');
  });

  it('a seta é botão com o nome do app, ou o link com asChild', () => {
    const onClick = vi.fn();
    const { rerender } = render(<ListingCard title="N" action={{ label: 'Abrir', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<ListingCard title="N" action={{ label: 'Abrir', asChild: true, children: <a href="/places/padaria" /> }} />);
    expect(screen.getByRole('link', { name: 'Abrir' }).getAttribute('href')).toBe('/places/padaria');
  });
});
