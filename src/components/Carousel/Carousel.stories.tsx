import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
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
