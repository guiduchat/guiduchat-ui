import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './ProductSummary.module.scss';

export type ProductSummarySkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `ProductSummary` (regra U10): categoria, nome em duas linhas, selo e preço. Usa as classes
 * do componente, então a página não pula quando os dados chegam. Só visual.
 */
export const ProductSummarySkeleton = forwardRef<HTMLDivElement, ProductSummarySkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductSummary, className)} aria-hidden {...rest}>
      <div className={styles.ProductSummary__titles} style={{ width: '100%' }}>
        <span className={styles.ProductSummary__category} style={{ width: '30%' }}><Skeleton shape="line" width="100%" /></span>
        <span className={styles.ProductSummary__name} style={{ width: '70%' }}>
          <Skeleton shape="line" width="100%" />
          <br />
          <Skeleton shape="line" width="80%" />
        </span>
      </div>
      <Skeleton width={196} height={28} style={{ borderRadius: 'var(--border-radius-circle)' }} />
      <div className={styles.ProductSummary__price}>
        <Skeleton width={120} height={40} />
      </div>
    </div>
  );
});

ProductSummarySkeleton.displayName = 'ProductSummarySkeleton';
