import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './HeaderCard.module.scss';

interface HeaderCardSkeletonOwnProps {
  /** Texto para o leitor de tela, traduzido pelo app ("Carregando"). */
  label: string
  /** Tamanho do avatar; 48 px por padrão, como no Para Você. */
  avatarSize?: number
}

export type HeaderCardSkeletonProps = MergeProps<ComponentProps<'section'>, HeaderCardSkeletonOwnProps>;

/** Esqueleto do `HeaderCard` (regra U10): avatar, saudação, frase em duas linhas e a busca. */
export const HeaderCardSkeleton = forwardRef<HTMLElement, HeaderCardSkeletonProps>((props, ref) => {
  const { label, avatarSize = 48, className, ...rest } = props;
  return (
    <section ref={ref} className={clsx(styles.HeaderCard, className)} aria-busy="true" {...rest}>
      <span role="status" className={skeletonStyles.Skeleton__status}>{label}</span>
      <div className={styles.HeaderCard__top} aria-hidden>
        <span className={styles.HeaderCard__avatar}>
          <Skeleton shape="avatar" width={avatarSize} height={avatarSize} />
        </span>
        <span className={styles.HeaderCard__greeting} style={{ flex: 1 }}><Skeleton shape="line" width="40%" /></span>
      </div>
      <span className={styles.HeaderCard__title} style={{ display: 'block' }} aria-hidden>
        <Skeleton shape="line" width="90%" />
        <br />
        <Skeleton shape="line" width="60%" />
      </span>
      <div className={styles.HeaderCard__search} aria-hidden>
        <Skeleton shape="line" width="45%" style={{ marginLeft: 12 }} />
      </div>
    </section>
  );
});

HeaderCardSkeleton.displayName = 'HeaderCardSkeleton';
