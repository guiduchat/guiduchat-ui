import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FilterTags } from './FilterTags';
import { FilterTagsSkeleton } from './FilterTagsSkeleton';

const tags = [
  { id: 'all', label: 'Todas' },
  { id: 'unread', label: 'Não lidas' },
  { id: 'favorites', label: 'Favoritas' },
  { id: 'archived', label: 'Arquivadas' }
];

const meta = {
  title: 'Components/FilterTags',
  component: FilterTags,
  args: {
    label: 'Filtrar conversas',
    tags,
    value: 'all',
    onValueChange: () => {},
    add: { label: 'Nova lista', onClick: () => {} }
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 366 }}><Story /></div>]
} satisfies Meta<typeof FilterTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: function Render (args) {
    const [value, setValue] = useState('all');
    return <FilterTags {...args} value={value} onValueChange={setValue} />;
  }
};

/** Não cabe na largura: rola na horizontal, sem barra. */
export const Rolagem: Story = {
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 220 }}><Story /></div>]
};

export const Carregando: Story = { render: () => <FilterTagsSkeleton /> };
