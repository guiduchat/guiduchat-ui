import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import { StarTile } from '../StarTile';
import { ProviderLogo, type ReviewProviderName } from './ProviderLogo';
import styles from './Review.module.scss';

export type { ReviewProviderName } from './ProviderLogo';

interface ReviewRailOwnProps {
  /** Nome da faixa para o leitor de tela. */
  label: string
}

export type ReviewRailProps = MergeProps<ComponentProps<'div'>, ReviewRailOwnProps>;

/** Faixa com rolagem lateral para o resumo e os cartões de avaliação. */
export const ReviewRail = forwardRef<HTMLDivElement, ReviewRailProps>(({ label, className, ...rest }, ref) => (
  <div ref={ref} role="group" aria-label={label} tabIndex={0} className={clsx(styles.ReviewRail, className)} {...rest} />
));

ReviewRail.displayName = 'ReviewRail';

interface StarRowProps {
  /** Nota de 0 a 5. As estrelas cheias são a nota arredondada (4,5 dá 5). */
  rating: number
  /** Frase única da fileira, por exemplo "Nota 4,5 de 5", vinda do app. Vazia: a fileira é decorativa. */
  label: string
  /** Lado de cada estrela, em px. */
  size: number
}

/** Fileira de 5 `StarTile`: um nome só para o leitor de tela, cada estrela decorativa. */
const StarRow = ({ rating, label, size }: StarRowProps) => {
  // NaN (ou nota fora da faixa) mostra 0 estrelas cheias.
  const filled = Number.isFinite(rating) ? Math.min(5, Math.max(0, Math.round(rating))) : 0;
  // Sem frase não há nome: a fileira vira decorativa, em vez de um `img` sem nome.
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <span {...a11y} className={styles.StarRow}>
      {[0, 1, 2, 3, 4].map((index) => <StarTile key={index} size={size} empty={index >= filled} />)}
    </span>
  );
};

interface ReviewSummaryOwnProps {
  /** Provedor: escolhe o logo oficial. */
  provider: ReviewProviderName
  /** Nome do logo para o leitor de tela, vindo do app ("Google", "Tripadvisor"). */
  providerLabel: string
  /** Nota e contagem em texto, por exemplo "4,5 (128)". Vem pronto do app. */
  score: ReactNode
  /** Nota de 0 a 5; as estrelas cheias são a nota arredondada. */
  rating: number
  /** Frase da fileira de estrelas, por exemplo "Nota 4,5 de 5". Vem do app. */
  ratingLabel: string
}

export type ReviewSummaryProps = MergeProps<ComponentProps<'article'>, ReviewSummaryOwnProps>;

/** Resumo de um provedor: logo grande, nota com a contagem e cinco estrelas. */
export const ReviewSummary = forwardRef<HTMLElement, ReviewSummaryProps>((props, ref) => {
  const { provider, providerLabel, score, rating, ratingLabel, className, ...rest } = props;
  return (
    <article ref={ref} className={clsx(styles.ReviewSummary, className)} {...rest}>
      <ProviderLogo provider={provider} label={providerLabel} />
      <span className={styles.ReviewSummary__score}>{score}</span>
      <StarRow rating={rating} label={ratingLabel} size={16} />
    </article>
  );
});

ReviewSummary.displayName = 'ReviewSummary';

interface ReviewCardOwnProps {
  /** O texto da avaliação; passa de duas linhas, é cortado. */
  text: ReactNode
  /** Quem avaliou. */
  author: ReactNode
  /** Foto de quem avaliou, em geral `Avatar.Container` redondo de 36 px. */
  avatar?: ReactNode
  /** Nota de 0 a 5; as estrelas cheias são a nota arredondada. */
  rating?: number
  /** Frase da fileira de estrelas, por exemplo "Nota 4 de 5". Vem do app, junto de `rating`. */
  ratingLabel?: string
}

export type ReviewCardProps = MergeProps<ComponentProps<'article'>, ReviewCardOwnProps>;

/** Cartão de uma avaliação: texto em até 2 linhas e, embaixo, avatar, estrelas e nome. */
export const ReviewCard = forwardRef<HTMLElement, ReviewCardProps>((props, ref) => {
  const { text, author, avatar, rating, ratingLabel, className, ...rest } = props;
  return (
    <article ref={ref} className={clsx(styles.ReviewCard, className)} {...rest}>
      <p className={styles.ReviewCard__text}>{text}</p>
      <div className={styles.ReviewCard__footer}>
        {hasReactNode(avatar) && <span className={styles.ReviewCard__avatar}>{avatar}</span>}
        <span className={styles.ReviewCard__meta}>
          {rating !== undefined && <StarRow rating={rating} label={ratingLabel ?? ''} size={14} />}
          <span className={styles.ReviewCard__author}>{author}</span>
        </span>
      </div>
    </article>
  );
});

ReviewCard.displayName = 'ReviewCard';
