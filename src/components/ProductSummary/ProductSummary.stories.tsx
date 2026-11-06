import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductSummary, type ProductSummaryProps } from './ProductSummary';
import { ProductSummarySkeleton } from './ProductSummarySkeleton';

const discount = (
  <>
    {'Descontos de até '}
    <strong>35%</strong>
  </>
);

const meta = {
  title: 'Components/ProductSummary',
  component: ProductSummary,
  args: {
    category: 'Cervejas',
    name: 'Cerveja Corona Extra Long Neck 330ml',
    discount,
    priceLabel: 'A partir de:',
    currency: 'R$',
    price: '7,80'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ProductSummaryProps>;

export default meta;
type Story = StoryObj<ProductSummaryProps>;

export const Playground: Story = {};

export const WithoutDiscount: Story = { args: { discount: undefined } };

export const LongName: Story = {
  args: { name: 'Protetor Solar Facial Antioxidante FPS 70 com Cor Pele Morena Média 40g Edição Especial', price: '1.249,90' }
};

/** Carregando, com a forma do resumo (regra U10). */
export const Loading: Story = { render: () => <ProductSummarySkeleton /> };
