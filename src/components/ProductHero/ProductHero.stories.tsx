import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ProductHero, type ProductHeroProps } from './ProductHero';
import { ProductHeroSkeleton } from './ProductHeroSkeleton';

// Garrafa desenhada aqui mesmo, em fundo branco, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#fff"/><rect x="180" y="30" width="40" height="120" rx="14" fill="#c98a24"/><rect x="150" y="130" width="100" height="240" rx="40" fill="#e9b53c"/></svg>'
  )}`,
  alt: 'Garrafa de cerveja long neck'
};

const meta = {
  title: 'Components/ProductHero',
  component: ProductHero,
  args: {
    image,
    actions: [
      { label: 'Compartilhar', icon: <Icon icon={icons.share} /> },
      { label: 'Criar alerta de preço', icon: <Icon icon={icons.priceAlert} /> },
      { label: 'Salvar nos favoritos', icon: <Icon icon={icons.saveAdd} /> },
      { label: 'Copiar link', icon: <Icon icon={icons.link} /> }
    ]
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ProductHeroProps>;

export default meta;
type Story = StoryObj<ProductHeroProps>;

export const Playground: Story = {};

export const WithoutPhoto: Story = { args: { image: undefined } };

/** Carregando, com o quadro e a coluna de ações reservados (regra U10). */
export const Loading: Story = { render: () => <ProductHeroSkeleton /> };
