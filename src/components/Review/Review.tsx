import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './Review.module.scss';

interface ReviewRailOwnProps {
  /** Nome da faixa para o leitor de tela. */
  label: string
}

export type ReviewRailProps = MergeProps<ComponentProps<'div'>, ReviewRailOwnProps>;

/** Faixa com rolagem lateral para os cartões de avaliação. */
export const ReviewRail = forwardRef<HTMLDivElement, ReviewRailProps>(({ label, className, ...rest }, ref) => (
  <div ref={ref} role="group" aria-label={label} tabIndex={0} className={clsx(styles.ReviewRail, className)} {...rest} />
));

ReviewRail.displayName = 'ReviewRail';

interface ReviewSummaryOwnProps {
  /** Marca do provedor (Tripadvisor, Google). */
  logo: ReactNode
  /** Linha da quantidade, por exemplo "12 avaliações". */
  count: ReactNode
  /** Em geral o `RatingStars`. */
  rating: ReactNode
}

export type ReviewSummaryProps = MergeProps<ComponentProps<'article'>, ReviewSummaryOwnProps>;

/** Resumo de um provedor: marca, quantidade e nota. */
export const ReviewSummary = forwardRef<HTMLElement, ReviewSummaryProps>(({ logo, count, rating, className, ...rest }, ref) => (
  <article ref={ref} className={clsx(styles.ReviewSummary, className)} {...rest}>
    <span className={styles.ReviewSummary__logo}>{logo}</span>
    <span className={styles.ReviewSummary__count}>{count}</span>
    {rating}
  </article>
));

ReviewSummary.displayName = 'ReviewSummary';

interface ReviewCardOwnProps {
  /** O texto da avaliação; passa de três linhas, é cortado. */
  text: ReactNode
  /** Quem avaliou. */
  author: ReactNode
  /** Foto de quem avaliou, em geral `Avatar.Container` de 32 px. */
  avatar?: ReactNode
  /** Em geral o `RatingStars`. */
  rating?: ReactNode
  /** De onde veio a avaliação, por exemplo "Google". */
  source?: ReactNode
}

export type ReviewCardProps = MergeProps<ComponentProps<'article'>, ReviewCardOwnProps>;

/** Cartão de uma avaliação. */
export const ReviewCard = forwardRef<HTMLElement, ReviewCardProps>((props, ref) => {
  const { text, author, avatar, rating, source, className, ...rest } = props;
  return (
    <article ref={ref} className={clsx(styles.ReviewCard, className)} {...rest}>
      <p className={styles.ReviewCard__text}>{text}</p>
      <div className={styles.ReviewCard__footer}>
        {hasReactNode(avatar) && <span className={styles.ReviewCard__avatar}>{avatar}</span>}
        <span className={styles.ReviewCard__meta}>
          {rating}
          <span className={styles.ReviewCard__author}>
            {author}
            {hasReactNode(source) && (
              <>
                {' '}
                ·
                {source}
              </>
            )}
          </span>
        </span>
      </div>
    </article>
  );
});

ReviewCard.displayName = 'ReviewCard';
