import type { Meta, StoryObj } from '@storybook/react-vite';

import { PaymentPanel } from './PaymentPanel';

const meta = {
  component: PaymentPanel,
} satisfies Meta<typeof PaymentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { amount: 'R$ 350,00', description: 'O pagamento deve ser feito no ato da entrega.' },
};
