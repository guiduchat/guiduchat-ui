import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Avatar } from '../Avatar';
import { OfferCard, type OfferCardProps } from './OfferCard';

const avatar = (
  <Avatar.Container size={48} form="circle">
    <Avatar.Text>RB</Avatar.Text>
  </Avatar.Container>
);

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a3b2a"/><stop offset="0.5" stop-color="#d9a441"/><stop offset="1" stop-color="#5c3d1e"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Picanha na tábua'
};

const meta = {
  title: 'Components/OfferCard',
  component: OfferCard,
  args: {
    avatar,
    title: '20% de desc Picanha 2 pessoas',
    subtitle: 'Restaurante Buzin',
    meta: 'Válido até 12/11/2026',
    save: { label: 'Salvar oferta', pressed: false, onPressedChange: () => {} },
    secondaryAction: { label: 'Ver regras', onClick: () => {} },
    primaryAction: { label: 'Resgatar oferta', onClick: () => {} }
  },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['ticket', 'featured'] }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<OfferCardProps>;

export default meta;
type Story = StoryObj<OfferCardProps>;

const WithSave = (args: OfferCardProps) => {
  const [saved, setSaved] = useState(args.save?.pressed ?? false);
  return (
    <OfferCard
      {...args}
      save={{ label: saved ? 'Remover dos salvos' : 'Salvar oferta', pressed: saved, onPressedChange: setSaved }}
    />
  );
};

const longText = {
  title: '20% de desconto na Picanha para duas pessoas com acompanhamentos e sobremesa da casa incluídos',
  subtitle: 'Restaurante Buzin Churrascaria e Pizzaria do Centro Histórico',
  meta: 'Válido até 12/11/2026, de segunda a sexta-feira, exceto feriados'
};

export const Ticket: Story = { render: WithSave };

export const Featured: Story = { render: WithSave, args: { appearance: 'featured', image } };

export const FeaturedWithoutPhoto: Story = { render: WithSave, args: { appearance: 'featured' } };

export const Saved: Story = {
  render: WithSave,
  args: { save: { label: 'Remover dos salvos', pressed: true, onPressedChange: () => {} } }
};

export const LongText: Story = { render: WithSave, args: longText };

export const FeaturedLongText: Story = { render: WithSave, args: { ...longText, appearance: 'featured', image } };

export const English: Story = {
  render: WithSave,
  args: {
    title: '20% off two-person steak',
    subtitle: 'Buzin Restaurant',
    meta: 'Valid until 11/12/2026',
    secondaryAction: { label: 'See rules', onClick: () => {} },
    primaryAction: { label: 'Redeem offer', onClick: () => {} }
  }
};

export const Spanish: Story = {
  render: WithSave,
  args: {
    title: '20% de descuento en parrillada para dos',
    subtitle: 'Restaurante Buzin',
    meta: 'Válido hasta el 12/11/2026',
    secondaryAction: { label: 'Ver condiciones', onClick: () => {} },
    primaryAction: { label: 'Canjear oferta', onClick: () => {} }
  }
};

// Tela de 320 px: o decorador global já soma 12 px de cada lado, então o cartão tem 296 px.
const narrow: Story['decorators'] = [
  (Story) => (
    <div style={{ width: 296 }}>
      <Story />
    </div>
  )
];

export const NarrowScreen: Story = { render: WithSave, args: longText, decorators: narrow };

export const FeaturedNarrowEnglish: Story = {
  render: WithSave,
  decorators: narrow,
  args: { ...English.args, appearance: 'featured', image }
};

export const FeaturedNarrowSpanish: Story = {
  render: WithSave,
  decorators: narrow,
  args: { ...Spanish.args, appearance: 'featured', image }
};

export const OnlyOneButton: Story = { render: WithSave, args: { secondaryAction: undefined } };

export const Disabled: Story = {
  render: WithSave,
  args: { primaryAction: { label: 'Resgatar oferta', onClick: () => {}, disabled: true } }
};

export const WithTag: Story = {
  render: WithSave,
  args: { tag: 'Usado', primaryAction: { label: 'Resgatar oferta', onClick: () => {}, disabled: true } }
};

export const WithoutButtons: Story = { render: WithSave, args: { secondaryAction: undefined, primaryAction: undefined } };

export const FeaturedWithTag: Story = { render: WithSave, args: { appearance: 'featured', image, tag: 'Vencido' } };
