import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: { cartesian: ['checked', 'disabled'] },
  args: {
    label: 'Ao clicar em enviar pedido aceito compartilhar minhas informações de contato com o estabelecimento somente para fins de contato comercial.',
    checked: false,
    disabled: false,
    onChange: fn()
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Playground: Story = {
  render: function Render (args) {
    const [, updateArgs] = useArgs<CheckboxProps>();
    return <Checkbox {...args} onChange={(event) => updateArgs({ checked: event.target.checked })} />;
  }
};

export const Short: Story = { args: { label: 'Lembrar de mim' }, render: Playground.render };
export const Disabled: Story = { args: { disabled: true, checked: true } };
