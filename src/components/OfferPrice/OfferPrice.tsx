import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './OfferPrice.module.scss';

interface OfferPriceOwnProps {
  /** Preço atual, já formatado pelo app (moeda e idioma). */
  price: ReactNode
  /** Preço antigo, já formatado. Aparece riscado e menor ao lado do atual. */
  originalPrice?: ReactNode
  /** Texto lido antes do preço antigo, como "Preço original" (traduzido pelo app). Recomendado com `originalPrice`. */
  originalPriceLabel?: string
}

export type OfferPriceProps = MergeProps<ComponentProps<'p'>, OfferPriceOwnProps>;

/** Preço da oferta em destaque, com o preço antigo riscado. */
export const OfferPrice = forwardRef<HTMLParagraphElement, OfferPriceProps>((props, ref) => {
  const { price, originalPrice, originalPriceLabel, className, ...rest } = props;
  return (
    <p ref={ref} className={clsx(styles.OfferPrice, className)} {...rest}>
      <span className={styles.OfferPrice__price}>{price}</span>
      {hasReactNode(originalPrice) && (
        <>
          {originalPriceLabel && <span className={styles.OfferPrice__label}>{originalPriceLabel}</span>}
          <s className={styles.OfferPrice__original}>{originalPrice}</s>
        </>
      )}
    </p>
  );
});

OfferPrice.displayName = 'OfferPrice';
