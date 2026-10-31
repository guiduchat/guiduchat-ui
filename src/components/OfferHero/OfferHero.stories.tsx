import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { OfferHero, type OfferHeroProps } from './OfferHero';

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a3b2a"/><stop offset="0.5" stop-color="#d9a441"/><stop offset="1" stop-color="#5c3d1e"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Picanha na tábua'
};

const meta = {
  title: 'Components/OfferHero',
  component: OfferHero,
  args: { image, save: { label: 'Salvar oferta', pressed: false, onPressedChange: () => {} } },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}><Story /></div>]
} satisfies Meta<OfferHeroProps>;

export default meta;
type Story = StoryObj<OfferHeroProps>;

const WithSave = (args: OfferHeroProps) => {
  const [saved, setSaved] = useState(args.save?.pressed ?? false);
  return <OfferHero {...args} save={{ label: saved ? 'Remover dos salvos' : 'Salvar oferta', pressed: saved, onPressedChange: setSaved }} />;
};

export const Default: Story = { render: WithSave };

export const Saved: Story = {
  render: WithSave,
  args: { save: { label: 'Remover dos salvos', pressed: true, onPressedChange: () => {} } }
};

export const WithoutImage: Story = { render: WithSave, args: { image: undefined } };

export const WithoutSave: Story = { args: { save: undefined } };
