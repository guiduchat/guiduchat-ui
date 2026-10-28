import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Avatar } from '../Avatar';
import { PlaceCard, type PlaceCardProps } from './PlaceCard';

const avatar = (
  <Avatar.Container size={40}>
    <Avatar.Text>RB</Avatar.Text>
  </Avatar.Container>
);

const meta = {
  title: 'Components/PlaceCard',
  component: PlaceCard,
  args: {
    avatar,
    title: 'Restaurante Buzin',
    handle: '@buzin',
    subtitle: 'Restaurantes & Cafés',
    text: 'Temos mesa para quatro às 20h. Quer que eu reserve?',
    meta: 'há 2 min',
    headerAction: { label: 'Nova conversa', onClick: () => {} },
    action: { label: 'Ver mensagens', count: 3, onClick: () => {} }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<PlaceCardProps>;

export default meta;
type Story = StoryObj<PlaceCardProps>;

const WithSave = (args: PlaceCardProps) => {
  const [saved, setSaved] = useState(false);

  return (
    <PlaceCard
      {...args}
      save={{ label: saved ? 'Remover dos favoritos' : 'Salvar nos favoritos', pressed: saved, onPressedChange: setSaved }}
    />
  );
};

/** Conversation in the app: last message and unread count. */
export const Playground: Story = {
  render: (args) => <WithSave {...args} />
};

/** Conversation only on WhatsApp: store description, no counter. */
export const WhatsAppOnly: Story = {
  args: {
    text: 'Cozinha de frutos do mar com vista para a Rua das Pedras.',
    meta: 'Aberto agora · fecha às 22h',
    action: { label: 'Conversar', onClick: () => {} }
  },
  render: (args) => <WithSave {...args} />
};

/** Long names and texts are cut without breaking the layout. */
export const LongTexts: Story = {
  args: {
    title: 'Padaria e Confeitaria Flor de Búzios',
    handle: '@flordebuzios',
    subtitle: 'Padarias & Confeitarias',
    text: 'Pão de queijo saindo agora, bolo de aipim e café coado. Encomendas para o fim de semana até sexta às 18h, com retirada no balcão.',
    action: { label: 'Ver mensagens', count: 126, onClick: () => {} }
  },
  render: (args) => <WithSave {...args} />
};

/** The header opens the place when `onOpen` is set. */
export const Clickable: Story = {
  args: {
    onOpen: () => {}
  },
  render: (args) => <WithSave {...args} />
};

export const List: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WithSave {...args} />
      <WithSave {...args} title="Boutique Ossos" handle="@ossos" subtitle="Moda praia" />
    </div>
  )
};
