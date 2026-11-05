import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { StorePriceCard, type StorePriceCardProps } from './StorePriceCard';
import { StorePriceCardSkeleton } from './StorePriceCardSkeleton';

const base: StorePriceCardProps = {
  currency: 'R$',
  price: '7,80',
  priceNote: 'Preços em BRL',
  fulfillment: 'Retirada ou entrega disponíveis',
  notice: 'Preço não inclui frete. Atualizado em 04/11/2026 12:30.',
  storeName: 'Budega - Emporio de Bebidas',
  address: 'Rua das Flores, 123, Ferradura',
  status: 'Aberto até 20h.',
  toggleLabel: 'Mostrar detalhes da oferta',
  open: false,
  onOpenChange: () => {},
  productName: 'Cerveja Corona Extra Long Neck 330ml',
  category: 'Cervejas',
  brand: 'Marca: Corona',
  description: 'Unidade de 330ml. Consulte disponibilidade no chat.',
  payment: { title: 'Opções de Pagamento', text: 'Dinheiro, Cartão de Crédito e PIX.' },
  orderAction: { label: 'Enviar pedido para loja' }
};

describe('StorePriceCard', () => {
  it('fechado mostra preço, aviso e loja, sem os detalhes do produto', () => {
    render(<StorePriceCard {...base} />);
    for (const text of ['7,80', 'Preços em BRL', 'Retirada ou entrega disponíveis', 'Budega - Emporio de Bebidas', 'Aberto até 20h.']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.queryByText('Opções de Pagamento')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Enviar pedido para loja' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Mostrar detalhes da oferta' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('aberto mostra foto, nome, pagamento e o botão de pedido', () => {
    render(<StorePriceCard {...base} open image={{ src: 'a.jpg', alt: 'Garrafa' }} />);
    expect(screen.getByRole('heading', { name: 'Cerveja Corona Extra Long Neck 330ml' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Garrafa' })).toBeTruthy();
    expect(screen.getByText('Opções de Pagamento')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enviar pedido para loja' })).toBeTruthy();
    const toggle = screen.getByRole('button', { name: 'Mostrar detalhes da oferta' });
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-controls')).toBeTruthy();
  });

  it('a seta pede a troca do estado, sem mudar sozinha (controlado)', () => {
    const onOpenChange = vi.fn();
    render(<StorePriceCard {...base} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar detalhes da oferta' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Mostrar detalhes da oferta' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('o app controla quem fica aberto: abrir um fecha o outro', () => {
    function List() {
      const [openId, setOpenId] = useState<string | null>(null);
      return (
        <>
          {['a', 'b'].map((id) => (
            <StorePriceCard
              key={id}
              {...base}
              storeName={`Loja ${id}`}
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
    expect(screen.getByRole('button', { name: 'Detalhes a' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Detalhes b' }));
    expect(screen.getByRole('button', { name: 'Detalhes a' }).getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByRole('button', { name: 'Detalhes b' }).getAttribute('aria-expanded')).toBe('true');
    expect(screen.getAllByText('Opções de Pagamento')).toHaveLength(1);
  });

  it('salvar e pedido avisam o clique', () => {
    const onPressedChange = vi.fn();
    const onClick = vi.fn();
    render(
      <StorePriceCard
        {...base}
        open
        save={{ label: 'Salvar produto', pressed: false, onPressedChange }}
        orderAction={{ label: 'Enviar pedido para loja', onClick }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Salvar produto' }));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar pedido para loja' }));
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('o esqueleto usa as classes do cartão', () => {
    const { container } = render(<StorePriceCardSkeleton />);
    expect(container.innerHTML).toMatch(/StorePriceCard__notice/);
    expect(container.innerHTML).toMatch(/StorePriceCard__store/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
