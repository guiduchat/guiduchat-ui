import type { Meta, StoryObj } from '@storybook/react-vite';

import { AddressPanel } from './AddressPanel';

const meta = {
  component: AddressPanel,
} satisfies Meta<typeof AddressPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Pousada Flor do Mar', address: 'Av. Geribá, 360 - Geribá', note: 'Pode deixar na portaria.' },
};

/** Com ação ao lado do nome (quebra para baixo se faltar espaço). */
export const WithTitleAction: Story = {
  args: {
    title: 'Pousada Luar de Geribá',
    titleAction: <a href="#alterar">Alterar endereço</a>,
    address: 'Av Geribá, 256 suite 32',
  },
};

/** Pino direto, sem a caixa do ícone (carrinho). */
export const PlainIcon: Story = {
  args: {
    ...WithTitleAction.args,
    plainIcon: true,
    address: 'Av Geribá, 256 suite 32\nGeribá, Armação dos Búzios, RJ\nHorário de entrega: 24hs',
    children: <a href="#referencia">Adicionar referência</a>,
  },
};
