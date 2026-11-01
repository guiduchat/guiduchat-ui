import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './StorePhotoCard.module.scss';

export interface StorePhotoCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface StorePhotoCardAction extends AsChildProp {
  /** Nome acessível do botão de seta, traduzido pelo app. */
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link aqui: `<a href="...">`. O kit põe a seta dentro dele. */
  children?: ReactNode
}

interface StorePhotoCardOwnProps {
  /** Foto grande da loja. Sem ela, fica uma reserva com ícone. */
  image?: StorePhotoCardImage
  /** Categoria, abaixo da foto. */
  category?: ReactNode
  /** Nome da loja. */
  name: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  nameAs?: ElementType
  /** Endereço. */
  address?: ReactNode
  /** Nota, em geral estrela e número. Slot do app. */
  rating?: ReactNode
  /** Botão redondo de seta sobre a foto, na cor de destaque. */
  action?: StorePhotoCardAction
}

export type StorePhotoCardProps = MergeProps<ComponentProps<'article'>, StorePhotoCardOwnProps>;

/**
 * Foto grande com a seta sobre ela e os textos da loja embaixo: o cartão de dentro do carrossel
 * Mais Recomendados. Sem fundo próprio: vai direto sobre um `InfoCard plain`. Textos vêm do app.
 */
export const StorePhotoCard = forwardRef<HTMLElement, StorePhotoCardProps>((props, ref) => {
  const { image, category, name, nameAs: Name = 'h3', address, rating, action, className, ...rest } = props;
  const ActionRoot: ElementType = action?.asChild ? Slot : 'button';

  return (
    <article ref={ref} className={clsx(styles.StorePhotoCard, className)} {...rest}>
      <div className={styles.StorePhotoCard__media}>
        {image
          ? <img className={styles.StorePhotoCard__image} src={image.src} alt={image.alt ?? ''} />
          : <Icon icon={icons.image} size={32} />}
        {action && (
          <ActionRoot
            type={action.asChild ? undefined : 'button'}
            className={styles.StorePhotoCard__action}
            aria-label={action.label}
            onClick={action.onClick}
          >
            <Slottable>{action.children}</Slottable>
            <Icon icon={icons.arrowForward} size={24} />
          </ActionRoot>
        )}
      </div>
      <div className={styles.StorePhotoCard__info}>
        {hasReactNode(category) && <span className={styles.StorePhotoCard__category}>{category}</span>}
        <Name className={styles.StorePhotoCard__name}>{name}</Name>
        {hasReactNode(address) && <span className={styles.StorePhotoCard__address}>{address}</span>}
        {hasReactNode(rating) && <span className={styles.StorePhotoCard__rating}>{rating}</span>}
      </div>
    </article>
  );
});

StorePhotoCard.displayName = 'StorePhotoCard';
