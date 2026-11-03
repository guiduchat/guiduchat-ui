import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './StorePhotoCard.module.scss';

export type StorePhotoCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `StorePhotoCard` (regra U10): foto 3:2 com a seta e quatro linhas embaixo.
 * Usa as classes do cartão. Só visual: vai dentro de um `InfoCardSkeleton peek`.
 */
export const StorePhotoCardSkeleton = forwardRef<HTMLDivElement, StorePhotoCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.StorePhotoCard, className)} aria-hidden {...rest}>
      <div className={styles.StorePhotoCard__media}>
        <Skeleton width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div className={styles.StorePhotoCard__info}>
        <span className={styles.StorePhotoCard__category}><Skeleton shape="line" width="45%" /></span>
        <span className={styles.StorePhotoCard__name}><Skeleton shape="line" width="80%" /></span>
        <span className={styles.StorePhotoCard__address}><Skeleton shape="line" width="65%" /></span>
        <span className={styles.StorePhotoCard__rating} style={{ minHeight: 20 }}><Skeleton shape="line" width="35%" /></span>
      </div>
    </div>
  );
});

StorePhotoCardSkeleton.displayName = 'StorePhotoCardSkeleton';
