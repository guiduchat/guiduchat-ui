import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Notice, type NoticeProps } from './Notice';

const meta = {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: 'Faixa de aviso: informação, atenção e perigo. Anuncia ao leitor de tela com `role="status"`.'
      }
    }
  },
  argTypes: {
    tone: { control: 'select', options: ['info', 'warning', 'danger'] }
  },
  args: {
    tone: 'info',
    children: 'Os preços podem mudar até a loja confirmar o pedido.'
  }
} satisfies Meta<NoticeProps>;

export default meta;
type Story = StoryObj<NoticeProps>;

export const Playground: Story = {};

export const Offline: Story = {
  name: 'Sem conexão',
  args: {
    tone: 'warning',
    icon: <Icon icon={icons.offline} size={20} />,
    children: 'Sem conexão. Mostrando o que foi carregado às 14:32.',
    action: <Button size="small" variant="secondary">Tentar de novo</Button>
  }
};

export const UnknownPaymentDomain: Story = {
  name: 'Domínio de pagamento desconhecido',
  args: {
    tone: 'danger',
    children: 'Este link de pagamento leva a pagar.exemplo.com, que não é de um provedor conhecido.'
  }
};
