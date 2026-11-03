import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './PlaceListCard.module.scss';

interface PlaceListCardSkeletonOwnProps {
  /** Texto para o leitor de tela, traduzido pelo app ("Carregando"). Sem ele, só o desenho. */
  label?: string
}

export type PlaceListCardSkeletonProps = MergeProps<ComponentProps<'div'>, PlaceListCardSkeletonOwnProps>;

/**
 * Esqueleto do `PlaceListCard` (regra U10): o quadro com avatar, nome, nota, salvar, duas linhas
 * de descrição e o endereço, e o rodapé com o horário, ligar e o botão do chat. Usa as classes do cartão.
 */
export const PlaceListCardSkeleton = forwardRef<HTMLDivElement, PlaceListCardSkeletonProps>((props, ref) => {
  const { label, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.PlaceListCard, className)} aria-busy={label ? true : undefined} {...rest}>
      {label && <span role="status" className={skeletonStyles.Skeleton__status}>{label}</span>}
      <div className={styles.PlaceListCard__frame} aria-hidden>
        <div className={styles.PlaceListCard__open}>
          <span className={styles.PlaceListCard__head}>
            <span className={styles.PlaceListCard__avatar}><Skeleton shape="avatar" width={44} height={44} /></span>
            <span className={styles.PlaceListCard__names} style={{ flex: 1 }}>
              <span className={styles.PlaceListCard__title}><Skeleton shape="line" width="75%" /></span>
              <span className={styles.PlaceListCard__rating}><Skeleton shape="line" width="35%" /></span>
            </span>
          </span>
          <span className={styles.PlaceListCard__description}>
            <Skeleton shape="line" width="95%" />
            <br />
            <Skeleton shape="line" width="70%" />
          </span>
          <span className={styles.PlaceListCard__address}>
            <Skeleton width={24} height={24} />
            <span className={styles.PlaceListCard__addressText} style={{ flex: 1 }}><Skeleton shape="line" width="80%" /></span>
          </span>
        </div>
        <span className={styles.PlaceListCard__save} style={{ background: 'none' }}>
          <Skeleton shape="circle" width={44} height={44} />
        </span>
      </div>
      <div className={styles.PlaceListCard__footer} aria-hidden>
        <span className={styles.PlaceListCard__hours} style={{ flex: 1 }}>
          <Skeleton shape="circle" width={44} height={44} />
          <span className={styles.PlaceListCard__hoursText} style={{ flex: 1 }}>
            <span className={styles.PlaceListCard__status}><Skeleton shape="line" width="45%" /></span>
            <span className={styles.PlaceListCard__time}><Skeleton shape="line" width="65%" /></span>
          </span>
        </span>
        <span className={styles.PlaceListCard__actions}>
          <Skeleton shape="circle" width={44} height={44} />
          <Skeleton width={128} height={40} style={{ borderRadius: 20 }} />
        </span>
      </div>
    </div>
  );
});

PlaceListCardSkeleton.displayName = 'PlaceListCardSkeleton';
