import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './StoreItemCard.module.scss';

export type StoreItemCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `StoreItemCard` fechado (regra U10): foto, categoria, nome, descrição, entrega, preço
 * e a faixa da loja com a seta. Usa as classes do cartão. Só visual.
 */
export const StoreItemCardSkeleton = forwardRef<HTMLDivElement, StoreItemCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.StoreItemCard, className)} aria-hidden {...rest}>
      <div className={styles.StoreItemCard__body}>
        <div className={styles.StoreItemCard__top}>
          <div className={styles.StoreItemCard__media}><Skeleton width="100%" height="100%" /></div>
          <div className={styles.StoreItemCard__info}>
            <div className={styles.StoreItemCard__heading}>
              <div className={styles.StoreItemCard__titles}>
                <span className={styles.StoreItemCard__category}><Skeleton shape="line" width="40%" /></span>
                <span className={styles.StoreItemCard__name}>
                  <Skeleton shape="line" width="95%" />
                  <br />
                  <Skeleton shape="line" width="70%" />
                </span>
              </div>
              <span className={styles.StoreItemCard__save} style={{ background: 'none' }}>
                <Skeleton shape="circle" width={44} height={44} />
              </span>
            </div>
            <span className={styles.StoreItemCard__description}>
              <Skeleton shape="line" width="90%" />
              <br />
              <Skeleton shape="line" width="60%" />
            </span>
            <div className={styles.StoreItemCard__priceRow}>
              <span className={styles.StoreItemCard__fulfillment}>
                <Skeleton shape="circle" width={32} height={32} />
                <span style={{ flex: 1 }}><Skeleton shape="line" width="70%" /></span>
              </span>
              <Skeleton width={96} height={40} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.StoreItemCard__store}>
        <span className={styles.StoreItemCard__avatar}><Skeleton shape="avatar" width={48} height={48} /></span>
        <span className={styles.StoreItemCard__names}>
          <span className={styles.StoreItemCard__storeName}><Skeleton shape="line" width="70%" /></span>
          <span className={styles.StoreItemCard__address}><Skeleton shape="line" width="50%" /></span>
          <span className={styles.StoreItemCard__status}><Skeleton shape="line" width="35%" /></span>
        </span>
        <Skeleton shape="circle" width={44} height={44} style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
});

StoreItemCardSkeleton.displayName = 'StoreItemCardSkeleton';
