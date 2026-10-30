import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon24Cart } from '../../icons';
import { Avatar } from '../Avatar';
import { NavBar, NavBarBackButton, NavBarButton, NavBarPill, type NavBarProps } from './NavBar';

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cabeçalho de 60 px: voltar, título centralizado (ou a pílula do chat) e ações em botões redondos de 40 px. Igual no iOS e no Android.'
      }
    }
  },
  args: {
    title: 'Meus Locais'
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
        after={<NavBarButton label="Carrinho" variant="accent" icon={<Icon24Cart />} />}
      />
    </div>
  )
};

export const Chat: Story = {
  name: 'Chat: pílula da loja',
  render: () => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <NavBar
        before={<NavBarBackButton label="Voltar" />}
        center={(
          <NavBarPill
            avatar={(
              <Avatar.Container size={32} form="circle">
                <Avatar.Text gradient="orange">RB</Avatar.Text>
              </Avatar.Container>
            )}
          >
            Restaurante Buzin
          </NavBarPill>
        )}
        after={<NavBarButton label="Carrinho" variant="accent" icon={<Icon24Cart />} />}
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
      <NavBar
        {...args}
        before={<NavBarBackButton label="Voltar" />}
        after={<NavBarButton label="Carrinho" icon={<Icon24Cart />} />}
      />
    </div>
  )
};
