import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './FilterTags.module.scss';

export type FilterTagsSkeletonProps = MergeProps<ComponentProps<'div'>, { count?: number }>;

/** Esqueleto da fileira de tags (regra U10): barras de 32 px com o raio das tags. */
export const FilterTagsSkeleton = forwardRef<HTMLDivElement, FilterTagsSkeletonProps>((props, ref) => {
  const { count = 3, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.FilterTags, className)} aria-hidden {...rest}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} width={index === 0 ? 52 : 76} height={32} style={{ borderRadius: 12, flexShrink: 0 }} />
      ))}
      <Skeleton width={32} height={32} style={{ borderRadius: 12, flexShrink: 0 }} />
    </div>
  );
});

FilterTagsSkeleton.displayName = 'FilterTagsSkeleton';
