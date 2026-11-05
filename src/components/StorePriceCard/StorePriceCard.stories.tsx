import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Avatar } from '../Avatar';
import { StorePriceCard, type StorePriceCardProps } from './StorePriceCard';
import { StorePriceCardSkeleton } from './StorePriceCardSkeleton';

// Garrafa desenhada aqui mesmo, em fundo branco, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="300"><rect width="120" height="300" fill="#fff"/><rect x="50" y="10" width="20" height="90" rx="8" fill="#b9791f"/><rect x="30" y="90" width="60" height="190" rx="22" fill="#e8b23a"/><rect x="30" y="150" width="60" height="50" fill="#f5f0e0"/></svg>'
  )}`,
  alt: 'Garrafa de cerveja long neck'
};

const args: StorePriceCardProps = {
  currency: 'R$',
  price: '7,80',
  priceNote: 'Preços em BRL',
  fulfillment: 'Retirada ou entrega disponíveis',
  notice: 'Preço não inclui frete. Atualizado em 04/11/2026 12:30.',
  avatar: (
    <Avatar.Container size={48} form="squircle">
      <Avatar.Text>BE</Avatar.Text>
    </Avatar.Container>
  ),
  storeName: 'Budega - Emporio de Bebidas',
  address: 'Rua das Flores, 123, Ferradura',
  status: 'Aberto até 20h.',
  toggleLabel: 'Mostrar detalhes da oferta',
  open: false,
  onOpenChange: () => {},
  image,
  category: 'Cervejas',
  productName: 'Cerveja Corona Extra Long Neck 330ml',
  save: { label: 'Salvar produto', pressed: false, onPressedChange: () => {} },
  brand: 'Marca: Corona',
  description: 'Unidade de 330ml. Consulte disponibilidade no chat.',
  payment: { title: 'Opções de Pagamento', text: 'Dinheiro, Cartão de Crédito e PIX.' },
  orderAction: { label: 'Enviar pedido para loja' }
};

const meta = {
  title: 'Components/StorePriceCard',
  component: StorePriceCard,
  args,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<StorePriceCardProps>;

export default meta;
type Story = StoryObj<StorePriceCardProps>;

export const Closed: Story = {};

export const Open: Story = { args: { open: true } };

export const ClosedStore: Story = { args: { status: 'Fechado agora.', statusTone: 'negative' } };

/** Lista como no app: um aberto por vez; quem decide é o app. */
export const OneOpenAtATime: Story = {
  render: (storyArgs) => {
    const [openId, setOpenId] = useState<string | null>('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['a', 'b', 'c'].map((id) => (
          <StorePriceCard
            key={id}
            {...storyArgs}
            storeName={`Loja ${id.toUpperCase()}`}
            open={openId === id}
            onOpenChange={(next) => { setOpenId(next ? id : null); }}
          />
        ))}
      </div>
    );
  }
};

/** Cartão carregando, com a estrutura do cartão fechado (regra U10). */
export const Loading: Story = {
  render: () => <StorePriceCardSkeleton />
};
