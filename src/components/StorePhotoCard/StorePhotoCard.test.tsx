import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { StorePhotoCard } from './StorePhotoCard';

describe('StorePhotoCard', () => {
  it('mostra categoria, nome, endereço e nota', () => {
    render(<StorePhotoCard category="Restaurantes & Bares" name="Padaria Flor de Geribá" address="Av. Geribá, 345" rating="4,8 (235)" />);
    expect(screen.getByRole('heading', { name: 'Padaria Flor de Geribá' })).toBeTruthy();
    for (const text of ['Restaurantes & Bares', 'Av. Geribá, 345', '4,8 (235)']) expect(screen.getByText(text)).toBeTruthy();
  });

  it('sem foto mostra a reserva e não cria imagem; com foto usa o alt do app', () => {
    const { rerender } = render(<StorePhotoCard name="N" />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<StorePhotoCard name="N" image={{ src: 'a.jpg', alt: 'Fachada' }} />);
    expect(screen.getByRole('img', { name: 'Fachada' }).getAttribute('src')).toBe('a.jpg');
  });

  it('a seta é botão com o nome do app e avisa o clique', () => {
    const onClick = vi.fn();
    render(<StorePhotoCard name="N" action={{ label: 'Abrir Padaria', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Padaria' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com asChild a seta vira o link do app; sem action não há botão', () => {
    const { rerender } = render(<StorePhotoCard name="N" action={{ label: 'Abrir Padaria', asChild: true, children: <a href="/places/padaria" /> }} />);
    expect(screen.getByRole('link', { name: 'Abrir Padaria' }).getAttribute('href')).toBe('/places/padaria');
    expect(screen.queryByRole('button')).toBeNull();
    rerender(<StorePhotoCard name="N" />);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
