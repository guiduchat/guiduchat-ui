import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  ActionInput,
  AddressPanel,
  Button,
  CartItemCard,
  Checkbox,
  Icon,
  icons,
  InfoCard,
  PriceSummary,
  QuantityStepper,
  Segmented,
  SwipeActions
} from '../index';

const meta = {
  title: 'Telas/Carrinho',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Peças da página do carrinho (modelo do Marcelo, 01/11/2026). Textos, valores e ações vêm do app; arraste uma linha para a esquerda.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

type Line = { id: string, name: string, detail: string, quantity: number, price: string };

const initialLines: Line[] = [
  { id: 'a', name: 'Nome do produto ou oferta', detail: 'Variáveis: atributo', quantity: 10, price: 'R$350,00' },
  { id: 'b', name: 'Pizza grande de calabresa', detail: 'Borda: catupiry', quantity: 2, price: 'R$118,00' }
];

const CartDemo = () => {
  const [mode, setMode] = useState('delivery');
  const [lines, setLines] = useState(initialLines);
  const [openId, setOpenId] = useState<string | null>('a');
  const [accepted, setAccepted] = useState(false);

  const setQuantity = (id: string, delta: number) =>
    setLines((current) => current.map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 390, maxWidth: '100%', padding: 12, boxSizing: 'border-box' }}>
      <InfoCard>
        <Segmented
          aria-label="Entrega ou retirada"
          activeItem={mode}
          onClick={setMode}
          items={[
            { id: 'delivery', title: 'Entrega', icon: <Icon icon={icons.delivery} size={20} /> },
            { id: 'pickup', title: 'Retirada', icon: <Icon icon={icons.pickup} size={20} /> }
          ]}
        />
        <AddressPanel
          title="Pousada Luar de Geribá"
          address={'Av Geribá, 256 suite 32\nGeribá, Armação dos Búzios, RJ'}
        />
      </InfoCard>
      <h2 style={{ margin: 0, fontWeight: 400 }}>Itens</h2>
      {lines.map((line) => (
        <SwipeActions
          key={line.id}
          open={openId === line.id}
          onOpenChange={(next) => setOpenId(next ? line.id : null)}
          actions={[
            { id: 'save', label: 'Salvar', tone: 'primary', icon: <Icon icon={icons.save} />, onClick: () => setOpenId(null) },
            {
              id: 'delete',
              label: 'Excluir',
              tone: 'neutral',
              icon: <Icon icon={icons.trash} />,
              onClick: () => setLines((current) => current.filter((l) => l.id !== line.id))
            }
          ]}
        >
          <CartItemCard
            name={line.name}
            detail={line.detail}
            price={line.price}
            stepper={(
              <QuantityStepper
                value={line.quantity}
                min={1}
                max={99}
                label={`Quantidade de ${line.name}`}
                incrementLabel="Aumentar quantidade"
                decrementLabel="Diminuir quantidade"
                onIncrement={() => setQuantity(line.id, 1)}
                onDecrement={() => setQuantity(line.id, -1)}
              />
            )}
          />
        </SwipeActions>
      ))}
      <InfoCard>
        <ActionInput label="Código de desconto" placeholder="Insira seu código de desconto" actionLabel="Aplicar" onAction={() => {}} />
        <PriceSummary
          rows={[
            { label: 'Subtotal dos produtos', value: 'R$468,00' },
            { label: 'Subtotal de envio', value: 'R$0,00' },
            { label: 'Desconto/voucher', value: 'R$0,00' }
          ]}
          total={{ label: 'Total', value: 'R$468,00' }}
        />
        <Checkbox
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          label="Ao clicar em enviar pedido aceito compartilhar minhas informações de contato com o estabelecimento somente para fins de contato comercial."
        />
        <Button stretched size="large">Enviar pedido</Button>
      </InfoCard>
    </div>
  );
};

export const Carrinho: Story = { render: () => <CartDemo /> };
