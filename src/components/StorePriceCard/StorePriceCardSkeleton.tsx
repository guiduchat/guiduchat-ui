import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './StorePriceCard.module.scss';

export type StorePriceCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `StorePriceCard` fechado (regra U10): preço, texto e ícone de entrega, a pílula de aviso
 * e a faixa da loja com o botão redondo. Usa as classes do cartão. Só visual.
 */
export const StorePriceCardSkeleton = forwardRef<HTMLDivElement, StorePriceCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.StorePriceCard, className)} aria-hidden {...rest}>
      <div className={styles.StorePriceCard__body}>
        <div className={styles.StorePriceCard__priceRow}>
          <span className={styles.StorePriceCard__price}>
            <Skeleton width={110} height={40} />
            <span className={styles.StorePriceCard__priceNote}><Skeleton shape="line" width={80} /></span>
          </span>
          <span className={styles.StorePriceCard__fulfillment}>
            <span className={styles.StorePriceCard__fulfillmentText} style={{ flex: 1 }}>
              <Skeleton shape="line" width="80%" />
              <br />
              <Skeleton shape="line" width="55%" />
            </span>
            <Skeleton width={44} height={44} style={{ flexShrink: 0 }} />
          </span>
        </div>
        <p className={styles.StorePriceCard__notice}><Skeleton shape="line" width="85%" /></p>
      </div>
      <div className={styles.StorePriceCard__store}>
        <span className={styles.StorePriceCard__avatar}><Skeleton shape="avatar" width={48} height={48} /></span>
        <span className={styles.StorePriceCard__names}>
          <span className={styles.StorePriceCard__storeName}><Skeleton shape="line" width="70%" /></span>
          <span className={styles.StorePriceCard__address}><Skeleton shape="line" width="85%" /></span>
          <span className={styles.StorePriceCard__status}><Skeleton shape="line" width="40%" /></span>
        </span>
        <Skeleton shape="circle" width={48} height={48} style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
});

StorePriceCardSkeleton.displayName = 'StorePriceCardSkeleton';
