import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './MessageBubble.module.scss';

export type MessageBubbleSide = 'mine' | 'theirs';

interface MessageBubbleOwnProps {
  /** `mine`: da pessoa, à direita, na cor da marca. `theirs`: da loja ou do guidu, à esquerda. */
  side: MessageBubbleSide
  /** Quem escreveu (em mensagens de outros), por exemplo "Milly". */
  author?: ReactNode
  /** Linha pequena embaixo, por exemplo a hora. */
  meta?: ReactNode
}

export type MessageBubbleProps = MergeProps<ComponentProps<'div'>, MessageBubbleOwnProps>;

/** Balão de mensagem (ui-kit.md, seção 8: balões em pílula). */
export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>((props, ref) => {
  const { side, author, meta, children, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.MessageBubble, styles[`MessageBubble_side_${side}`], className)} {...rest}>
      <div className={styles.MessageBubble__bubble}>
        {hasReactNode(author) && <span className={styles.MessageBubble__author}>{author}</span>}
        <span className={styles.MessageBubble__text}>{children}</span>
      </div>
      {hasReactNode(meta) && <span className={styles.MessageBubble__meta}>{meta}</span>}
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';
