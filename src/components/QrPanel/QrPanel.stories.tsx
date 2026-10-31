import type { Meta, StoryObj } from '@storybook/react-vite';

import { QrPanel, type QrPanelProps } from './QrPanel';

const meta = {
  title: 'Components/QrPanel',
  component: QrPanel,
  args: {
    value: 'GUIDU-7K3Q-92XM',
    qrLabel: 'QR code do cupom',
    action: { label: 'Imprimir', onClick: () => {} }
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 390 }}><Story /></div>]
} satisfies Meta<QrPanelProps>;

export default meta;
type Story = StoryObj<QrPanelProps>;

export const Default: Story = {};

export const WithoutAction: Story = { args: { action: undefined } };

export const NarrowScreen: Story = {
  decorators: [(Story) => <div style={{ width: 296 }}><Story /></div>]
};
