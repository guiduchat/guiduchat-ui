import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { StoreResultCard } from './StoreResultCard';
import { StoreResultCardSkeleton } from './StoreResultCardSkeleton';

const base = {
  name: 'Biquíni Floral Maria Bonita Coleção 2027',
  offers: 'ofertas',
  currency: 'R$',
  price: '240',
  storeName: 'Sunset Alternative',
  address: 'Rua das Pedras, 34',
  delivery: 'Retirada ou entrega',
  status: 'Aberto até 20h'
};

describe('StoreResultCard', () => {
  it('mostra item, preço, loja, entrega e situação', () => {
    render(<StoreResultCard {...base} />);
    expect(screen.getByRole('heading', { name: base.name })).toBeTruthy();
    for (const text of ['R$', 'Sunset Alternative', 'Rua das Pedras, 34', 'Retirada ou entrega', 'Aberto até 20h']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.getByText('240', { exact: false })).toBeTruthy();
  });

  it('sem foto não cria imagem; com foto usa o alt do app', () => {
    const { rerender } = render(<StoreResultCard {...base} />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<StoreResultCard {...base} image={{ src: 'a.jpg', alt: 'Biquíni' }} />);
    expect(screen.getByRole('img', { name: 'Biquíni' }).getAttribute('src')).toBe('a.jpg');
  });

  it('salvar tem aria-pressed e avisa a troca', () => {
    const onPressedChange = vi.fn();
    render(<StoreResultCard {...base} save={{ label: 'Salvar item', pressed: false, onPressedChange }} />);
    const toggle = screen.getByRole('button', { name: 'Salvar item' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('o botão avisa o clique; com asChild vira o link do app', () => {
    const onClick = vi.fn();
    const { unmount } = render(<StoreResultCard {...base} action={{ label: 'Ver Opções', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ver Opções' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    unmount();
    render(<StoreResultCard {...base} action={{ label: 'Ver Opções', asChild: true, children: <a href="/search/stores/x" /> }} />);
    expect(screen.getByRole('link', { name: 'Ver Opções' }).getAttribute('href')).toBe('/search/stores/x');
  });

  it('o esqueleto usa as classes do cartão', () => {
    const { container } = render(<StoreResultCardSkeleton />);
    expect(container.innerHTML).toMatch(/StoreResultCard__store/);
    expect(container.innerHTML).toMatch(/StoreResultCard__footer/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
