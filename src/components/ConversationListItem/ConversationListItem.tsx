import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Counter } from '../Counter';
import { Icon } from '../Icon';
import skeletonStyles from '../Skeleton/Skeleton.module.scss';
import styles from './ConversationListItem.module.scss';

/** Situação da última mensagem de quem usa o app: `sent` (enviada) ou `read` (lida pela loja). */
export type ConversationListItemStatus = 'sent' | 'read';

interface ConversationListItemOwnProps extends AsChildProp {
  /** Em geral um `Avatar.Container` de 48 px, `form="squircle"`. */
  avatar?: ReactNode
  /** Nome da empresa. Uma linha, com reticências. */
  title: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  titleAs?: ElementType
  /** Trecho da última mensagem. Uma linha, com reticências. */
  message?: ReactNode
  /** Endereço curto (rua, número, bairro), com o ícone de local. Some sem valor. */
  address?: ReactNode
  /** Horário ou data da última mensagem. */
  time?: ReactNode
  /** Leitura da última mensagem, quando ela é de quem usa o app. Sem valor, nada aparece. */
  status?: ConversationListItemStatus
  /** Texto do check para o leitor de tela, traduzido pelo app ("Enviada", "Lida"). */
  statusLabel?: string
  /** Texto do contador para o leitor de tela, traduzido pelo app ("3 mensagens não lidas"). */
  unreadLabel?: string
  /** Mensagens não lidas. Com valor maior que 0, o contador ocupa o lugar do check. */
  unread?: number
}

export type ConversationListItemProps = MergeProps<ComponentProps<'a'>, ConversationListItemOwnProps>;

/**
 * Linha da lista de Conversas: avatar, nome da empresa, última mensagem, endereço e, à direita,
 * o horário com o check de leitura (ou o contador de não lidas). A linha inteira é o link da
 * conversa (`asChild` com o `Link` do app como filho). Só apresentação (U4); o arrasto para fixar
 * fica no `SwipeActions`, que envolve a linha.
 */
export const ConversationListItem = forwardRef<HTMLAnchorElement, ConversationListItemProps>((props, ref) => {
  const {
    asChild,
    avatar,
    title,
    titleAs: Title = 'h3',
    message,
    address,
    time,
    status,
    statusLabel,
    unreadLabel,
    unread = 0,
    className,
    children,
    ...rest
  } = props;

  const Root: ElementType = asChild ? Slot : 'a';
  const showUnread = unread > 0;
  const showStatus = !showUnread && status !== undefined;

  return (
    <Root ref={ref} className={clsx(styles.ConversationListItem, className)} {...rest}>
      {asChild && <Slottable>{children}</Slottable>}
      {hasReactNode(avatar) && <span className={styles.ConversationListItem__avatar}>{avatar}</span>}
      <span className={styles.ConversationListItem__body}>
        <Title className={styles.ConversationListItem__title}>{title}</Title>
        {hasReactNode(message) && <span className={styles.ConversationListItem__message}>{message}</span>}
        {hasReactNode(address) && (
          <span className={styles.ConversationListItem__address}>
            <span className={styles.ConversationListItem__addressIcon}><Icon icon={icons.location} size={16} /></span>
            <span className={styles.ConversationListItem__addressText}>{address}</span>
          </span>
        )}
      </span>
      <span className={styles.ConversationListItem__meta}>
        {hasReactNode(time) && <span className={styles.ConversationListItem__time}>{time}</span>}
        {showUnread && (
          <>
            <Counter value={unread} rounded aria-hidden />
            {unreadLabel && <span className={skeletonStyles.Skeleton__status}>{unreadLabel}</span>}
          </>
        )}
        {showStatus && (
          <span
            className={clsx(styles.ConversationListItem__status, status === 'read' && styles.ConversationListItem__status_read)}
            role={statusLabel ? 'img' : undefined}
            aria-label={statusLabel}
            aria-hidden={statusLabel ? undefined : true}
          >
            <Icon icon={status === 'read' ? icons.readDouble : icons.check} size={20} />
          </span>
        )}
      </span>
    </Root>
  );
});

ConversationListItem.displayName = 'ConversationListItem';
