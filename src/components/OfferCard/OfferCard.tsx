import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './OfferCard.module.scss';

export type OfferCardInnerElementKey =
  | 'image'
  | 'coupon'
  | 'header'
  | 'avatar'
  | 'title'
  | 'subtitle'
  | 'meta'
  | 'tag'
  | 'save'
  | 'footer'
  | 'action';

export interface OfferCardToggle {
  /** Accessible name; the kit has no texts of its own, the app passes them translated. */
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

export interface OfferCardAction {
  /** Text of the button, translated by the app. Shown in capitals by the style. */
  label: ReactNode
  onClick: () => void
  disabled?: boolean
}

export interface OfferCardImage {
  src: string
  alt: string
}

export type OfferCardAppearance = 'ticket' | 'featured';

interface OfferCardOwnProps {
  /** Usually an `Avatar.Container` with the store logo, 44 to 48 px. */
  avatar?: ReactNode
  /** Offer title, such as "20% off, two-person steak". Clamped to two lines. */
  title: ReactNode
  /** Store name. One line. */
  subtitle?: ReactNode
  /** Validity, such as "Valid until 12/11/2026". One line. */
  meta?: ReactNode
  /** Save toggle (bookmark) at the right of the title. */
  save?: OfferCardToggle
  /** Left button of the footer, such as "See rules". */
  secondaryAction?: OfferCardAction
  /** Right button of the footer, such as "Redeem offer". */
  primaryAction?: OfferCardAction
  /** Photo behind the coupon. Used only in the featured appearance. */
  image?: OfferCardImage
  /** Small situation label, such as "Used" or "Expired". */
  tag?: ReactNode
  /**
   * Both have side notches at the dashed line (CSS mask) and the footer under it.
   * `ticket`: plain coupon on the coupon green.
   * `featured`: photo with the coupon over its base.
   */
  appearance?: OfferCardAppearance
  innerClassNames?: InnerClassNamesProp<OfferCardInnerElementKey>
}

export type OfferCardProps = MergeProps<ComponentProps<'article'>, OfferCardOwnProps>;

/** Offer coupon: store, validity, save and the two actions of the app. */
export const OfferCard = forwardRef<HTMLElement, OfferCardProps>((props, forwardedRef) => {
  const {
    avatar,
    title,
    subtitle,
    meta,
    save,
    secondaryAction,
    primaryAction,
    image,
    tag,
    appearance = 'ticket',
    className,
    innerClassNames,
    ...rest
  } = props;

  const isFeatured = appearance === 'featured';
  const actions = [secondaryAction, primaryAction].filter((action): action is OfferCardAction => action !== undefined);
  const hasFooter = actions.length > 0;

  const saveButton = save && (
    <button
      type="button"
      className={clsx(styles.OfferCard__save, isFeatured && styles.OfferCard__save_floating, innerClassNames?.save)}
      aria-label={save.label}
      aria-pressed={save.pressed}
      onClick={() => { save.onPressedChange(!save.pressed); }}
    >
      <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
    </button>
  );

  const header = (
    <div className={clsx(styles.OfferCard__header, !hasFooter && styles.OfferCard__header_alone, innerClassNames?.header)}>
      {hasReactNode(avatar) && (
        <span className={clsx(styles.OfferCard__avatar, innerClassNames?.avatar)}>{avatar}</span>
      )}
      <div className={styles.OfferCard__names}>
        {hasReactNode(tag) && <span className={clsx(styles.OfferCard__tag, innerClassNames?.tag)}>{tag}</span>}
        <span className={clsx(styles.OfferCard__title, innerClassNames?.title)}>{title}</span>
        {hasReactNode(subtitle) && <span className={clsx(styles.OfferCard__line, innerClassNames?.subtitle)}>{subtitle}</span>}
        {hasReactNode(meta) && <span className={clsx(styles.OfferCard__line, innerClassNames?.meta)}>{meta}</span>}
      </div>
      {!isFeatured && saveButton}
    </div>
  );

  const footer = hasFooter && (
    <div className={clsx(styles.OfferCard__footer, innerClassNames?.footer)}>
      {actions.map((action, index) => (
        <button
          key={index}
          type="button"
          className={clsx(styles.OfferCard__action, innerClassNames?.action)}
          disabled={action.disabled}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </div>
  );

  const rootClassName = clsx(styles.OfferCard, styles[`OfferCard_appearance_${appearance}`], className);

  if (isFeatured) {
    return (
      <article ref={forwardedRef} className={rootClassName} {...rest}>
        {image && <img className={clsx(styles.OfferCard__image, innerClassNames?.image)} src={image.src} alt={image.alt} />}
        {saveButton}
        <div className={clsx(styles.OfferCard__coupon, innerClassNames?.coupon)}>
          {header}
          {footer}
        </div>
      </article>
    );
  }

  return (
    <article ref={forwardedRef} className={rootClassName} {...rest}>
      {header}
      {footer}
    </article>
  );
});

OfferCard.displayName = 'OfferCard';
