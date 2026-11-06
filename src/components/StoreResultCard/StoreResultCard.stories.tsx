import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { StoreResultCard, type StoreResultCardProps } from './StoreResultCard';
import { StoreResultCardSkeleton } from './StoreResultCardSkeleton';

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="350"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f6fde"/><stop offset="1" stop-color="#e8f0ff"/></linearGradient></defs><rect width="200" height="350" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Biquíni floral'
};

const offers = (
  <>
    <strong>64</strong>
    {' ofertas\nem '}
    <em>moda praia</em>
    {'\na partir de:'}
  </>
);

const meta = {
  title: 'Components/StoreResultCard',
  component: StoreResultCard,
  args: {
    image,
    name: 'Biquíni Floral Maria Bonita Coleção 2027',
    save: { label: 'Salvar item', pressed: false, onPressedChange: () => {} },
    offers,
    currency: 'R$',
    price: '240',
    avatar: (
      <Avatar.Container size={48} form="squircle">
        <Avatar.Text>SA</Avatar.Text>
      </Avatar.Container>
    ),
    storeName: 'Sunset Alternative',
    address: 'Rua das Pedras, 34',
    delivery: 'Retirada ou\nentrega hoje por R$ 8,00',
    status: 'Aberto até 20h',
    action: { label: 'Ver Opções', onClick: () => {} }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<StoreResultCardProps>;

export default meta;
type Story = StoryObj<StoreResultCardProps>;

export const Playground: Story = {};

export const WithoutPhoto: Story = { args: { image: undefined } };

export const ClosedStore: Story = { args: { status: 'Fechado agora', statusTone: 'negative' } };

export const LongTexts: Story = {
  args: {
    name: 'Biquíni Floral Maria Bonita Coleção Verão 2027 Edição Limitada Tamanho Único',
    price: '1.249,90',
    storeName: 'Sunset Alternative Moda Praia e Acessórios Ltda',
    address: 'Avenida José Bento Ribeiro Dantas, 1234, Orla Bardot'
  }
};

/** Cartão carregando, com a estrutura do cartão real (regra U10). */
export const Loading: Story = { render: () => <StoreResultCardSkeleton /> };
