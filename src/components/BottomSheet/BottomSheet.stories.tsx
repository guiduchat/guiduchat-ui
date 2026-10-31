import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl } from '@storybook-config/shared';
import { useState } from 'react';

import { icons } from '../../icons/catalog';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { QrCode } from '../QrCode';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component: 'Folha inferior em diálogo modal (role="dialog", aria-modal). Fecha com toque na película, botão, Esc ou arrastando a alça para baixo. O foco entra na folha, o Tab fica preso nela e o foco volta ao gatilho. O nome vem do título (ou da prop aria-label); o rótulo da alça (handleLabel) vem do app, já traduzido. A saída é garantida por tempo limite, mesmo se fechar durante a animação de entrada.'
      }
    }
  },
  argTypes: {
    ...hideArgsControl(['children', 'onClose', 'open', 'innerClassNames'])
  },
  args: {
    title: 'Título da folha',
    handleLabel: 'Arraste para baixo para fechar'
  },
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 24, flexDirection: 'column' }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => { setOpen(true); }}
          >
            Abrir folha
          </Button>
          <Story
            args={{
              ...context.args,
              open,
              onClose: () => { setOpen(false); }
            }}
          />
        </div>
      );
    }
  ]
} satisfies Meta<BottomSheetProps>;

export default meta;

type Story = StoryObj<BottomSheetProps>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="primary" size="medium" stretched onClick={args.onClose}>
          Fechar
        </Button>
      </BottomSheet>
    );
  }
};

export const WithText: Story = {
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <p style={{ margin: 0 }}>
          A folha fecha com toque na película escurecida, com a tecla Esc
          ou com o botão dentro do conteúdo.
        </p>
      </BottomSheet>
    );
  }
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
    'aria-label': 'Detalhes'
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="secondary" size="medium" stretched onClick={args.onClose}>
          Fechar
        </Button>
      </BottomSheet>
    );
  }
};

export const WithMinHeight: Story = {
  args: {
    minHeight: '50vh'
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="primary" size="medium" stretched onClick={args.onClose}>
          Fechar
        </Button>
      </BottomSheet>
    );
  }
};

export const WithoutDrag: Story = {
  args: {
    minHeight: '50vh',
    enableDrag: false
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="primary" size="medium" stretched onClick={args.onClose}>
          Fechar
        </Button>
      </BottomSheet>
    );
  }
};

/**
 * Reproduz a folha de cupom da página de Ofertas: o foco vai para um elemento
 * tabIndex={-1} antes do primeiro botão, e o Tab/Shift+Tab não pode sair da folha.
 */
export const CouponSheet: Story = {
  args: {
    title: 'Cupom de 10%'
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <div tabIndex={-1} data-testid="coupon-code" style={{ outline: 'none', marginBottom: 12 }}>
          Código GUIDU10
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="medium" stretched>Copiar</Button>
          <Button variant="primary" size="medium" stretched onClick={args.onClose}>Fechar</Button>
        </div>
        <div tabIndex={-1} data-testid="coupon-note" style={{ outline: 'none', marginTop: 12 }}>
          Válido até o fim do mês.
        </div>
      </BottomSheet>
    );
  }
};

/**
 * Folha do cupom com QR: bloco de ponta a ponta no topo (hero), conteúdo rolável
 * e botão fixo embaixo (footer). A alça fica sobreposta ao bloco.
 */
export const CouponWithQr: Story = {
  args: { title: undefined, 'aria-label': 'Cupom com QR code' },
  render: ({ ...args }) => (
    <BottomSheet
      {...args}
      hero={(
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '40px 16px 24px', background: 'var(--button-primary)' }}>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <IconButton variant="overlay" aria-label="Imprimir" onClick={() => {}}>
              <Icon icon={icons.print} />
            </IconButton>
          </div>
          <QrCode value="GUIDU-7K3Q-92XM" aria-label="QR code do cupom" size={192} />
        </div>
      )}
      footer={(
        <Button variant="primary" size="large" stretched iconAfter={<Icon icon={icons.copy} />}>
          GUIDU-7K3Q-92XM
        </Button>
      )}
    >
      {Array.from({ length: 12 }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          Regra
          {index + 1}
          : válido de segunda a sexta, mediante apresentação do código.
        </p>
      ))}
    </BottomSheet>
  )
};
