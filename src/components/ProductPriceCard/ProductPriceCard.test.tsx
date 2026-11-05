import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ProductPriceCard } from './ProductPriceCard';
import { ProductPriceCardSkeleton } from './ProductPriceCardSkeleton';

const offersText = (
  <>
    <strong>64</strong>
    {' '}
    ofertas em
    <em>cervejas</em>
    {' '}
    a partir de:
  </>
);

const base = {
  name: 'Cerveja Corona Extra Long Neck 330ml',
  brand: 'Marca: Corona',
  rating: '4,8 (235)',
  offers: offersText,
  currency: 'R$',
  price: '7,49',
  unit: '(unidade de 330ml)',
  delivery: 'Retirada ou entrega disponíveis'
};

describe('ProductPriceCard', () => {
  it('mostra nome, marca, nota, ofertas, preço, unidade e entrega', () => {
    render(<ProductPriceCard {...base} />);
    expect(screen.getByRole('heading', { name: base.name })).toBeTruthy();
    for (const text of ['Marca: Corona', '4,8 (235)', 'R$', '7,49', '(unidade de 330ml)', 'Retirada ou entrega disponíveis', 'cervejas']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('sem foto não cria imagem; com foto usa o alt do app', () => {
    const { rerender } = render(<ProductPriceCard {...base} />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<ProductPriceCard {...base} image={{ src: 'a.jpg', alt: 'Garrafa' }} />);
    expect(screen.getByRole('img', { name: 'Garrafa' }).getAttribute('src')).toBe('a.jpg');
  });

  it('salvar é botão com aria-pressed e avisa a troca', () => {
    const onPressedChange = vi.fn();
    render(<ProductPriceCard {...base} save={{ label: 'Salvar produto', pressed: false, onPressedChange }} />);
    const toggle = screen.getByRole('button', { name: 'Salvar produto' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('o botão da faixa avisa o clique; com asChild vira o link do app', () => {
    const onClick = vi.fn();
    const { unmount } = render(<ProductPriceCard {...base} action={{ label: 'Comparar Ofertas', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Comparar Ofertas' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    unmount();
    render(<ProductPriceCard {...base} action={{ label: 'Comparar Ofertas', asChild: true, children: <a href="/products/1" /> }} />);
    expect(screen.getByRole('link', { name: 'Comparar Ofertas' }).getAttribute('href')).toBe('/products/1');
    expect(screen.queryByRole('button', { name: 'Comparar Ofertas' })).toBeNull();
  });

  it('o esqueleto usa as classes do cartão e some do leitor de tela', () => {
    const { container } = render(<ProductPriceCardSkeleton />);
    expect(container.innerHTML).toMatch(/ProductPriceCard__media/);
    expect(container.innerHTML).toMatch(/ProductPriceCard__footer/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
