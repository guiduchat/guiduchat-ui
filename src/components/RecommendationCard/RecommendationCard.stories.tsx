import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { RecommendationCard, type RecommendationCardProps } from './RecommendationCard';

const avatar = (gradient: 'blue' | 'orange' | 'green', text: string) => (
  <Avatar.Container key={text} size={28} form="circle">
    <Avatar.Text gradient={gradient}>{text}</Avatar.Text>
  </Avatar.Container>
);

const rating = (
  <>
    <Icon icon={icons.star} size={16} fill="currentColor" color="var(--icon-themed)" />
    4,8 (235)
  </>
);

const note = (
  <>
    Indicado por
    {' '}
    <strong>Buzin</strong>
    {', '}
    <strong>Maria Maria Café</strong>
    {' '}
    e mais 36 empresas locais.
  </>
);

const longNote = (
  <>
    Indicado por
    {' '}
    <strong>Restaurante e Pizzaria Buzin da Orla</strong>
    {', '}
    <strong>Maria Maria Café e Empório</strong>
    {' '}
    e mais 136 empresas locais.
  </>
);

const oneNote = (
  <>
    Indicado por
    {' '}
    <strong>Buzin</strong>
    .
  </>
);

const meta = {
  title: 'Components/RecommendationCard',
  component: RecommendationCard,
  args: {
    title: 'Indicações Locais',
    seeAll: <a href="#todas">Ver todas</a>,
    category: 'Restaurantes & Bares',
    name: 'Padaria Flor de Geribá',
    address: 'Av. Geribá, 345',
    rating,
    action: { label: 'Abrir Padaria Flor de Geribá', onClick: () => {} },
    avatars: [avatar('blue', 'B'), avatar('orange', 'M'), avatar('green', 'C')],
    note
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<RecommendationCardProps>;

export default meta;
type Story = StoryObj<RecommendationCardProps>;

/** Sem foto: reserva com ícone, 3 avatares. */
export const Playground: Story = {};

export const WithPhoto: Story = {
  args: { image: { src: 'https://picsum.photos/id/1080/300/300', alt: 'Fachada da padaria' } }
};

export const LongTexts: Story = {
  args: {
    category: 'Padarias, Confeitarias e Cafés Especiais',
    name: 'Padaria e Confeitaria Flor de Búzios do Geribá com Nome Muito Comprido',
    address: 'Avenida José Bento Ribeiro Dantas, 1234, Orla Bardot, Armação dos Búzios',
    note: longNote
  }
};

export const OneAvatar: Story = {
  args: { avatars: [avatar('blue', 'B')], note: oneNote }
};

/** A seta como link do app (`asChild`). */
export const ArrowAsLink: Story = {
  args: { action: { label: 'Abrir Padaria Flor de Geribá', asChild: true, children: <a href="#loja" /> } }
};
