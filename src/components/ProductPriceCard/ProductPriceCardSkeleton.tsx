import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './ProductPriceCard.module.scss';

export type ProductPriceCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `ProductPriceCard` (regra U10): foto, nome em duas linhas, marca, nota, a frase das ofertas,
 * o preço e a faixa de baixo com o botão. Usa as classes do cartão. Só visual: quem carrega marca o
 * contêiner com `aria-busy` e um texto para o leitor de tela.
 */
export const ProductPriceCardSkeleton = forwardRef<HTMLDivElement, ProductPriceCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductPriceCard, className)} aria-hidden {...rest}>
      <div className={styles.ProductPriceCard__body}>
        <div className={styles.ProductPriceCard__top}>
          <div className={styles.ProductPriceCard__media}><Skeleton width="100%" height="100%" /></div>
          <div className={styles.ProductPriceCard__info}>
            <span className={styles.ProductPriceCard__name}>
              <Skeleton shape="line" width="95%" />
              <br />
              <Skeleton shape="line" width="70%" />
            </span>
            <span className={styles.ProductPriceCard__brand}><Skeleton shape="line" width="45%" /></span>
            <div className={styles.ProductPriceCard__priceRow}>
              <span className={styles.ProductPriceCard__offers} style={{ flex: 1 }}>
                <Skeleton shape="line" width="60%" />
                <br />
                <Skeleton shape="line" width="70%" />
                <br />
                <Skeleton shape="line" width="55%" />
              </span>
              <Skeleton width={96} height={40} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ProductPriceCard__footer}>
        <span className={styles.ProductPriceCard__delivery}>
          <Skeleton width={44} height={44} />
          <span style={{ flex: 1 }}><Skeleton shape="line" width="80%" /></span>
        </span>
        <Skeleton width={160} height={56} style={{ borderRadius: 20, flexShrink: 0 }} />
      </div>
    </div>
  );
});

ProductPriceCardSkeleton.displayName = 'ProductPriceCardSkeleton';
