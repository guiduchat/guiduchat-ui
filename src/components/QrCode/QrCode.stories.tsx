import type { Meta, StoryObj } from '@storybook/react-vite';

import { QrCode, type QrCodeProps } from './QrCode';

const meta = {
  title: 'Components/QrCode',
  component: QrCode,
  parameters: {
    docs: {
      description: {
        component: 'QR code em SVG gerado no aparelho. Sempre módulos escuros sobre fundo branco com margem de silêncio de 4 módulos, nos dois temas (use o seletor de tema da barra): o leitor de QR precisa disso, por isso este componente não segue o tema.'
      }
    }
  },
  args: { value: 'GUIDU-7K3Q-92XM', 'aria-label': 'QR code do cupom', size: 200 }
} satisfies Meta<QrCodeProps>;

export default meta;
type Story = StoryObj<QrCodeProps>;

export const Default: Story = {};

export const LongValue: Story = {
  args: { value: 'https://guidu.chat/c/AbCdEfGhIjKlMnOpQrStUvWxYz0123456789?ref=cupom&utm=loja', size: 240 }
};

export const FluidWidth: Story = {
  args: { size: undefined },
  decorators: [(Story) => <div style={{ width: 160 }}><Story /></div>]
};
