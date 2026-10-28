import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { Icon24BookmarkFilled, Icon24BookmarkOutline, Icon24Plus } from '../../icons';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { IconButton } from '../IconButton';
import styles from './PlaceCard.module.scss';

export type PlaceCardInnerElementKey =
  | 'header'
  | 'identity'
  | 'avatar'
  | 'title'
  | 'handle'
  | 'subtitle'
  | 'body'
  | 'text'
  | 'meta'
  | 'footer';

export interface PlaceCardAction {
  label: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** Number shown inside the button, such as unread messages. Hidden when 0 or undefined. */
  count?: number
}

export interface PlaceCardToggle {
  /** Accessible name; the kit has no texts of its own, the app passes them translated. */
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

export interface PlaceCardIconAction {
  /** Accessible name of the icon-only button. */
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface PlaceCardOwnProps {
  /** Usually an `Avatar.Container` with the place logo. */
  avatar?: ReactNode
  title: ReactNode
  /** Short handle shown next to the title, for example `@buzin`. */
  handle?: ReactNode
  /** Category line under the title. */
  subtitle?: ReactNode
  /** Body line: last message or short description. Clamped to two lines. */
  text?: ReactNode
  /** Small line under the text, such as "2 min ago" or "Open now". */
  meta?: ReactNode
  /** Opens the place. Makes the header (avatar and title) a button. */
  onOpen?: MouseEventHandler<HTMLButtonElement>
  /** Round button at the top right, for example "new conversation". */
  headerAction?: PlaceCardIconAction
  /** Main button in the footer, for example "See messages". */
  action?: PlaceCardAction
  /** Save toggle (bookmark) in the footer. */
  save?: PlaceCardToggle
  innerClassNames?: InnerClassNamesProp<PlaceCardInnerElementKey>
}

export type PlaceCardProps = MergeProps<ComponentProps<'article'>, PlaceCardOwnProps>;

export const PlaceCard = forwardRef<HTMLElement, PlaceCardProps>((props, forwardedRef) => {
  const {
    avatar,
    title,
    handle,
    subtitle,
    text,
    meta,
    onOpen,
    headerAction,
    action,
    save,
    className,
    innerClassNames,
    ...rest
  } = props;

  const identityContent = (
    <>
      {hasReactNode(avatar) && (
        <span className={clsx(styles.PlaceCard__avatar, innerClassNames?.avatar)}>
          {avatar}
        </span>
      )}

      <span className={styles.PlaceCard__names}>
        <span className={styles.PlaceCard__titleRow}>
          <span className={clsx(styles.PlaceCard__title, innerClassNames?.title)}>{title}</span>
          {hasReactNode(handle) && (
            <span className={clsx(styles.PlaceCard__handle, innerClassNames?.handle)}>{handle}</span>
          )}
        </span>
        {hasReactNode(subtitle) && (
          <span className={clsx(styles.PlaceCard__subtitle, innerClassNames?.subtitle)}>{subtitle}</span>
        )}
      </span>
    </>
  );

  const identityClassName = clsx(styles.PlaceCard__identity, innerClassNames?.identity);
  const hasBody = hasReactNode(text) || hasReactNode(meta);
  const hasFooter = Boolean(action) || Boolean(save);
  const showCount = action?.count !== undefined && action.count > 0;

  return (
    <article ref={forwardedRef} className={clsx(styles.PlaceCard, className)} {...rest}>
      <div className={clsx(styles.PlaceCard__header, innerClassNames?.header)}>
        {onOpen
          ? (
            <button type="button" className={clsx(identityClassName, styles.PlaceCard__identity_clickable)} onClick={onOpen}>
              {identityContent}
            </button>
          )
          : <div className={identityClassName}>{identityContent}</div>}

        {headerAction && (
          <IconButton
            size="small"
            variant="secondary"
            aria-label={headerAction.label}
            onClick={headerAction.onClick}
          >
            <Icon24Plus />
          </IconButton>
        )}
      </div>

      {hasBody && (
        <div className={clsx(styles.PlaceCard__body, innerClassNames?.body)}>
          {hasReactNode(text) && <p className={clsx(styles.PlaceCard__text, innerClassNames?.text)}>{text}</p>}
          {hasReactNode(meta) && <span className={clsx(styles.PlaceCard__meta, innerClassNames?.meta)}>{meta}</span>}
        </div>
      )}

      {hasFooter && (
        <div className={clsx(styles.PlaceCard__footer, innerClassNames?.footer)}>
          {action && (
            <Button
              size="small"
              variant="secondary"
              className={styles.PlaceCard__action}
              onClick={action.onClick}
              indicator={showCount ? <Counter value={action.count ?? 0} rounded variant="default" /> : undefined}
            >
              {action.label}
            </Button>
          )}

          {save && (
            <IconButton
              size="small"
              variant="secondary"
              className={styles.PlaceCard__save}
              aria-label={save.label}
              aria-pressed={save.pressed}
              onClick={() => { save.onPressedChange(!save.pressed); }}
            >
              {save.pressed ? <Icon24BookmarkFilled /> : <Icon24BookmarkOutline />}
            </IconButton>
          )}
        </div>
      )}
    </article>
  );
});

PlaceCard.displayName = 'PlaceCard';
