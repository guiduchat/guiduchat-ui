import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ActionInput, type ActionInputProps } from './ActionInput';

const meta = {
  title: 'Forms/ActionInput',
  component: ActionInput,
  args: {
    label: 'Código de desconto',
    placeholder: 'Insira seu código de desconto',
    actionLabel: 'Aplicar',
    onAction: fn()
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<ActionInputProps>;

export default meta;
type Story = StoryObj<ActionInputProps>;

export const Playground: Story = {};
export const WithValue: Story = { args: { defaultValue: 'BEMVINDO10' } };
export const Disabled: Story = { args: { disabled: true } };
