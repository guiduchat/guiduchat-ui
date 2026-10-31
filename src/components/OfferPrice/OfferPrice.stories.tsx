import type { Meta, StoryObj } from '@storybook/react-vite';

import { OfferPrice, type OfferPriceProps } from './OfferPrice';

const meta = {
  title: 'Components/OfferPrice',
  component: OfferPrice,
  args: { price: 'R$ 89,90', originalPrice: 'R$ 119,90', originalPriceLabel: 'Preço original' },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}><Story /></div>]
} satisfies Meta<OfferPriceProps>;

export default meta;
type Story = StoryObj<OfferPriceProps>;

export const Default: Story = {};

export const WithoutOriginalPrice: Story = { args: { originalPrice: undefined } };

export const English: Story = { args: { price: '$17.90', originalPrice: '$23.90', originalPriceLabel: 'Original price' } };

export const LargeValues: Story = {
  args: { price: 'R$ 12.989,90', originalPrice: 'R$ 15.999,90' },
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>]
};
