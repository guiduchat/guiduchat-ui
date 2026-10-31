import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrderTimeline } from './OrderTimeline';

const meta = {
  component: OrderTimeline,
} satisfies Meta<typeof OrderTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: [{ key: 'a', icon: '1', title: 'Pedido confirmado', description: '12:40', state: 'done' }, { key: 'b', icon: '2', title: 'A caminho', state: 'current' }] },
};
