import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import styles from './OfferCard.module.scss';

export type OfferCardSkeletonProps = MergeProps<ComponentProps<'div'>, object>;

/**
 * Esqueleto do `OfferCard` na aparência `spotlight` (regra U10): foto, título em duas linhas,
 * aviso e validade, e embaixo a loja com o botão. Usa as classes do cartão.
 * Só visual: vai dentro de um `InfoCardSkeleton`, que avisa o leitor de tela.
 */
export const OfferCardSkeleton = forwardRef<HTMLDivElement, OfferCardSkeletonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.OfferCard, styles.OfferCard_appearance_spotlight, className)} aria-hidden {...rest}>
      <div className={styles.OfferCard__spot}>
        <span className={styles.OfferCard__media}><Skeleton width="100%" height="100%" /></span>
        {/* A coluna alinha os textos ao início e encolhe cada linha: aqui elas ocupam a largura toda. */}
        <span className={styles.OfferCard__names} style={{ flex: 1 }}>
          <span className={styles.OfferCard__title} style={{ width: '100%' }}>
            <Skeleton shape="line" width="95%" />
            <br />
            <Skeleton shape="line" width="70%" />
          </span>
          <span className={styles.OfferCard__note} style={{ width: '100%' }}><Skeleton shape="line" width="85%" /></span>
          <span className={styles.OfferCard__note} style={{ width: '100%' }}><Skeleton shape="line" width="60%" /></span>
        </span>
      </div>
      <div className={styles.OfferCard__store}>
        <span className={styles.OfferCard__avatar}><Skeleton shape="avatar" width={44} height={44} /></span>
        <span className={styles.OfferCard__storeNames} style={{ flex: 1 }}>
          {/* Duas linhas: com o botão ao lado, o nome da loja costuma quebrar. */}
          <span className={styles.OfferCard__storeName}>
            <Skeleton shape="line" width="85%" />
            <br />
            <Skeleton shape="line" width="55%" />
          </span>
          <span className={styles.OfferCard__category}><Skeleton shape="line" width="55%" /></span>
        </span>
        <Skeleton width={140} height={44} style={{ borderRadius: 22, flexShrink: 0 }} />
      </div>
    </div>
  );
});

OfferCardSkeleton.displayName = 'OfferCardSkeleton';
