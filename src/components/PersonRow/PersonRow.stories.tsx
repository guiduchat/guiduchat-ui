import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonRow } from './PersonRow';

const meta = {
  component: PersonRow,
} satisfies Meta<typeof PersonRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Fabiano Silva', detail: 'Placa: FDV3453' },
};
