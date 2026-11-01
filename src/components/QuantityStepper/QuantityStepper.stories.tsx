import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { QuantityStepper, type QuantityStepperProps } from './QuantityStepper';

const meta = {
  title: 'Components/QuantityStepper',
  component: QuantityStepper,
  args: {
    value: 10,
    min: 1,
    max: 99,
    label: 'Quantidade de Pizza Margherita',
    incrementLabel: 'Aumentar quantidade',
    decrementLabel: 'Diminuir quantidade',
    onIncrement: () => {},
    onDecrement: () => {}
  }
} satisfies Meta<QuantityStepperProps>;

export default meta;
type Story = StoryObj<QuantityStepperProps>;

export const Playground: Story = {
  render: function Render (args) {
    const [value, setValue] = useState(args.value);
    return (
      <QuantityStepper
        {...args}
        value={value}
        onIncrement={() => setValue((v) => v + 1)}
        onDecrement={() => setValue((v) => v - 1)}
      />
    );
  }
};

/** No mínimo, o menos desabilita. */
export const AtMin: Story = { args: { value: 1 } };
/** No máximo, o mais desabilita. */
export const AtMax: Story = { args: { value: 99 } };
export const Disabled: Story = { args: { disabled: true } };
