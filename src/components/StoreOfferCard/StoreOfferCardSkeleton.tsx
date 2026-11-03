import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './StoreOfferCard.module.scss';

export type StoreOfferCardSkeletonProps = MergeProps<ComponentProps<'div'>, { promo?: boolean }>;

/**
 * Esqueleto do `StoreOfferCard` (regra U10): foto, quatro linhas, a seta e a faixa da promoção.
 * Usa as classes do cartão. Só visual: vai dentro de um `InfoCardSkeleton`.
 */
export const StoreOfferCardSkeleton = forwardRef<HTMLDivElement, StoreOfferCardSkeletonProps>((props, ref) => {
  const { promo = true, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.StoreOfferCard, className)} aria-hidden {...rest}>
      <div className={styles.StoreOfferCard__frame}>
        <div className={styles.StoreOfferCard__media}><Skeleton width="100%" height="100%" /></div>
        <div className={styles.StoreOfferCard__info}>
          <span className={styles.StoreOfferCard__category}><Skeleton shape="line" width="45%" /></span>
          <span className={styles.StoreOfferCard__name}><Skeleton shape="line" width="85%" /></span>
          <span className={styles.StoreOfferCard__address}><Skeleton shape="line" width="70%" /></span>
          <span className={styles.StoreOfferCard__rating} style={{ minHeight: 20 }}><Skeleton shape="line" width="40%" /></span>
        </div>
        <span className={styles.StoreOfferCard__action} style={{ background: 'none' }}>
          <Skeleton shape="circle" width={44} height={44} />
        </span>
      </div>
      {promo && (
        <div className={styles.StoreOfferCard__promo}>
          <Skeleton width={24} height={24} />
          <span className={styles.StoreOfferCard__promoText} style={{ flex: 1 }}><Skeleton shape="line" width="80%" /></span>
        </div>
      )}
    </div>
  );
});

StoreOfferCardSkeleton.displayName = 'StoreOfferCardSkeleton';
