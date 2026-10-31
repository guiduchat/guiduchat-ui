import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './OrderTimeline.module.scss';

export type OrderTimelineState = 'done' | 'current' | 'pending';

export interface OrderTimelineItem {
  key: string
  icon: ReactNode
  title: ReactNode
  /** Texto menor, por exemplo "Aguardando entregador | 12:40". */
  description?: ReactNode
  state: OrderTimelineState
}

interface OrderTimelineOwnProps {
  items: OrderTimelineItem[]
}

export type OrderTimelineProps = MergeProps<ComponentProps<'ol'>, OrderTimelineOwnProps>;

/** Passos do pedido: quais terminaram e qual é o atual vêm prontos da API. */
export const OrderTimeline = forwardRef<HTMLOListElement, OrderTimelineProps>(({ items, className, ...rest }, ref) => (
  <ol ref={ref} className={clsx(styles.OrderTimeline, className)} {...rest}>
    {items.map((item) => (
      <li
        key={item.key}
        className={clsx(styles.OrderTimeline__item, styles[`OrderTimeline__item_${item.state}`])}
        aria-current={item.state === 'current' ? 'step' : undefined}
      >
        <span className={styles.OrderTimeline__icon}>{item.icon}</span>
        <div className={styles.OrderTimeline__text}>
          <p className={styles.OrderTimeline__title}>{item.title}</p>
          {hasReactNode(item.description) && <p className={styles.OrderTimeline__description}>{item.description}</p>}
        </div>
      </li>
    ))}
  </ol>
));

OrderTimeline.displayName = 'OrderTimeline';
