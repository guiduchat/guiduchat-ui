import type { Meta, StoryObj } from '@storybook/react-vite';
import {hideArgsControl} from "@storybook-config/shared";
import { useState } from 'react';
import {fn} from "storybook/test";

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { Segmented } from './Segmented';

const meta = {
  component: Segmented,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'onClick', 'activeItem']),
  }
} satisfies Meta<typeof Segmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Label',
      },
      {
        id: '2',
        title: 'Very long label',
      },
      {
        id: '3',
        title: 'Label',
      },
      {
        id: '4',
        title: 'Label',
      },
      {
        id: '5',
        title: 'Long Label',
      },
    ],
    activeItem: "1",
    onClick: fn()
  },
  decorators: [
    (Story, context) => {
      const [activeItem, setActiveItem] = useState(context.args.activeItem);
      return (
        <Story
          args={{
            ...context.args,
            activeItem,
            onClick: setActiveItem,
          }}
        />
      );
    }
  ]
};

/** Com ícone antes do título (Entrega / Retirada). */
export const WithIcons: Story = {
  args: {
    items: [
      { id: 'delivery', title: 'Entrega', icon: <Icon icon={icons.delivery} size={20} /> },
      { id: 'pickup', title: 'Retirada', icon: <Icon icon={icons.pickup} size={20} /> }
    ],
    activeItem: 'delivery',
    onClick: fn()
  },
  decorators: Default.decorators
};

/** Botões separados de 44 px, o ativo em amarelo (Entrega / Retirada do carrinho). */
export const Buttons: Story = {
  args: { ...WithIcons.args, variant: 'buttons' },
  decorators: Default.decorators
};
