import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './CartItemCard.module.scss';

export type CartItemCardElementKey = 'media' | 'name' | 'detail' | 'footer' | 'price';

export interface CartItemCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

interface CartItemCardOwnProps {
  /** Foto do item. Sem ela, fica uma reserva com ícone. */
  image?: CartItemCardImage
  /** Nome do produto ou da oferta. */
  name: ReactNode
  /** Variante, por exemplo "Tamanho: grande". */
  detail?: ReactNode
  /** Slot do seletor de quantidade (`QuantityStepper`). */
  stepper?: ReactNode
  /** Preço já formatado pelo app, ou um slot (por exemplo `OfferPrice`). Sai na cor de destaque. */
  price?: ReactNode
  innerClassNames?: InnerClassNamesProp<CartItemCardElementKey>
}

export type CartItemCardProps = MergeProps<ComponentProps<'article'>, CartItemCardOwnProps>;

/** Item do carrinho: foto, nome, variante, quantidade e preço. Textos e valores vêm do app. */
export const CartItemCard = forwardRef<HTMLElement, CartItemCardProps>((props, ref) => {
  const { image, name, detail, stepper, price, innerClassNames, className, ...rest } = props;

  return (
    <article ref={ref} className={clsx(styles.CartItemCard, className)} {...rest}>
      <div className={clsx(styles.CartItemCard__media, innerClassNames?.media)}>
        {image
          ? <img className={styles.CartItemCard__image} src={image.src} alt={image.alt ?? ''} />
          : <Icon icon={icons.image} size={32} />}
      </div>
      <div className={styles.CartItemCard__info}>
        <span className={clsx(styles.CartItemCard__name, innerClassNames?.name)}>{name}</span>
        {hasReactNode(detail) && <span className={clsx(styles.CartItemCard__detail, innerClassNames?.detail)}>{detail}</span>}
        {(hasReactNode(stepper) || hasReactNode(price)) && (
          <div className={clsx(styles.CartItemCard__footer, innerClassNames?.footer)}>
            {hasReactNode(stepper) && <div className={styles.CartItemCard__stepper}>{stepper}</div>}
            {hasReactNode(price) && <span className={clsx(styles.CartItemCard__price, innerClassNames?.price)}>{price}</span>}
          </div>
        )}
      </div>
    </article>
  );
});

CartItemCard.displayName = 'CartItemCard';
