import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import { IconTile } from '../IconTile';
import styles from './PaymentPanel.module.scss';

interface PaymentPanelOwnProps {
  /** A forma de pagamento, normalmente um `StatusBadge`. */
  badge?: ReactNode
  icon?: ReactNode
  /** Valor pronto para mostrar: vem da API. */
  amount?: ReactNode
  description?: ReactNode
  /** Conteúdo extra, por exemplo o botão de pagar. */
  children?: ReactNode
}

export type PaymentPanelProps = MergeProps<ComponentProps<'div'>, PaymentPanelOwnProps>;

/** Quadro interno com a forma de pagamento, o valor e a orientação. */
export const PaymentPanel = forwardRef<HTMLDivElement, PaymentPanelProps>((props, ref) => {
  const { badge, icon, amount, description, children, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.PaymentPanel, className)} {...rest}>
      <div className={styles.PaymentPanel__top}>
        <span>{badge}</span>
        {hasReactNode(icon) && <IconTile>{icon}</IconTile>}
      </div>
      {hasReactNode(amount) && <p className={styles.PaymentPanel__amount}>{amount}</p>}
      {hasReactNode(description) && <p className={styles.PaymentPanel__description}>{description}</p>}
      {children}
    </div>
  );
});

PaymentPanel.displayName = 'PaymentPanel';
