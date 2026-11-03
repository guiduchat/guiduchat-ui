import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import { Skeleton } from '../Skeleton';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './ConversationListItem.module.scss';

interface ConversationListItemSkeletonOwnProps {
  /** Texto para o leitor de tela, traduzido pelo app ("Carregando"). Sem ele, só o desenho. */
  label?: string
}

export type ConversationListItemSkeletonProps = MergeProps<ComponentProps<'div'>, ConversationListItemSkeletonOwnProps>;

/**
 * Esqueleto do `ConversationListItem` (regra U10): avatar de 48 px, três linhas de texto e,
 * à direita, o horário e o check. Usa as classes da linha.
 */
export const ConversationListItemSkeleton = forwardRef<HTMLDivElement, ConversationListItemSkeletonProps>((props, ref) => {
  const { label, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ConversationListItem, className)} aria-busy={label ? true : undefined} {...rest}>
      {label && <span role="status" className={skeletonStyles.Skeleton__status}>{label}</span>}
      <span className={styles.ConversationListItem__avatar} aria-hidden>
        <Skeleton shape="avatar" width={48} height={48} />
      </span>
      <span className={styles.ConversationListItem__body} aria-hidden>
        <span className={styles.ConversationListItem__title}><Skeleton shape="line" width="55%" /></span>
        <span className={styles.ConversationListItem__message}><Skeleton shape="line" width="85%" /></span>
        <span className={styles.ConversationListItem__address}><Skeleton shape="line" width="65%" /></span>
      </span>
      <span className={styles.ConversationListItem__meta} aria-hidden>
        <span className={styles.ConversationListItem__time}><Skeleton shape="line" width={36} /></span>
        <Skeleton shape="circle" width={20} height={20} />
      </span>
    </div>
  );
});

ConversationListItemSkeleton.displayName = 'ConversationListItemSkeleton';
