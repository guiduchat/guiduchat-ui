import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollRail } from './ScrollRail';

const box = (n: number) => (
  <div key={n} style={{ flexShrink: 0, width: 120, height: 56, borderRadius: 12, background: 'var(--background-tertiary)' }} />
);

const meta = {
  title: 'Components/ScrollRail',
  component: ScrollRail,
  args: { 'aria-label': 'Exemplo', rows: 1, children: Array.from({ length: 8 }, (_, i) => box(i)) },
  argTypes: { rows: { control: 'inline-radio', options: [1, 2] } },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 390, marginInline: -16 }}><Story /></div>]
} satisfies Meta<typeof ScrollRail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UmaFileira: Story = {};

export const DuasFileiras: Story = { args: { rows: 2 } };
