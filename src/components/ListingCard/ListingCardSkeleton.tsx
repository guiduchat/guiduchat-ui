import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './ListingCard.module.scss';

export type ListingCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `ListingCard` (regra U10): foto, tipo, título, apoio, nota e a seta.
 * Usa as classes do cartão. Só visual: vai dentro de um `InfoCardSkeleton`.
 */
export const ListingCardSkeleton = forwardRef<HTMLDivElement, ListingCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ListingCard, className)} aria-hidden {...rest}>
      <div className={styles.ListingCard__media}><Skeleton width="100%" height="100%" /></div>
      <div className={styles.ListingCard__info}>
        <span className={styles.ListingCard__eyebrow}><Skeleton shape="line" width="45%" /></span>
        <span className={styles.ListingCard__title}><Skeleton shape="line" width="85%" /></span>
        <span className={styles.ListingCard__subtitle}><Skeleton shape="line" width="70%" /></span>
        <span className={styles.ListingCard__rating} style={{ minHeight: 20 }}><Skeleton shape="line" width="40%" /></span>
      </div>
      <span className={styles.ListingCard__action} style={{ background: 'none' }}>
        <Skeleton shape="circle" width={44} height={44} />
      </span>
    </div>
  );
});

ListingCardSkeleton.displayName = 'ListingCardSkeleton';
