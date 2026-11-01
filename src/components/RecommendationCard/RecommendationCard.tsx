import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './RecommendationCard.module.scss';

export interface RecommendationCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface RecommendationCardAction extends AsChildProp {
  /** Nome acessível do botão de seta, traduzido pelo app. */
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link aqui: `<a href="...">`. O kit põe a seta dentro dele. */
  children?: ReactNode
}

interface RecommendationCardOwnProps {
  /** Título do cartão, por exemplo "Indicações Locais". */
  title: ReactNode
  /** Elemento do título. `h3` por padrão. */
  titleAs?: ElementType
  /** Slot do link "Ver todas", do app. */
  seeAll?: ReactNode
  /** Foto da loja indicada. Sem ela, fica uma reserva com ícone. */
  image?: RecommendationCardImage
  /** Categoria, acima do nome. */
  category?: ReactNode
  /** Nome da loja indicada. */
  name: ReactNode
  /** Endereço. */
  address?: ReactNode
  /** Nota, em geral estrela e número. Slot do app. */
  rating?: ReactNode
  /** Botão redondo de seta, na cor de destaque. */
  action?: RecommendationCardAction
  /** Quem indica, em geral `Avatar.Container` de 28 px em círculo. Aparecem sobrepostos. */
  avatars?: ReactNode[]
  /** Linha "Indicado por ...". Use `<strong>` para o destaque em parte do texto. */
  note?: ReactNode
}

export type RecommendationCardProps = MergeProps<ComponentProps<'section'>, RecommendationCardOwnProps>;

/** Cartão "Indicações Locais": uma loja indicada e quem a indica. Textos vêm do app. */
export const RecommendationCard = forwardRef<HTMLElement, RecommendationCardProps>((props, ref) => {
  const { title, titleAs: Title = 'h3', seeAll, image, category, name, address, rating, action, avatars, note, className, ...rest } = props;
  const avatarList = avatars ?? [];
  const ActionRoot: ElementType = action?.asChild ? Slot : 'button';

  return (
    <section ref={ref} className={clsx(styles.RecommendationCard, className)} {...rest}>
      <div className={styles.RecommendationCard__header}>
        <Title className={styles.RecommendationCard__title}>{title}</Title>
        {hasReactNode(seeAll) && <span className={styles.RecommendationCard__seeAll}>{seeAll}</span>}
      </div>
      <div className={styles.RecommendationCard__frame}>
        <div className={styles.RecommendationCard__media}>
          {image
            ? <img className={styles.RecommendationCard__image} src={image.src} alt={image.alt ?? ''} />
            : <Icon icon={icons.image} size={32} />}
        </div>
        <div className={styles.RecommendationCard__info}>
          {hasReactNode(category) && <span className={styles.RecommendationCard__category}>{category}</span>}
          <span className={styles.RecommendationCard__name}>{name}</span>
          {hasReactNode(address) && <span className={styles.RecommendationCard__address}>{address}</span>}
          {hasReactNode(rating) && <span className={styles.RecommendationCard__rating}>{rating}</span>}
        </div>
        {action && (
          <ActionRoot
            type={action.asChild ? undefined : 'button'}
            className={styles.RecommendationCard__action}
            aria-label={action.label}
            onClick={action.onClick}
          >
            <Slottable>{action.children}</Slottable>
            <Icon icon={icons.arrowForward} size={24} />
          </ActionRoot>
        )}
      </div>
      {(avatarList.length > 0 || hasReactNode(note)) && (
        <div className={styles.RecommendationCard__footer}>
          {avatarList.length > 0 && (
            <span className={styles.RecommendationCard__avatars}>
              {avatarList.map((avatar, index) => (
                <span key={index} className={styles.RecommendationCard__avatar}>{avatar}</span>
              ))}
            </span>
          )}
          {hasReactNode(note) && <p className={styles.RecommendationCard__note}>{note}</p>}
        </div>
      )}
    </section>
  );
});

RecommendationCard.displayName = 'RecommendationCard';
