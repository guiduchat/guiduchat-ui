import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ProductPinnedHeader, type ProductPinnedHeaderProps } from './ProductPinnedHeader';

// Garrafa desenhada aqui mesmo, em fundo branco, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#fff"/><rect x="35" y="6" width="10" height="26" rx="4" fill="#c98a24"/><rect x="28" y="28" width="24" height="48" rx="10" fill="#e9b53c"/></svg>'
  )}`,
  alt: 'Garrafa de cerveja long neck'
};

const meta = {
  title: 'Components/ProductPinnedHeader',
  component: ProductPinnedHeader,
  args: {
    image,
    name: 'Cerveja Corona Extra Long Neck 330ml',
    offers: { label: '15 Ofertas', onClick: () => {} },
    actions: [
      { label: 'Salvar nos favoritos', icon: <Icon icon={icons.saveAdd} /> },
      { label: 'Criar alerta de preço', icon: <Icon icon={icons.priceAlert} /> },
      { label: 'Compartilhar', icon: <Icon icon={icons.shareNodes} /> }
    ]
  },
  // Como no app: sobre o fundo da página, sem cartão.
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box', background: 'var(--page-background)' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ProductPinnedHeaderProps>;

export default meta;
type Story = StoryObj<ProductPinnedHeaderProps>;

export const Playground: Story = {};

export const WithoutPhoto: Story = { args: { image: undefined } };

/** Telas estreitas (320 px): o nome e o botão cortam, nada sai da tela. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 12, boxSizing: 'border-box', background: 'var(--page-background)' }}>
        <Story />
      </div>
    )
  ],
  args: { name: 'Protetor Solar Facial Antioxidante FPS 70 com Cor Pele Morena Média 40g Edição Especial' }
};
