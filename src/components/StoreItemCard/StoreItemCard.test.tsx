import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { StoreItemCard, type StoreItemCardProps } from './StoreItemCard';
import { StoreItemCardSkeleton } from './StoreItemCardSkeleton';

const base: StoreItemCardProps = {
  category: 'Moda Praia',
  name: 'Biquíni Floral Maria Bonita Coleção 2027',
  description: 'Tamanhos disponíveis P, M e G.',
  fulfillment: 'Retirada ou entrega',
  priceLabel: 'a partir de:',
  currency: 'R$',
  price: '240',
  notice: 'Preço não inclui frete.',
  payment: { title: 'Opções de Pagamento', text: 'Dinheiro, Cartão de Crédito e PIX.' },
  orderAction: { label: 'Enviar pedido para loja' },
  storeName: 'Sunset Alternative',
  address: 'Rua das Pedras, 34',
  status: 'Aberto até 22h.',
  toggleLabel: 'Mostrar detalhes do item',
  open: false,
  onOpenChange: () => {}
};

describe('StoreItemCard', () => {
  it('fechado mostra item, preço e loja, sem aviso, pagamento nem pedido', () => {
    render(<StoreItemCard {...base} />);
    for (const text of ['Moda Praia', 'a partir de:', 'Sunset Alternative', 'Aberto até 22h.']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.queryByText('Opções de Pagamento')).toBeNull();
    expect(screen.queryByText('Preço não inclui frete.')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Enviar pedido para loja' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Mostrar detalhes do item' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('aberto acrescenta aviso, pagamento e o botão de pedido', () => {
    render(<StoreItemCard {...base} open />);
    expect(screen.getByText('Preço não inclui frete.')).toBeTruthy();
    expect(screen.getByText('Opções de Pagamento')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enviar pedido para loja' })).toBeTruthy();
    const toggle = screen.getByRole('button', { name: 'Mostrar detalhes do item' });
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-controls')).toBeTruthy();
  });

  it('a seta pede a troca sem mudar sozinha (controlado)', () => {
    const onOpenChange = vi.fn();
    render(<StoreItemCard {...base} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar detalhes do item' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Mostrar detalhes do item' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('o app controla quem fica aberto: abrir um fecha o outro', () => {
    function List() {
      const [openId, setOpenId] = useState<string | null>(null);
      return (
        <>
          {['a', 'b'].map((id) => (
            <StoreItemCard
              key={id}
              {...base}
              toggleLabel={`Detalhes ${id}`}
              open={openId === id}
              onOpenChange={(next) => { setOpenId(next ? id : null); }}
            />
          ))}
        </>
      );
    }
    render(<List />);
    fireEvent.click(screen.getByRole('button', { name: 'Detalhes a' }));
    fireEvent.click(screen.getByRole('button', { name: 'Detalhes b' }));
    expect(screen.getByRole('button', { name: 'Detalhes a' }).getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByRole('button', { name: 'Detalhes b' }).getAttribute('aria-expanded')).toBe('true');
    expect(screen.getAllByText('Opções de Pagamento')).toHaveLength(1);
  });

  it('salvar e pedido avisam o clique', () => {
    const onPressedChange = vi.fn();
    const onClick = vi.fn();
    render(
      <StoreItemCard
        {...base}
        open
        save={{ label: 'Salvar item', pressed: false, onPressedChange }}
        orderAction={{ label: 'Enviar pedido para loja', onClick }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Salvar item' }));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar pedido para loja' }));
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('o esqueleto usa as classes do cartão', () => {
    const { container } = render(<StoreItemCardSkeleton />);
    expect(container.innerHTML).toMatch(/StoreItemCard__store/);
    expect(container.innerHTML).toMatch(/StoreItemCard__heading/);
    expect(container.innerHTML).toMatch(/StoreItemCard__save/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
