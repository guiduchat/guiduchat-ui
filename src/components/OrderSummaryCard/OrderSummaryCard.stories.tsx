import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { OrderSummaryCard } from './OrderSummaryCard';

const meta = {
  component: OrderSummaryCard,
} satisfies Meta<typeof OrderSummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Restaurante Buzin',
    status: 'Retirado',
    statusTone: 'positive',
    meta: 'PED#235 - Segunda, 12/11/2026',
    summary: 'Almoço completo / + 1 item',
    totalLabel: 'Total:',
    total: 'R$ 350,00',
    actions: (
      <>
        <Button size="small" variant="secondary">Detalhes</Button>
        <Button size="small">Pedir novamente</Button>
      </>
    ),
  },
};

export const Cancelled: Story = {
  args: {
    title: 'Boutique da Praia',
    status: 'Cancelado',
    statusTone: 'negative',
    meta: 'PED#233 - Sexta, 09/11/2026',
    summary: 'Canga listrada',
    actions: <Button size="small" variant="secondary">Detalhes</Button>,
  },
};
