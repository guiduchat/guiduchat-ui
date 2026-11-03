import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './OrderProgressCard.module.scss';

export type OrderProgressCardSkeletonProps = MergeProps<ComponentProps<'div'>, { steps?: number }>;

/**
 * Esqueleto do `OrderProgressCard` (regra U10): linhas à direita, foto, passos e o rodapé com
 * avatar, loja e botão. Usa as classes do cartão, então as medidas são as mesmas.
 * Só visual: vai dentro de um `InfoCardSkeleton`, que avisa o leitor de tela.
 */
export const OrderProgressCardSkeleton = forwardRef<HTMLDivElement, OrderProgressCardSkeletonProps>((props, ref) => {
  const { steps = 4, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.OrderProgressCard, className)} aria-hidden {...rest}>
      <div className={styles.OrderProgressCard__frame}>
        <div className={styles.OrderProgressCard__info} style={{ width: '100%' }}>
          <span className={styles.OrderProgressCard__status} style={{ width: '100%' }}><Skeleton shape="line" width="75%" /></span>
          <span className={styles.OrderProgressCard__line} style={{ width: '100%' }}><Skeleton shape="line" width="45%" /></span>
          <span className={styles.OrderProgressCard__line} style={{ width: '100%' }}><Skeleton shape="line" width="30%" /></span>
        </div>
        <p className={styles.OrderProgressCard__updated}>
          <span style={{ flex: 1, textAlign: 'right' }}><Skeleton shape="line" width="65%" /></span>
          <span className={styles.OrderProgressCard__updatedIcon}><Skeleton width={24} height={24} /></span>
        </p>
        <div className={styles.OrderProgressCard__media}><Skeleton width="100%" height="100%" /></div>
        <div className={styles.OrderProgressCard__steps}>
          <div className={skeletonStyles.Skeleton__steps}>
            {Array.from({ length: steps }, (_, index) => (
              <Skeleton key={index} className={skeletonStyles.Skeleton__step} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.OrderProgressCard__footer}>
        <span className={styles.OrderProgressCard__avatar}><Skeleton shape="avatar" width={44} height={44} /></span>
        <span className={styles.OrderProgressCard__store}>
          <span className={styles.OrderProgressCard__storeName}><Skeleton shape="line" width="80%" /></span>
          <span className={styles.OrderProgressCard__category}><Skeleton shape="line" width="50%" /></span>
        </span>
        <span className={styles.OrderProgressCard__action}><Skeleton width={88} height={44} style={{ borderRadius: 22 }} /></span>
      </div>
    </div>
  );
});

OrderProgressCardSkeleton.displayName = 'OrderProgressCardSkeleton';
