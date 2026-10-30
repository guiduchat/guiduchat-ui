import type { Meta, StoryObj } from '@storybook/react-vite';

import { icons } from '../../icons';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { EmptyState, type EmptyStateProps } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: 'Vazio e erro: frase, explicação e ação. Os textos vêm do app, traduzidos.'
      }
    }
  },
  args: {
    title: 'Nenhum local salvo ainda',
    description: 'Salve as lojas de que você gosta para encontrar rápido depois.'
  }
} satisfies Meta<EmptyStateProps>;

export default meta;
type Story = StoryObj<EmptyStateProps>;

export const Empty: Story = {
  name: 'Vazio',
  args: {
    icon: <Icon icon={icons.places} />,
    action: <Button variant="secondary">Ver recomendados</Button>
  }
};

export const Error: Story = {
  name: 'Erro',
  args: {
    icon: <Icon icon={icons.offline} size={20} />,
    title: 'Não deu para carregar',
    description: 'Confira a conexão e tente de novo.',
    action: <Button>Tentar de novo</Button>
  }
};
