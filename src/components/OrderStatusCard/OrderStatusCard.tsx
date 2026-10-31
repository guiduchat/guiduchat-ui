import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './OrderStatusCard.module.scss';

interface OrderStatusCardOwnProps {
  /** Por exemplo, "Pedido #23546". */
  title: ReactNode
  /** Elemento do título. `h2` por padrão. */
  titleAs?: ElementType
  /** A situação, normalmente um `StatusBadge`. */
  badge?: ReactNode
  /** Ícone da linha de baixo. */
  icon?: ReactNode
  /** Por exemplo, "Previsão de entrega: 1 hora". */
  detail?: ReactNode
}

export type OrderStatusCardProps = MergeProps<ComponentProps<'section'>, OrderStatusCardOwnProps>;

/** Topo da página do pedido: código, situação e previsão. */
export const OrderStatusCard = forwardRef<HTMLElement, OrderStatusCardProps>((props, ref) => {
  const { title, titleAs: Title = 'h2', badge, icon, detail, className, ...rest } = props;
  return (
    <section ref={ref} className={clsx(styles.OrderStatusCard, className)} {...rest}>
      <div className={styles.OrderStatusCard__top}>
        <Title className={styles.OrderStatusCard__title}>{title}</Title>
        {hasReactNode(badge) && <span className={styles.OrderStatusCard__badge}>{badge}</span>}
      </div>
      {hasReactNode(detail) && (
        <p className={styles.OrderStatusCard__detail}>
          {hasReactNode(icon) && <span className={styles.OrderStatusCard__icon}>{icon}</span>}
          {detail}
        </p>
      )}
    </section>
  );
});

OrderStatusCard.displayName = 'OrderStatusCard';
