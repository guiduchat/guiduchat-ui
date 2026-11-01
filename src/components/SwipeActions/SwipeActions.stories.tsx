import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { icons } from '../../icons/catalog';
import { CartItemCard } from '../CartItemCard';
import { Icon } from '../Icon';
import { SwipeActions, type SwipeActionsProps } from './SwipeActions';

const meta = {
  title: 'Components/SwipeActions',
  component: SwipeActions,
  parameters: {
    docs: {
      description: {
        component: 'Arraste a linha para a esquerda (toque ou mouse), ou use Tab para focar as ações: a linha abre sozinha.'
      }
    }
  },
  decorators: [(Story) => <div style={{ maxWidth: 390 }}><Story /></div>]
} satisfies Meta<SwipeActionsProps>;

export default meta;
type Story = StoryObj<SwipeActionsProps>;

/** Linha aberta desde o início: confere as curvas das camadas (linha, 1ª ação, 2ª ação). */
export const Open: Story = {
  args: { open: true, onOpenChange: () => {}, actions: [], children: null },
  render: function Render () {
    const [open, setOpen] = useState(true);
    return (
      <SwipeActions
        open={open}
        onOpenChange={setOpen}
        actions={[
          { id: "save", label: "Salvar", tone: "primary", icon: <Icon icon={icons.save} />, onClick: () => {} },
          { id: "delete", label: "Excluir", tone: "neutral", icon: <Icon icon={icons.trash} />, onClick: () => {} }
        ]}
      >
        <CartItemCard name="Nome do produto ou oferta" detail="Variáveis: atributo" price="R$350,00" />
      </SwipeActions>
    );
  }
};

export const Playground: Story = {
  args: { open: false, onOpenChange: () => {}, actions: [], children: null },
  render: function Render () {
    const [open, setOpen] = useState(false);
    return (
      <SwipeActions
        open={open}
        onOpenChange={setOpen}
        actions={[
          { id: 'save', label: 'Salvar', tone: 'primary', icon: <Icon icon={icons.save} />, onClick: () => setOpen(false) },
          { id: 'delete', label: 'Excluir', tone: 'neutral', icon: <Icon icon={icons.trash} />, onClick: () => setOpen(false) }
        ]}
      >
        <CartItemCard name="Nome do produto ou oferta" detail="Variáveis: atributo" price="R$350,00" />
      </SwipeActions>
    );
  }
};
