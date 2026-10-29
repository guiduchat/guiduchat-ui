import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton, type SkeletonProps } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: 'Estado carregando. Só visual; quem carrega marca o contêiner com `aria-busy`. Sem animação quando o sistema pede menos movimento.'
      }
    }
  },
  argTypes: {
    shape: { control: 'select', options: ['rect', 'circle', 'text'] }
  },
  args: {
    shape: 'rect',
    width: 240,
    height: 120
  }
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Playground: Story = {};

export const CardLoading: Story = {
  name: 'Card carregando',
  render: () => (
    <div aria-busy="true" style={{ width: 358, maxWidth: '100%', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Skeleton shape="circle" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton shape="text" lines={3} />
      </div>
    </div>
  )
};
