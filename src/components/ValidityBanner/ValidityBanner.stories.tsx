import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusBadge } from '../StatusBadge';
import { ValidityBanner, type ValidityBannerProps } from './ValidityBanner';

const meta = {
  title: 'Components/ValidityBanner',
  component: ValidityBanner,
  args: { children: 'Oferta válida até: 30/11/2026' }
} satisfies Meta<ValidityBannerProps>;

export default meta;
type Story = StoryObj<ValidityBannerProps>;

export const Default: Story = {};

export const English: Story = { args: { children: 'Offer valid until: 11/30/2026' } };

export const LongText: Story = {
  args: { children: 'Oferta válida até: 30/11/2026, exceto feriados e vésperas de feriado em todas as unidades participantes' },
  decorators: [(Story) => <div style={{ width: 296 }}><Story /></div>]
};

/** Como na página da oferta: etiqueta "uso individual" acima da faixa. */
export const WithCouponBadge: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}>
      <div><StatusBadge text="uso individual" status="coupon" /></div>
      <ValidityBanner {...args} />
    </div>
  )
};
