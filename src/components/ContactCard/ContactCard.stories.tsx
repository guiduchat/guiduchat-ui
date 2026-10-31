import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContactCard } from './ContactCard';

const meta = {
  component: ContactCard,
} satisfies Meta<typeof ContactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Padaria Flor de Búzios', handle: '@flordebuzios', address: 'R. Manoel Turíbio de Farias, 273 - Armação, Armação dos Búzios - RJ' },
};
