import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './ProductHero.module.scss';

export type ProductHeroSkeletonProps = MergeProps<ComponentProps<'div'>, { actions?: number }>;

/**
 * Esqueleto do `ProductHero` (regra U10): o quadro da imagem e a coluna de ações. Usa as classes do
 * componente, então a página não pula quando a imagem chega. Só visual.
 */
export const ProductHeroSkeleton = forwardRef<HTMLDivElement, ProductHeroSkeletonProps>((props, ref) => {
  const { actions = 4, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductHero, className)} aria-hidden {...rest}>
      <Skeleton width="100%" height="100%" />
      <div className={styles.ProductHero__actions}>
        {Array.from({ length: actions }, (_, index) => (
          <Skeleton key={index} shape="circle" width={44} height={44} />
        ))}
      </div>
    </div>
  );
});

ProductHeroSkeleton.displayName = 'ProductHeroSkeleton';
