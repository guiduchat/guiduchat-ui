import type { Meta, StoryObj } from '@storybook/react-vite';

import { AddressPanel } from './AddressPanel';

const meta = {
  component: AddressPanel,
} satisfies Meta<typeof AddressPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Pousada Flor do Mar', address: 'Av. Geribá, 360 - Geribá', note: 'Pode deixar na portaria.' },
};
