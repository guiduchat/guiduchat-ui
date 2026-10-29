import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Avatar } from '../Avatar';
import { MenuTabs } from '../MenuTabs';
import { HeaderCard, type HeaderCardProps } from './HeaderCard';

const avatar = (
  <Avatar.Container size={32} form="squircle">
    <Avatar.Text gradient="blue">J</Avatar.Text>
  </Avatar.Container>
);

const meta = {
  title: 'Components/HeaderCard',
  component: HeaderCard,
  args: {
    avatar,
    greeting: 'Olá, João!',
    title: 'Encontre novos locais ou continue a conversa.',
    search: { label: 'Buscar locais', placeholder: 'Buscar por nome ou categoria' },
    filter: { label: 'Filtros', onClick: () => {} }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<HeaderCardProps>;

export default meta;
type Story = StoryObj<HeaderCardProps>;

export const Playground: Story = {};

/** Filters applied: the button turns neutral. */
export const FilterActive: Story = {
  args: { filter: { label: 'Filtros (ativos)', onClick: () => {}, active: true } }
};

/** Signed out: no avatar, short greeting. */
export const SignedOut: Story = {
  args: { avatar: undefined, greeting: 'Olá!' }
};

const tabs = [
  { id: 'favorites', title: 'Favoritos' },
  { id: 'all', title: 'Todos' },
  { id: 'recommended', title: 'Recomendados' }
];

const PlacesTopExample = (args: HeaderCardProps) => {
  const [active, setActive] = useState('favorites');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <HeaderCard {...args} />
      <MenuTabs items={tabs} activeItem={active} onChange={setActive} aria-label="Filtrar locais" />
    </div>
  );
};

/** Top of the Places page: header card and the menu tabs. */
export const PlacesTop: Story = {
  render: (args) => <PlacesTopExample {...args} />
};
