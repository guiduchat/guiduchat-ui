import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './ProductSummary.module.scss';

interface ProductSummaryOwnProps {
  /** Categoria, acima do nome, como "Cervejas". */
  category?: ReactNode
  /** Nome do produto, centralizado. */
  name: ReactNode
  /** Elemento do nome. `h1` por padrão. */
  nameAs?: ElementType
  /** Frase do selo, como "Descontos de até <strong>35%</strong>". O `<strong>` fica em negrito. Sem ela, sem selo. */
  discount?: ReactNode
  /** Legenda do preço, como "A partir de:". Sai em maiúsculas. */
  priceLabel?: ReactNode
  /** Símbolo da moeda, como "R$". */
  currency?: ReactNode
  /** Preço, como "7,80". Vem formatado do app; o kit não calcula. */
  price: ReactNode
}

export type ProductSummaryProps = MergeProps<ComponentProps<'div'>, ProductSummaryOwnProps>;

/**
 * Resumo do produto, sob a imagem: categoria, nome, selo de desconto (cor de estado do kit) e o preço
 * grande, na mesma linha da legenda. Só apresentação.
 */
export const ProductSummary = forwardRef<HTMLDivElement, ProductSummaryProps>((props, ref) => {
  const { category, name, nameAs: Name = 'h1', discount, priceLabel, currency, price, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductSummary, className)} {...rest}>
      <div className={styles.ProductSummary__titles}>
        {hasReactNode(category) && <span className={styles.ProductSummary__category}>{category}</span>}
        <Name className={styles.ProductSummary__name}>{name}</Name>
      </div>
      {hasReactNode(discount) && (
        <p className={styles.ProductSummary__badge}>
          <Icon icon={icons.sparkles} size={20} />
          <span>{discount}</span>
        </p>
      )}
      <p className={styles.ProductSummary__price}>
        {hasReactNode(priceLabel) && <span className={styles.ProductSummary__priceLabel}>{priceLabel}</span>}
        <span className={styles.ProductSummary__amount}>
          {hasReactNode(currency) && <span className={styles.ProductSummary__currency}>{currency}</span>}
          {price}
        </span>
      </p>
    </div>
  );
});

ProductSummary.displayName = 'ProductSummary';
