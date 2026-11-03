import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { StarTile } from '../StarTile';
import { PlaceListCard } from './PlaceListCard';
import { PlaceListCardSkeleton } from './PlaceListCardSkeleton';

const meta = {
  title: 'Components/PlaceListCard',
  component: PlaceListCard,
  args: {
    avatar: (
      <Avatar.Container size={44} form="squircle">
        <Avatar.Text gradient="green">PF</Avatar.Text>
      </Avatar.Container>
    ),
    title: 'Padaria Flor de Geribá',
    rating: (
      <>
        <StarTile size={20} />
        4,8 (235)
      </>
    ),
    description: 'Frutos do mar e pratos da casa na Rua das Pedras. Pode ter até duas linhas de descrição.',
    address: 'Av. Geribá, 256, Geribá, Armação dos Búzios, RJ',
    status: 'Fechado',
    statusTone: 'negative',
    hours: 'Abre às 12:00',
    open: { label: 'Abrir Padaria Flor de Geribá', onClick: () => {} },
    save: { label: 'Salvar Padaria Flor de Geribá', pressed: false, onPressedChange: () => {} },
    call: { label: 'Ligar para Padaria Flor de Geribá', href: 'tel:+5522999990000' },
    chat: { label: 'Abrir Chat', onClick: () => {} }
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 366 }}><Story /></div>]
} satisfies Meta<typeof PlaceListCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fechado: Story = {};

export const AbertoComMensagens: Story = {
  args: {
    status: 'Aberto',
    statusTone: 'positive',
    hours: 'Fecha às 22:00',
    save: { label: 'Salvar Padaria Flor de Geribá', pressed: true, onPressedChange: () => {} },
    chat: { label: 'Abrir Chat', onClick: () => {}, count: 3 }
  }
};

export const SemTelefone: Story = { args: { call: undefined } };

export const Carregando: Story = { render: () => <PlaceListCardSkeleton label="Carregando" /> };
