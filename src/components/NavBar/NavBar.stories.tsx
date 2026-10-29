import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon24Plus } from '../../icons';
import { IconButton } from '../IconButton';
import { NavBar, NavBarBackButton, type NavBarProps } from './NavBar';

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Barra do topo: voltar, título e ação. No iOS o título fica no centro; no Android, à esquerda.'
      }
    }
  },
  args: {
    title: 'Boutique da Praia'
  }
} satisfies Meta<NavBarProps>;

export default meta;
type Story = StoryObj<NavBarProps>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <NavBar
        {...args}
        before={<NavBarBackButton label="Voltar" />}
        after={(
          <IconButton aria-label="Nova conversa" variant="ghost">
            <Icon24Plus />
          </IconButton>
        )}
      />
    </div>
  )
};

export const OnlyTitle: Story = {
  name: 'Só o título',
  args: { title: 'Conversas' },
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <NavBar {...args} />
    </div>
  )
};

export const LongTitle: Story = {
  name: 'Título longo',
  args: { title: 'Pousada Vista do Mar e Restaurante da Orla de Búzios' },
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <NavBar {...args} before={<NavBarBackButton label="Voltar" />} />
    </div>
  )
};
