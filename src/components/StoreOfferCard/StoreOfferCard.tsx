import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './StoreOfferCard.module.scss';

export interface StoreOfferCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface StoreOfferCardAction extends AsChildProp {
  /** Nome acessível do botão de seta, traduzido pelo app. */
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link aqui: `<a href="...">`. O kit põe a seta dentro dele. */
  children?: ReactNode
}

interface StoreOfferCardOwnProps {
  /** Foto da loja. Sem ela, fica uma reserva com ícone. */
  image?: StoreOfferCardImage
  /** Categoria, acima do nome. */
  category?: ReactNode
  /** Nome da loja. */
  name: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  nameAs?: ElementType
  /** Endereço. */
  address?: ReactNode
  /** Nota, em geral estrela e número. Slot do app. */
  rating?: ReactNode
  /** Botão redondo de seta, na cor de destaque. */
  action?: StoreOfferCardAction
  /** Frase da promoção da loja, já pronta do app. Sem ela, a faixa não aparece. */
  promo?: ReactNode
}

export type StoreOfferCardProps = MergeProps<ComponentProps<'article'>, StoreOfferCardOwnProps>;

/**
 * Loja com a promoção em uma faixa: o cartão de dentro do carrossel Favoritos.
 * Sem fundo próprio: vai dentro de um `InfoCard plain` e de um `Carousel`. Textos vêm do app.
 */
export const StoreOfferCard = forwardRef<HTMLElement, StoreOfferCardProps>((props, ref) => {
  const { image, category, name, nameAs: Name = 'h3', address, rating, action, promo, className, ...rest } = props;
  const ActionRoot: ElementType = action?.asChild ? Slot : 'button';

  return (
    <article ref={ref} className={clsx(styles.StoreOfferCard, className)} {...rest}>
      <div className={styles.StoreOfferCard__frame}>
        <div className={styles.StoreOfferCard__media}>
          {image
            ? <img className={styles.StoreOfferCard__image} src={image.src} alt={image.alt ?? ''} />
            : <Icon icon={icons.image} size={32} />}
        </div>
        <div className={styles.StoreOfferCard__info}>
          {hasReactNode(category) && <span className={styles.StoreOfferCard__category}>{category}</span>}
          <Name className={styles.StoreOfferCard__name}>{name}</Name>
          {hasReactNode(address) && <span className={styles.StoreOfferCard__address}>{address}</span>}
          {hasReactNode(rating) && <span className={styles.StoreOfferCard__rating}>{rating}</span>}
        </div>
        {action && (
          <ActionRoot
            type={action.asChild ? undefined : 'button'}
            className={styles.StoreOfferCard__action}
            aria-label={action.label}
            onClick={action.onClick}
          >
            <Slottable>{action.children}</Slottable>
            <Icon icon={icons.arrowForward} size={24} />
          </ActionRoot>
        )}
      </div>
      {hasReactNode(promo) && (
        <p className={styles.StoreOfferCard__promo}>
          <span className={styles.StoreOfferCard__promoIcon}><Icon icon={icons.coupon} size={24} /></span>
          <span className={styles.StoreOfferCard__promoText}>{promo}</span>
        </p>
      )}
    </article>
  );
});

StoreOfferCard.displayName = 'StoreOfferCard';
