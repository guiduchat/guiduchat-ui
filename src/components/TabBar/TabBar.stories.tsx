import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons';
import { Icon } from '../Icon';
import { TabBar, TabBarItem } from './TabBar';

type TabKey = 'descubra' | 'locais' | 'conversas' | 'conta';

interface StoryArgs {
  active: TabKey
  unread: number
}

const meta = {
  title: 'Components/TabBar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Rodapé do guidu.chat: ícone em contorno na aba inativa e preenchido na ativa, rótulo embaixo e contador. Cada aba vira o `<Link>` do app com `asChild`.'
      }
    }
  },
  argTypes: {
    active: { control: 'select', options: ['descubra', 'locais', 'conversas', 'conta'] },
    unread: { control: 'number' }
  },
  args: {
    active: 'locais',
    unread: 3
  }
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  render: ({ active, unread }) => (
    <div style={{ width: 390, maxWidth: '100%', marginTop: 120 }}>
      <TabBar aria-label="Menu principal">
        <TabBarItem href="#descubra" active={active === 'descubra'} icon={<Icon icon={icons.discover} />}>
          Descubra
        </TabBarItem>
        <TabBarItem href="#locais" active={active === 'locais'} icon={<Icon icon={icons.places} />}>
          Locais
        </TabBarItem>
        <TabBarItem
          href="#conversas"
          active={active === 'conversas'}
          icon={<Icon icon={icons.chats} />}
          count={unread}
          countLabel={`${unread} não lidas`}
        >
          Conversas
        </TabBarItem>
        <TabBarItem href="#conta" active={active === 'conta'} icon={<Icon icon={icons.account} />}>
          Conta
        </TabBarItem>
      </TabBar>
    </div>
  )
};

export const LongLabels: Story = {
  name: 'Rótulos longos',
  render: () => (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <TabBar aria-label="Menu principal">
        <TabBarItem href="#a" active icon={<Icon icon={icons.discover} />}>Descubra</TabBarItem>
        <TabBarItem href="#b" icon={<Icon icon={icons.places} />}>Lugares favoritos</TabBarItem>
        <TabBarItem href="#c" icon={<Icon icon={icons.chats} />} count={1200} countLabel="1200 não lidas">Conversas</TabBarItem>
        <TabBarItem href="#d" icon={<Icon icon={icons.account} />}>Minha conta</TabBarItem>
      </TabBar>
    </div>
  )
};
