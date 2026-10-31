import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type IconData, icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import { QrCode } from '../QrCode';
import styles from './QrPanel.module.scss';

export interface QrPanelAction {
  /** Nome do botão para o leitor de tela, traduzido pelo app (por exemplo "Imprimir"). */
  label: string
  onClick: () => void
  /** Ícone do catálogo. Imprimir por padrão. */
  icon?: IconData
}

interface QrPanelOwnProps {
  /** Conteúdo do QR. Gerado no aparelho, sem log nem atributo `data-*`. Veja o limite em `QrCode`. */
  value: string
  /** Nome do QR para o leitor de tela, traduzido pelo app. */
  qrLabel: string
  /** Lado do QR em px. 192 por padrão. */
  qrSize?: number
  /** Botão redondo no canto superior direito (imprimir). */
  action?: QrPanelAction
}

export type QrPanelProps = MergeProps<Omit<ComponentProps<'div'>, 'children'>, QrPanelOwnProps>;

/**
 * Bloco verde-limão do cupom: o QR em quadrado branco no centro e a ação no canto.
 * Feito para o `hero` do `BottomSheet`: o respiro de cima é da alça, que fica sobre ele.
 * O fundo é a cor da marca nos dois temas; a alça e o botão são escuros para ter contraste sobre ela.
 */
export const QrPanel = forwardRef<HTMLDivElement, QrPanelProps>((props, ref) => {
  const { value, qrLabel, qrSize = 192, action, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.QrPanel, className)} {...rest}>
      {action && (
        <button type="button" className={styles.QrPanel__action} aria-label={action.label} onClick={action.onClick}>
          <Icon icon={action.icon ?? icons.print} size={24} />
        </button>
      )}
      <div className={styles.QrPanel__qr}>
        <QrCode value={value} aria-label={qrLabel} size={qrSize} />
      </div>
    </div>
  );
});

QrPanel.displayName = 'QrPanel';
