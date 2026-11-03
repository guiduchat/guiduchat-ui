import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { Icon } from '../Icon';
import styles from './PlaceListCard.module.scss';

export interface PlaceListCardToggle {
  /** Nome acessível, traduzido pelo app. */
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

/** Abre o local: o quadro de cima vira botão ou, com `asChild`, o link do app. */
export interface PlaceListCardOpen extends AsChildProp {
  /** Nome acessível do quadro, por exemplo "Abrir Padaria Flor de Geribá". */
  label: string
  onClick?: MouseEventHandler<HTMLElement>
  children?: ReactNode
}

/** Botão redondo de ligar. Com `href` (`tel:`), vira link. */
export interface PlaceListCardCall {
  label: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
}

export interface PlaceListCardChat {
  /** Texto do botão, por exemplo "Abrir Chat". */
  label: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  /** Mensagens não lidas, no botão. Some com 0 ou sem valor. */
  count?: number
}

export type PlaceListCardStatusTone = 'positive' | 'negative' | 'neutral';

interface PlaceListCardOwnProps {
  /** Em geral um `Avatar.Container` de 44 px com o logo. */
  avatar?: ReactNode
  /** Nome do local. Uma linha, com reticências. */
  title: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  titleAs?: ElementType
  /** Nota, em geral StarTile e número. Slot do app. */
  rating?: ReactNode
  /** Descrição curta. Duas linhas no máximo. */
  description?: ReactNode
  /** Endereço, com o ícone de local. Uma linha. */
  address?: ReactNode
  /** Situação no rodapé, por exemplo "Fechado". */
  status?: ReactNode
  /** Cor da situação: `positive` (aberto), `negative` (fechado) ou `neutral`. */
  statusTone?: PlaceListCardStatusTone
  /** Horário, por exemplo "Abre às 12:00". */
  hours?: ReactNode
  /** Abre o local ao tocar no quadro de cima. */
  open?: PlaceListCardOpen
  /** Marcador de salvar, no canto do quadro. */
  save?: PlaceListCardToggle
  /** Botão redondo de ligar. Sem ele, não aparece. */
  call?: PlaceListCardCall
  /** Botão principal, por exemplo "Abrir Chat". */
  chat?: PlaceListCardChat
}

export type PlaceListCardProps = MergeProps<ComponentProps<'article'>, PlaceListCardOwnProps>;

/**
 * Cartão de local da lista Meus Locais, na identidade do Cliente Hub: quadro de dentro com avatar,
 * nome, nota, salvar, descrição e endereço; rodapé com a situação e o horário, ligar e o chat.
 * Só apresentação: textos, links e ações vêm do app (U4).
 */
export const PlaceListCard = forwardRef<HTMLElement, PlaceListCardProps>((props, ref) => {
  const {
    avatar,
    title,
    titleAs: Title = 'h3',
    rating,
    description,
    address,
    status,
    statusTone = 'neutral',
    hours,
    open,
    save,
    call,
    chat,
    className,
    ...rest
  } = props;

  const OpenRoot: ElementType = open?.asChild ? Slot : (open ? 'button' : 'div');
  const CallRoot: ElementType = call?.href ? 'a' : 'button';
  const showCount = chat?.count !== undefined && chat.count > 0;
  const hasFooter = hasReactNode(status) || hasReactNode(hours) || Boolean(call) || Boolean(chat);

  return (
    <article ref={ref} className={clsx(styles.PlaceListCard, className)} {...rest}>
      <div className={styles.PlaceListCard__frame}>
        <OpenRoot
          type={open && !open.asChild ? 'button' : undefined}
          className={clsx(styles.PlaceListCard__open, open && styles.PlaceListCard__open_interactive)}
          aria-label={open?.label}
          onClick={open?.onClick}
        >
          <Slottable>{open?.children}</Slottable>
          <span className={styles.PlaceListCard__head}>
            {hasReactNode(avatar) && <span className={styles.PlaceListCard__avatar}>{avatar}</span>}
            <span className={styles.PlaceListCard__names}>
              <Title className={styles.PlaceListCard__title}>{title}</Title>
              {hasReactNode(rating) && <span className={styles.PlaceListCard__rating}>{rating}</span>}
            </span>
          </span>
          {hasReactNode(description) && <span className={styles.PlaceListCard__description}>{description}</span>}
          {hasReactNode(address) && (
            <span className={styles.PlaceListCard__address}>
              <span className={styles.PlaceListCard__addressIcon}><Icon icon={icons.location} size={24} /></span>
              <span className={styles.PlaceListCard__addressText}>{address}</span>
            </span>
          )}
        </OpenRoot>
        {save && (
          <button
            type="button"
            className={styles.PlaceListCard__save}
            aria-label={save.label}
            aria-pressed={save.pressed}
            onClick={() => { save.onPressedChange(!save.pressed); }}
          >
            <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
          </button>
        )}
      </div>
      {hasFooter && (
        <div className={styles.PlaceListCard__footer}>
          {(hasReactNode(status) || hasReactNode(hours)) && (
            <span className={styles.PlaceListCard__hours}>
              <span className={styles.PlaceListCard__hoursIcon}><Icon icon={icons.calendar} size={24} /></span>
              <span className={styles.PlaceListCard__hoursText}>
                {hasReactNode(status) && (
                  <span className={clsx(styles.PlaceListCard__status, styles[`PlaceListCard__status_${statusTone}`])}>
                    {status}
                  </span>
                )}
                {hasReactNode(hours) && <span className={styles.PlaceListCard__time}>{hours}</span>}
              </span>
            </span>
          )}
          <span className={styles.PlaceListCard__actions}>
            {call && (
              <CallRoot
                type={call.href ? undefined : 'button'}
                href={call.href}
                className={styles.PlaceListCard__call}
                aria-label={call.label}
                onClick={call.onClick}
              >
                <Icon icon={icons.call} size={24} />
              </CallRoot>
            )}
            {chat && (
              <Button
                size="small"
                iconBefore={<Icon icon={icons.chats} size={20} />}
                indicator={showCount ? <Counter value={chat.count ?? 0} rounded /> : undefined}
                onClick={chat.onClick}
              >
                {chat.label}
              </Button>
            )}
          </span>
        </div>
      )}
    </article>
  );
});

PlaceListCard.displayName = 'PlaceListCard';
