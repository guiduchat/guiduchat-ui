import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeaderCardSkeleton } from '../HeaderCard';
import { InfoCardSkeleton } from '../InfoCard';
import { ListingCardSkeleton } from '../ListingCard';
import { OfferCardSkeleton } from '../OfferCard';
import { OrderProgressCardSkeleton } from '../OrderProgressCard';
import { StoreOfferCardSkeleton } from '../StoreOfferCard';
import { StorePhotoCardSkeleton } from '../StorePhotoCard';

// Regra U10: cada cartão tem um esqueleto com a mesma estrutura. Aqui, os módulos do Para Você carregando.
const meta = {
  title: 'Components/Skeleton/Cartões',
  parameters: { layout: 'padded' }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const column = { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 366 } as const;

export const ParaVoce: Story = {
  render: () => (
    <div style={column}>
      <HeaderCardSkeleton label="Carregando" />
      <InfoCardSkeleton label="Carregando" seeAll bars={4}><OrderProgressCardSkeleton /></InfoCardSkeleton>
      <InfoCardSkeleton label="Carregando" bars={5}><ListingCardSkeleton /></InfoCardSkeleton>
      <InfoCardSkeleton label="Carregando" seeAll><OfferCardSkeleton /></InfoCardSkeleton>
      <InfoCardSkeleton label="Carregando" seeAll bars={2}><StoreOfferCardSkeleton /></InfoCardSkeleton>
      <InfoCardSkeleton label="Carregando" seeAll peek><StorePhotoCardSkeleton /></InfoCardSkeleton>
    </div>
  )
};
