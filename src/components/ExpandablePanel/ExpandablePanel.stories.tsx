import type { Meta, StoryObj } from '@storybook/react-vite';

import { ExpandablePanel } from './ExpandablePanel';

const meta = {
  component: ExpandablePanel,
} satisfies Meta<typeof ExpandablePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { summary: 'Itens do pedido: 2', label: 'Ver itens do pedido', children: 'Pão de queijo × 2' },
};
