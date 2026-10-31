import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrderStatusCard } from './OrderStatusCard';

const meta = {
  component: OrderStatusCard,
} satisfies Meta<typeof OrderStatusCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Pedido #23546', detail: 'Previsão de entrega: 1 hora' },
};
