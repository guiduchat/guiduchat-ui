import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './ListingCard.module.scss';

export interface ListingCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface ListingCardAction extends AsChildProp {
  /** Nome acessível do botão de seta, traduzido pelo app. */
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link aqui: `<a href="...">`. O kit põe a seta dentro dele. */
  children?: ReactNode
}

interface ListingCardOwnProps {
  /** Foto. Sem ela, fica uma reserva com ícone. */
  image?: ListingCardImage
  /** Linha de cima: o tipo ou a categoria ("Restaurantes & Bares", "Ofertas & Cupons", "Bebidas"). */
  eyebrow?: ReactNode
  /** Nome do local, da oferta ou do item. Uma linha, com reticências. */
  title: ReactNode
  /** Elemento do título. `h3` por padrão. */
  titleAs?: ElementType
  /** Linha de apoio: endereço do local ou nome da loja. Uma linha. */
  subtitle?: ReactNode
  /** Nota, em geral StarTile e número. Slot do app. Sem `price`. */
  rating?: ReactNode
  /** Preço já formatado pelo app, em destaque. Tem prioridade sobre `rating`. */
  price?: ReactNode
  /** Complemento do preço, menor ("12 unds"). */
  priceNote?: ReactNode
  /** Botão redondo de seta, na cor de destaque. */
  action?: ListingCardAction
}

export type ListingCardProps = MergeProps<ComponentProps<'article'>, ListingCardOwnProps>;

/**
 * Cartão coringa de um item de catálogo: local, oferta, produto e, depois, serviço ou hospedagem.
 * Foto à esquerda; tipo, título, apoio e nota ou preço à direita; seta no canto.
 * Sem fundo de fora: vai dentro de um `InfoCard plain` e de um `Carousel`. Textos vêm do app.
 */
export const ListingCard = forwardRef<HTMLElement, ListingCardProps>((props, ref) => {
  const {
    image,
    eyebrow,
    title,
    titleAs: Title = 'h3',
    subtitle,
    rating,
    price,
    priceNote,
    action,
    className,
    ...rest
  } = props;
  const ActionRoot: ElementType = action?.asChild ? Slot : 'button';
  const hasPrice = hasReactNode(price);

  return (
    <article ref={ref} className={clsx(styles.ListingCard, className)} {...rest}>
      <div className={styles.ListingCard__media}>
        {image
          ? <img className={styles.ListingCard__image} src={image.src} alt={image.alt ?? ''} />
          : <Icon icon={icons.image} size={32} />}
      </div>
      <div className={styles.ListingCard__info}>
        {hasReactNode(eyebrow) && <span className={styles.ListingCard__eyebrow}>{eyebrow}</span>}
        <Title className={styles.ListingCard__title}>{title}</Title>
        {hasReactNode(subtitle) && <span className={styles.ListingCard__subtitle}>{subtitle}</span>}
        {hasPrice
          ? (
            <span className={styles.ListingCard__price}>
              <span className={styles.ListingCard__priceValue}>{price}</span>
              {hasReactNode(priceNote) && <span className={styles.ListingCard__priceNote}>{priceNote}</span>}
            </span>
          )
          : hasReactNode(rating) && <span className={styles.ListingCard__rating}>{rating}</span>}
      </div>
      {action && (
        <ActionRoot
          type={action.asChild ? undefined : 'button'}
          className={styles.ListingCard__action}
          aria-label={action.label}
          onClick={action.onClick}
        >
          <Slottable>{action.children}</Slottable>
          <Icon icon={icons.arrowForward} size={24} />
        </ActionRoot>
      )}
    </article>
  );
});

ListingCard.displayName = 'ListingCard';
