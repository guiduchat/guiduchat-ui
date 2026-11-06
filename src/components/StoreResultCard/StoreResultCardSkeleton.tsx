import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './StoreResultCard.module.scss';

export type StoreResultCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `StoreResultCard` (regra U10): foto, nome, ofertas e preço, a loja e a faixa de baixo
 * com o botão. Usa as classes do cartão. Só visual: quem carrega marca o contêiner com `aria-busy`.
 */
export const StoreResultCardSkeleton = forwardRef<HTMLDivElement, StoreResultCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.StoreResultCard, className)} aria-hidden {...rest}>
      <div className={styles.StoreResultCard__body}>
        <div className={styles.StoreResultCard__top}>
          <div className={styles.StoreResultCard__media}><Skeleton width="100%" height="100%" /></div>
          <div className={styles.StoreResultCard__info}>
            <div className={styles.StoreResultCard__heading}>
              <span className={styles.StoreResultCard__name}>
                <Skeleton shape="line" width="95%" />
                <br />
                <Skeleton shape="line" width="70%" />
              </span>
              <span className={styles.StoreResultCard__save} style={{ background: 'none' }}>
                <Skeleton shape="circle" width={44} height={44} />
              </span>
            </div>
            <div className={styles.StoreResultCard__priceRow}>
              <span className={styles.StoreResultCard__offers} style={{ flex: 1 }}>
                <Skeleton shape="line" width="60%" />
                <br />
                <Skeleton shape="line" width="70%" />
                <br />
                <Skeleton shape="line" width="55%" />
              </span>
              <Skeleton width={96} height={40} />
            </div>
            <div className={styles.StoreResultCard__store}>
              <span className={styles.StoreResultCard__avatar}><Skeleton shape="avatar" width={40} height={40} /></span>
              <span className={styles.StoreResultCard__names}>
                <span className={styles.StoreResultCard__storeName}><Skeleton shape="line" width="70%" /></span>
                <span className={styles.StoreResultCard__address}><Skeleton shape="line" width="50%" /></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.StoreResultCard__footer}>
        <span className={styles.StoreResultCard__delivery}>
          <Skeleton shape="circle" width={44} height={44} />
          <span style={{ flex: 1 }}><Skeleton shape="line" width="80%" /></span>
        </span>
        <Skeleton width={120} height={44} style={{ borderRadius: 'var(--size-border-radius-button-small)', flexShrink: 0 }} />
      </div>
    </div>
  );
});

StoreResultCardSkeleton.displayName = 'StoreResultCardSkeleton';
