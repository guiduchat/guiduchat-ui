import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuantityStepper } from '../QuantityStepper';
import { CartItemCard, type CartItemCardProps } from './CartItemCard';

const stepper = (
  <QuantityStepper
    value={10}
    min={1}
    label="Quantidade"
    incrementLabel="Aumentar quantidade"
    decrementLabel="Diminuir quantidade"
    onIncrement={() => {}}
    onDecrement={() => {}}
  />
);

const meta = {
  title: 'Components/CartItemCard',
  component: CartItemCard,
  args: {
    name: 'Nome do produto ou oferta',
    detail: 'Variáveis: atributo',
    stepper,
    price: 'R$350,00'
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<CartItemCardProps>;

export default meta;
type Story = StoryObj<CartItemCardProps>;

/** Sem foto: reserva com ícone. */
export const Playground: Story = {};

export const WithPhoto: Story = {
  args: { image: { src: 'https://picsum.photos/id/1080/300/300', alt: 'Pizza' } }
};

export const LongTexts: Story = {
  args: {
    name: 'Pizza grande de calabresa com borda recheada de catupiry e muito queijo extra',
    detail: 'Tamanho: grande, borda: catupiry, observação: sem cebola',
    price: 'R$1.350,00'
  }
};
