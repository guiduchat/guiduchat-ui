import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './OrderSummaryCard.module.scss';

export type OrderSummaryCardTone = 'positive' | 'negative' | 'attention' | 'neutral';

interface OrderSummaryCardOwnProps {
  /** Nome da loja. */
  title: ReactNode
  /** Elemento do título. `h3` por padrão. */
  titleAs?: ElementType
  /** Situação em uma palavra, por exemplo "Retirado". */
  status: ReactNode
  statusTone?: OrderSummaryCardTone
  /** Código e data, por exemplo "PED#235 - Segunda, 12/11/2026". */
  meta?: ReactNode
  /** Itens do pedido, por exemplo "Almoço completo / + 1 item". */
  summary?: ReactNode
  /** Rótulo do total, por exemplo "Total:". */
  totalLabel?: ReactNode
  /** Total pronto para mostrar: o valor vem da API. */
  total?: ReactNode
  /** Os botões do app, por exemplo Detalhes e Pedir novamente. */
  actions?: ReactNode
}

export type OrderSummaryCardProps = MergeProps<ComponentProps<'article'>, OrderSummaryCardOwnProps>;

/** Resumo de um pedido: quadro interno com loja e itens; total e botões abaixo. */
export const OrderSummaryCard = forwardRef<HTMLElement, OrderSummaryCardProps>((props, ref) => {
  const {
    title,
    titleAs: Title = 'h3',
    status,
    statusTone = 'neutral',
    meta,
    summary,
    totalLabel,
    total,
    actions,
    className,
    ...rest
  } = props;
  const hasFooter = hasReactNode(total) || hasReactNode(actions);

  return (
    <article ref={ref} className={clsx(styles.OrderSummaryCard, className)} {...rest}>
      <div className={styles.OrderSummaryCard__body}>
        <div className={styles.OrderSummaryCard__top}>
          <Title className={styles.OrderSummaryCard__title}>{title}</Title>
          <span className={clsx(styles.OrderSummaryCard__status, styles[`OrderSummaryCard__status_${statusTone}`])}>{status}</span>
        </div>
        {hasReactNode(meta) && <p className={styles.OrderSummaryCard__text}>{meta}</p>}
        {hasReactNode(summary) && <p className={clsx(styles.OrderSummaryCard__text, styles.OrderSummaryCard__summary)}>{summary}</p>}
      </div>
      {hasFooter && (
        <div className={styles.OrderSummaryCard__footer}>
          {hasReactNode(total) && (
            <p className={styles.OrderSummaryCard__total}>
              {hasReactNode(totalLabel) && (
                <span className={styles.OrderSummaryCard__totalLabel}>
                  {totalLabel}
                  {' '}
                </span>
              )}
              <strong>{total}</strong>
            </p>
          )}
          {hasReactNode(actions) && <div className={styles.OrderSummaryCard__actions}>{actions}</div>}
        </div>
      )}
    </article>
  );
});

OrderSummaryCard.displayName = 'OrderSummaryCard';
