import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type MergeProps } from '../../types';
import carouselStyles from '../Carousel/Carousel.module.scss';
import { Skeleton } from '../Skeleton';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './InfoCard.module.scss';

interface InfoCardSkeletonOwnProps {
  /** Texto para o leitor de tela, traduzido pelo app ("Carregando"). */
  label: string
  /** Mostra a barra curta do "Ver todas" ao lado do título. */
  seeAll?: boolean
  /** O esqueleto de um cartão (`OrderProgressCardSkeleton`...). Com `peek`, aparece duas vezes. */
  children: ReactNode
  /** Quantas barrinhas do carrossel; 0 esconde. 3 por padrão. */
  bars?: number
  /** Um cartão e meio, como o `Carousel peek` (Mais Recomendados). */
  peek?: boolean
}

export type InfoCardSkeletonProps = MergeProps<ComponentProps<'section'>, InfoCardSkeletonOwnProps>;

/**
 * Esqueleto de um módulo com carrossel (regra U10): a moldura do `InfoCard plain`, o título,
 * o "Ver todas", o cartão de dentro e as barrinhas, nas mesmas medidas do real.
 */
export const InfoCardSkeleton = forwardRef<HTMLElement, InfoCardSkeletonProps>((props, ref) => {
  const { label, seeAll = false, children, bars = 3, peek = false, className, ...rest } = props;
  const title = <Skeleton shape="line" width="55%" />;

  return (
    <section ref={ref} className={clsx(styles.InfoCard, className)} aria-busy="true" {...rest}>
      <span role="status" className={skeletonStyles.Skeleton__status}>{label}</span>
      {seeAll
        ? (
          <div className={styles.InfoCard__header} aria-hidden>
            <span className={clsx(styles.InfoCard__title, styles.InfoCard__title_withSeeAll)} style={{ flex: 1 }}>{title}</span>
            <span className={styles.InfoCard__seeAll}><Skeleton shape="line" width={56} /></span>
          </div>
        )
        : <span className={styles.InfoCard__title} aria-hidden>{title}</span>}
      <div className={clsx(carouselStyles.Carousel, peek && carouselStyles.Carousel_peek)} aria-hidden>
        <div className={clsx(carouselStyles.Carousel__track, peek && carouselStyles.Carousel__track_peek)} style={{ overflow: 'hidden' }}>
          <div className={carouselStyles.Carousel__page}>{children}</div>
          {peek && <div className={carouselStyles.Carousel__page}>{children}</div>}
        </div>
        {bars > 0 && (
          <div className={carouselStyles.Carousel__pager}>
            {Array.from({ length: bars }, (_, index) => (
              <span key={index} className={carouselStyles.Carousel__bar} style={{ opacity: index === 0 ? 0.9 : 0.5 }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

InfoCardSkeleton.displayName = 'InfoCardSkeleton';
