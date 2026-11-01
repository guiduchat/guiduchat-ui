import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { SocialLinkCard, type SocialLinkCardProps } from './SocialLinkCard';

const meta = {
  title: 'Components/SocialLinkCard',
  component: SocialLinkCard,
  args: {
    icon: <Icon icon={icons.instagram} />,
    text: 'Siga o Guidu no Instagram',
    onClick: () => {}
  },
  decorators: [(Story) => <div style={{ maxWidth: 390, padding: 12, boxSizing: 'border-box' }}><Story /></div>]
} satisfies Meta<SocialLinkCardProps>;

export default meta;
type Story = StoryObj<SocialLinkCardProps>;

export const Instagram: Story = {};

export const Facebook: Story = {
  args: { icon: <Icon icon={icons.facebook} />, text: 'Siga o Guidu no Facebook' }
};

/** Como link do app (`asChild`): abre em outra aba. */
export const AsLink: Story = {
  args: { asChild: true, onClick: undefined, children: <a href="https://instagram.com/guidu" target="_blank" rel="noreferrer" /> }
};

export const LongText: Story = {
  args: { text: 'Siga o Guidu no Instagram e fique por dentro de todas as ofertas e novidades da sua cidade' }
};

export const English: Story = { args: { text: 'Follow Guidu on Instagram' } };

export const Spanish: Story = { args: { text: 'Sigue a Guidu en Instagram' } };
