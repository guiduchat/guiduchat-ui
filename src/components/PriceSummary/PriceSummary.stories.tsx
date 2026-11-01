import type { Meta, StoryObj } from '@storybook/react-vite';

import { PriceSummary, type PriceSummaryProps } from './PriceSummary';

const meta = {
  title: 'Components/PriceSummary',
  component: PriceSummary,
  args: {
    rows: [
      { label: 'Subtotal dos produtos', value: 'R$350,00' },
      { label: 'Subtotal de envio', value: 'R$0,00' },
      { label: 'Desconto/voucher', value: 'R$0,00' }
    ],
    total: { label: 'Total', value: 'R$350,00' }
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<PriceSummaryProps>;

export default meta;
type Story = StoryObj<PriceSummaryProps>;

export const Playground: Story = {};

export const LongLabels: Story = {
  args: {
    rows: [
      { label: 'Subtotal dos produtos selecionados no carrinho desta loja', value: 'R$12.350,00' },
      { label: 'Desconto do voucher de boas-vindas', value: '-R$50,00' }
    ],
    total: { label: 'Total', value: 'R$12.300,00' }
  }
};
