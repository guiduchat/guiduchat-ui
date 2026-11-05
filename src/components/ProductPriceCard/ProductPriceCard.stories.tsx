import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductPriceCard, type ProductPriceCardProps } from './ProductPriceCard';
import { ProductPriceCardSkeleton } from './ProductPriceCardSkeleton';

// Garrafa desenhada aqui mesmo, em fundo branco, para a história funcionar sem rede.
const image = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="300"><rect width="120" height="300" fill="#fff"/><rect x="50" y="10" width="20" height="90" rx="8" fill="#b9791f"/><rect x="30" y="90" width="60" height="190" rx="22" fill="#e8b23a"/><rect x="30" y="150" width="60" height="50" fill="#f5f0e0"/></svg>'
  )}`,
  alt: 'Garrafa de cerveja long neck'
};

const offersText = (
  <>
    <strong>64</strong>
    {' '}
    ofertas em
    <em>cervejas</em>
    {' '}
    a partir de:
  </>
);

const meta = {
  title: 'Components/ProductPriceCard',
  component: ProductPriceCard,
  args: {
    image,
    name: 'Cerveja Corona Extra Long Neck 330ml',
    brand: 'Marca: Corona',
    save: { label: 'Salvar produto', pressed: false, onPressedChange: () => {} },
    offers: offersText,
    currency: 'R$',
    price: '7,49',
    unit: '(unidade de 330ml)',
    delivery: 'Retirada ou entrega disponíveis',
    action: { label: 'Comparar Ofertas', onClick: () => {} }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ProductPriceCardProps>;

export default meta;
type Story = StoryObj<ProductPriceCardProps>;

export const Playground: Story = {};

export const WithoutPhoto: Story = { args: { image: undefined } };

export const LongTexts: Story = {
  args: {
    name: 'Protetor Solar Facial Antioxidante FPS 70 com Cor Pele Morena Média 40g Edição Especial',
    brand: 'Marca: Dermatologicamente Testado Laboratórios Associados',
    price: '1.249,90',
    unit: '(unidade de 40g, embalagem com duas peças)'
  }
};

/** Cartão carregando, com a estrutura do cartão real (regra U10). */
export const Loading: Story = {
  render: () => <ProductPriceCardSkeleton />
};
