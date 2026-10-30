import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '../components/Icon';
import { type IconName, icons } from './catalog';

const meta = {
  title: 'Icons/Catálogo',
  parameters: {
    docs: {
      description: {
        component: 'Ícones do guidu.chat: Hugeicons gratuita (traço 1,5, 24 px). Nomes por função; o app usa `<Icon icon={icons.nome} />`.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Catalog: Story = {
  name: 'Catálogo',
  render: () => (
    <div style={{ width: 520, maxWidth: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 16 }}>
      {(Object.keys(icons) as IconName[]).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <Icon icon={icons[name]} />
          <code>{name}</code>
        </div>
      ))}
    </div>
  )
};
