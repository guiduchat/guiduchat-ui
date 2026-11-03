import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { ConversationListItem } from './ConversationListItem';
import { ConversationListItemSkeleton } from './ConversationListItemSkeleton';

const meta = {
  title: 'Components/ConversationListItem',
  component: ConversationListItem,
  args: {
    avatar: (
      <Avatar.Container size={48} form="squircle">
        <Avatar.Text gradient="green">PF</Avatar.Text>
      </Avatar.Container>
    ),
    title: 'Padaria Flor de Geribá',
    message: 'Seu pedido está pronto para retirada, pode vir buscar quando quiser.',
    address: 'Av. Geribá, 236, Geribá',
    time: '09:34',
    status: 'read',
    statusLabel: 'Lida pela loja',
    href: '#'
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 366 }}><Story /></div>]
} satisfies Meta<typeof ConversationListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Lida: Story = {};

export const Enviada: Story = { args: { status: 'sent', statusLabel: 'Enviada' } };

export const ComNaoLidas: Story = { args: { status: undefined, unread: 3 } };

export const SemEndereco: Story = { args: { address: undefined, title: 'guidu', time: 'Ontem' } };

export const Carregando: Story = { render: () => <ConversationListItemSkeleton label="Carregando" /> };
