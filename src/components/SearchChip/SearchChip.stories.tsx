import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ScrollRail } from '../ScrollRail';
import { SearchChip } from './SearchChip';

const meta = {
  title: 'Components/SearchChip',
  component: SearchChip,
  args: { icon: <Icon icon={icons.food} size={20} />, children: 'Almoço completo frutos do mar' },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof SearchChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

/** Duas fileiras que rolam juntas, como em "Pesquisas em alta". */
export const DuasFileiras: Story = {
  render: () => (
    <div style={{ width: 390, marginInline: -16 }}>
      <ScrollRail aria-label="Pesquisas em alta" rows={2}>
        <SearchChip icon={<Icon icon={icons.food} size={20} />}>Almoço completo frutos do mar</SearchChip>
        <SearchChip icon={<Icon icon={icons.home} size={20} />}>Pousada pé na areia</SearchChip>
        <SearchChip icon={<Icon icon={icons.drink} size={20} />}>Chopp duplo</SearchChip>
        <SearchChip icon={<Icon icon={icons.health} size={20} />}>Dentista 24h</SearchChip>
        <SearchChip icon={<Icon icon={icons.travel} size={20} />}>Passeio de barco</SearchChip>
        <SearchChip icon={<Icon icon={icons.food} size={20} />}>Pizza com borda recheada</SearchChip>
        <SearchChip icon={<Icon icon={icons.drink} size={20} />}>Café da manhã</SearchChip>
        <SearchChip icon={<Icon icon={icons.health} size={20} />}>Farmácia aberta</SearchChip>
      </ScrollRail>
    </div>
  )
};
