import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { InfoCard } from '../InfoCard';
import { OfferCard } from '../OfferCard';
import { Carousel, type CarouselProps } from './Carousel';

const offer = (title: string, key: string) => (
  <div style={{ padding: 12 }} key={key}>
    <OfferCard
      appearance="featured"
      avatar={<Avatar.Container size={48} form="circle"><Avatar.Text>RB</Avatar.Text></Avatar.Container>}
      title={title}
      subtitle="Restaurante Buzin"
      meta="Válido até 12/11/2026"
      save={{ label: 'Salvar oferta', pressed: false, onPressedChange: () => {} }}
      secondaryAction={{ label: 'Ver regras', onClick: () => {} }}
      primaryAction={{ label: 'Resgatar oferta', onClick: () => {} }}
    />
  </div>
);

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  args: {
    'aria-label': 'Ofertas em destaque',
    pagerLabel: (page: number, total: number) => `Página ${page} de ${total}`
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 390 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<CarouselProps>;

export default meta;
type Story = StoryObj<CarouselProps>;

export const ThreeItems: Story = {
  args: {
    children: [
      offer('20% de desc Picanha 2 pessoas', 'a'),
      offer('Rodízio de pizza com bebida grátis', 'b'),
      offer('Sobremesa de cortesia no almoço', 'c')
    ]
  }
};

export const OneItem: Story = {
  args: { children: [offer('20% de desc Picanha 2 pessoas', 'a')] }
};

// Peek: dentro do cartão de fora (`InfoCard plain`), o segundo cartão aparece cortado na borda dele.
const peekCard = (text: string, key: string) => (
  <div
    key={key}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 140,
      borderRadius: 20,
      background: 'var(--background-nested)',
      color: 'var(--text-primary)'
    }}
  >
    {text}
  </div>
);

const inInfoCard: Story['decorators'] = [
  (Story) => (
    <div style={{ width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
      <InfoCard title="Mais Recomendados" seeAll={<a href="#todas">Ver todas</a>} plain>
        <Story />
      </InfoCard>
    </div>
  )
];

export const Peek: Story = {
  args: { peek: true, pagerTone: 'accent', children: [peekCard('Primeiro', 'a'), peekCard('Segundo', 'b'), peekCard('Terceiro', 'c')] },
  decorators: inInfoCard
};

export const PeekTwoItems: Story = {
  args: { peek: true, pagerTone: 'accent', children: [peekCard('Primeiro', 'a'), peekCard('Segundo', 'b')] },
  decorators: inInfoCard
};

/** Um item só: sem marcador, e a página ocupa a trilha menos a ponta reservada. */
export const PeekOneItem: Story = {
  args: { peek: true, pagerTone: 'accent', children: [peekCard('Único', 'a')] },
  decorators: inInfoCard
};

/** Marcador verde sem peek (Pedidos e Favoritos). */
export const AccentPagerOnly: Story = {
  args: { pagerTone: 'accent', children: [peekCard('Primeiro', 'a'), peekCard('Segundo', 'b'), peekCard('Terceiro', 'c')] },
  decorators: inInfoCard
};
