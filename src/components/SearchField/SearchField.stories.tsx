import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { 'aria-label': 'Buscar', placeholder: 'Buscar conversas' },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 366 }}><Story /></div>]
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const ComTexto: Story = { args: { defaultValue: 'Padaria' } };
