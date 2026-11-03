import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ActionGrid, type ActionGridProps } from './ActionGrid';

const meta = {
  title: 'Components/ActionGrid',
  component: ActionGrid,
  parameters: {
    docs: {
      description: {
        component: 'Grade de 3 colunas de ações: cada quadro é um botão com o ícone num círculo amarelo e o rótulo embaixo. Fundo pelo token --action-tile-background.'
      }
    }
  },
  args: {
    'aria-label': 'Anexar',
    items: [
      { id: 'camera', label: 'Câmera', icon: <Icon icon={icons.camera} />, onClick: () => {} },
      { id: 'photo', label: 'Foto', icon: <Icon icon={icons.image} />, onClick: () => {} },
      { id: 'document', label: 'Documento', icon: <Icon icon={icons.document} />, onClick: () => {} }
    ]
  }
} satisfies Meta<ActionGridProps>;

export default meta;
type Story = StoryObj<ActionGridProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%', padding: 16, boxSizing: 'border-box' }}>
      <ActionGrid {...args} />
    </div>
  )
};
