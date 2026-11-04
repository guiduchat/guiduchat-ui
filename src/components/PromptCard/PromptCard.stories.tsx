import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ScrollRail } from '../ScrollRail';
import { PromptCard } from './PromptCard';

const meta = {
  title: 'Components/PromptCard',
  component: PromptCard,
  args: {
    icon: <Icon icon={icons.mapSearch} size={24} />,
    title: 'Encontre novos locais',
    tone: 'lime'
  },
  argTypes: { tone: { control: 'select', options: ['lime', 'sky', 'lavender', 'cream'] } },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof PromptCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

/** Os quatro tons numa trilha, como na página Descubra: 2,5 cartões à vista numa tela de 390 px. */
export const Trilha: Story = {
  render: () => (
    <div style={{ width: 390, marginInline: -16 }}>
      <ScrollRail aria-label="Sugestões">
        <PromptCard tone="lime" icon={<Icon icon={icons.mapSearch} size={24} />} title="Encontre novos locais" />
        <PromptCard tone="sky" icon={<Icon icon={icons.bot} size={24} />} title="Converse com o Guidu" />
        <PromptCard tone="lavender" icon={<Icon icon={icons.sparkles} size={24} />} title="Pesquise o melhor preço" />
        <PromptCard tone="cream" icon={<Icon icon={icons.food} size={24} />} title="Descubra onde comer hoje" />
      </ScrollRail>
    </div>
  )
};
