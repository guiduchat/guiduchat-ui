import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Avatar } from '../Avatar';
import { StoreItemCard, type StoreItemCardProps } from './StoreItemCard';
import { StoreItemCardSkeleton } from './StoreItemCardSkeleton';

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="350"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f6fde"/><stop offset="1" stop-color="#e8f0ff"/></linearGradient></defs><rect width="200" height="350" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Biquíni floral'
};

const args: StoreItemCardProps = {
  image,
  category: 'Moda Praia',
  name: 'Biquíni Floral Maria Bonita Coleção 2027',
  save: { label: 'Salvar item', pressed: false, onPressedChange: () => {} },
  description: 'Tamanhos disponíveis P, M e G. Verifique a disponibilidade no chat.',
  fulfillment: 'Retirada ou\nentrega',
  priceLabel: 'a partir de:',
  currency: 'R$',
  price: '240',
  notice: 'Preço não inclui frete. Atualizado em 04/11/2026 12:30.',
  payment: { title: 'Opções de Pagamento', text: 'Dinheiro, Cartão de Crédito e PIX.' },
  orderAction: { label: 'Enviar pedido para loja' },
  avatar: (
    <Avatar.Container size={48} form="squircle">
      <Avatar.Text>SA</Avatar.Text>
    </Avatar.Container>
  ),
  storeName: 'Sunset Alternative',
  address: 'Rua das Pedras, 34',
  status: 'Aberto até 22h.',
  open: false,
  onOpenChange: () => {},
  toggleLabel: 'Mostrar detalhes do item'
};

const meta = {
  title: 'Components/StoreItemCard',
  component: StoreItemCard,
  args,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<StoreItemCardProps>;

export default meta;
type Story = StoryObj<StoreItemCardProps>;

export const Closed: Story = {};

export const Open: Story = { args: { open: true } };

export const ClosedStore: Story = { args: { status: 'Fechado agora.', statusTone: 'negative' } };

/** Lista como no app: um aberto por vez; quem decide é o app. */
export const OneOpenAtATime: Story = {
  render: (storyArgs) => {
    const [openId, setOpenId] = useState<string | null>('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['a', 'b'].map((id) => (
          <StoreItemCard
            key={id}
            {...storyArgs}
            name={`Item ${id.toUpperCase()}`}
            open={openId === id}
            onOpenChange={(next) => { setOpenId(next ? id : null); }}
          />
        ))}
      </div>
    );
  }
};

/** Cartão carregando, com a estrutura do cartão fechado (regra U10). */
export const Loading: Story = { render: () => <StoreItemCardSkeleton /> };
