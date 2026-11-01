import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { InfoCard } from '../InfoCard';
import { Steps } from '../Steps';
import { OrderProgressCard, type OrderProgressCardProps } from './OrderProgressCard';

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a3b2a"/><stop offset="1" stop-color="#d9a441"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Marmita do pedido'
};

const steps = (progress: number) => <Steps count={4} progress={progress} role="img" aria-label={`Passo ${progress} de 4`} />;

const meta = {
  title: 'Components/OrderProgressCard',
  component: OrderProgressCard,
  args: {
    status: 'Aguardando pagamento',
    code: 'Pedido ID: #123456',
    items: '2 itens',
    updatedAt: 'Atualizado em 01/11/26 - 12:00h',
    steps: steps(1),
    avatar: <Avatar.Container size={44} form="circle"><Avatar.Text gradient="green">RB</Avatar.Text></Avatar.Container>,
    store: 'Restaurante Buzin',
    category: 'Restaurantes & Cafés',
    action: <Button size="small">Ver mais</Button>
  },
  // Dentro do cartão de fora, como no app.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <InfoCard title="Pedidos em andamento" seeAll={<a href="#todas">Ver todas</a>} plain>
          <Story />
        </InfoCard>
      </div>
    )
  ]
} satisfies Meta<OrderProgressCardProps>;

export default meta;
type Story = StoryObj<OrderProgressCardProps>;

/** Sem foto: reserva com ícone. */
export const Playground: Story = {};

export const WithPhoto: Story = { args: { image } };

export const InPreparation: Story = { args: { image, status: 'Em preparo', steps: steps(2) } };

export const OnTheWay: Story = { args: { image, status: 'A caminho', steps: steps(3) } };

export const Delivered: Story = { args: { image, status: 'Entregue', steps: steps(4) } };

/** O botão como link do app (`asChild`). */
export const ButtonAsLink: Story = {
  args: { image, action: <Button asChild size="small"><a href="#pedido">Ver mais</a></Button> }
};

export const LongTexts: Story = {
  args: {
    image,
    status: 'Aguardando confirmação do pagamento pela operadora do cartão',
    code: 'Pedido ID: #123456789012345678',
    items: '12 itens, entre pratos, bebidas e sobremesas',
    updatedAt: 'Atualizado em 01/11/2026 às 12:00h pelo horário de Brasília',
    store: 'Restaurante e Pizzaria Buzin da Orla de Geribá com Nome Muito Comprido',
    category: 'Restaurantes, Pizzarias e Cafés Especiais'
  }
};

export const OnlyStatus: Story = {
  args: { code: undefined, items: undefined, updatedAt: undefined, steps: undefined, avatar: undefined, store: undefined, category: undefined, action: undefined }
};
