import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MenuTabs, type MenuTabsProps } from './MenuTabs';

const items = [
  { id: 'favorites', title: 'Favoritos' },
  { id: 'all', title: 'Todos' },
  { id: 'recommended', title: 'Recomendados' }
];

const meta = {
  title: 'Components/MenuTabs',
  component: MenuTabs,
  args: {
    items,
    activeItem: 'favorites',
    onChange: () => {},
    'aria-label': 'Filtrar locais'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<MenuTabsProps>;

export default meta;
type Story = StoryObj<MenuTabsProps>;

const Controlled = (args: MenuTabsProps) => {
  const [active, setActive] = useState(args.activeItem);

  return <MenuTabs {...args} activeItem={active} onChange={setActive} />;
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />
};

/** Two tabs, such as "In progress · Past" in Orders. */
export const TwoTabs: Story = {
  args: {
    items: [{ id: 'active', title: 'Em andamento' }, { id: 'done', title: 'Anteriores' }],
    activeItem: 'active'
  },
  render: (args) => <Controlled {...args} />
};
