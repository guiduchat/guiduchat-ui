import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button';
import { Steps } from '../Steps';
import { OrderProgressCard } from './OrderProgressCard';

const base = {
  status: 'Aguardando pagamento',
  code: 'Pedido ID: #123456',
  items: '2 itens',
  updatedAt: 'Atualizado em 01/11/26 - 12:00h',
  store: 'Restaurante Buzin',
  category: 'Restaurantes & Cafés'
};

describe('OrderProgressCard', () => {
  it('mostra situação, código, itens, atualização e a loja', () => {
    render(<OrderProgressCard {...base} />);
    for (const text of Object.values(base)) expect(screen.getByText(text)).toBeTruthy();
  });

  it('sem foto mostra a reserva e não cria imagem; com foto usa o alt do app', () => {
    const { rerender } = render(<OrderProgressCard {...base} />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<OrderProgressCard {...base} image={{ src: 'a.jpg', alt: 'Marmita' }} />);
    expect(screen.getByRole('img', { name: 'Marmita' }).getAttribute('src')).toBe('a.jpg');
  });

  it('põe os passos e o botão do app nos lugares', () => {
    render(
      <OrderProgressCard
        {...base}
        steps={<Steps count={4} progress={1} aria-label="Passo 1 de 4" />}
        action={<Button asChild size="small"><a href="/orders/1">Ver mais</a></Button>}
      />
    );
    expect(screen.getByLabelText('Passo 1 de 4')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Ver mais' }).getAttribute('href')).toBe('/orders/1');
  });

  it('só com a situação não cria rodapé nem linhas vazias', () => {
    const { container } = render(<OrderProgressCard status="Entregue" />);
    expect(container.innerHTML).not.toMatch(/__footer|__updated|__steps/);
  });
});
