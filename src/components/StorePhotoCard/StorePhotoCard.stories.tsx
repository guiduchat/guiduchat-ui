import type { Meta, StoryObj } from '@storybook/react-vite';

import { InfoCard } from '../InfoCard';
import { StarTile } from '../StarTile';
import { StorePhotoCard, type StorePhotoCardProps } from './StorePhotoCard';

// Foto desenhada aqui mesmo, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="450" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b7a8a"/><stop offset="1" stop-color="#1e3d5c"/></linearGradient></defs><rect width="450" height="300" fill="url(#g)"/></svg>'
  )}`,
  alt: 'Fachada da padaria'
};

const rating = (
  <>
    <StarTile size={20} />
    4,8 (235)
  </>
);

const meta = {
  title: 'Components/StorePhotoCard',
  component: StorePhotoCard,
  args: {
    category: 'Restaurantes & Bares',
    name: 'Padaria Flor de Geribá',
    address: 'Av. Geribá, 345',
    rating,
    action: { label: 'Abrir Padaria Flor de Geribá', onClick: () => {} }
  },
  // Dentro do cartão de fora, como no app.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <InfoCard title="Mais Recomendados" seeAll={<a href="#todas">Ver todas</a>} plain>
          <Story />
        </InfoCard>
      </div>
    )
  ]
} satisfies Meta<StorePhotoCardProps>;

export default meta;
type Story = StoryObj<StorePhotoCardProps>;

/** Sem foto: reserva com ícone. */
export const Playground: Story = {};

export const WithPhoto: Story = { args: { image } };

/** A seta como link do app (`asChild`). */
export const ArrowAsLink: Story = {
  args: { image, action: { label: 'Abrir Padaria Flor de Geribá', asChild: true, children: <a href="#loja" /> } }
};

export const WithoutArrow: Story = { args: { image, action: undefined } };

export const LongTexts: Story = {
  args: {
    image,
    category: 'Padarias, Confeitarias e Cafés Especiais',
    name: 'Padaria e Confeitaria Flor de Búzios do Geribá com Nome Muito Comprido',
    address: 'Avenida José Bento Ribeiro Dantas, 1234, Orla Bardot, Armação dos Búzios'
  }
};
