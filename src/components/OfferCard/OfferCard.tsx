import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type InnerClassNamesProp, type MergeProps } from '../../types';
import { Button } from '../Button';
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
  | 'action'
  | 'notice'
  | 'category'
  | 'media';

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

export type OfferCardAppearance = 'ticket' | 'featured' | 'spotlight';

/** Torna a parte de cima do `spotlight` (foto e textos) clicável: abre a página da oferta. */
export interface OfferCardTopAction extends AsChildProp {
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link aqui: `<a href="...">`. O kit põe a foto e os textos dentro dele. */
  children?: ReactNode
}

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
  /** Photo behind the coupon (featured) or beside the texts (spotlight). */
  image?: OfferCardImage
  /** Notice under the title, such as "Check the promotion rules." Used only in the spotlight appearance. */
  notice?: ReactNode
  /** Store category, under the store name. Used only in the spotlight appearance. */
  category?: ReactNode
  /** Makes the top of the spotlight (photo and texts) a link or button. Used only in the spotlight appearance. */
  topAction?: OfferCardTopAction
  /** Small situation label, such as "Used" or "Expired". */
  tag?: ReactNode
  /**
   * Both have side notches at the dashed line (CSS mask) and the footer under it.
   * `ticket`: plain coupon on the coupon green.
   * `featured`: photo with the coupon over its base.
   * `spotlight`: card of the "Ofertas Imperdiveis" carousel, for an `InfoCard plain`: photo and texts
   * with side notches, and under it the store (`avatar`, `subtitle`, `category`) with `primaryAction` as
   * the main button. It ignores `save` and `secondaryAction`.
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
    notice,
    category,
    topAction,
    appearance = 'ticket',
    className,
    innerClassNames,
    ...rest
  } = props;

  const isFeatured = appearance === 'featured';
  const isSpotlight = appearance === 'spotlight';
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

  if (isSpotlight) {
    const TopRoot: ElementType = topAction?.asChild ? Slot : (topAction ? 'button' : 'div');
    return (
      <article ref={forwardedRef} className={rootClassName} {...rest}>
        <TopRoot
          type={topAction && !topAction.asChild ? 'button' : undefined}
          className={clsx(styles.OfferCard__spot, topAction && styles.OfferCard__spot_interactive)}
          onClick={topAction?.onClick}
        >
          <Slottable>{topAction?.children}</Slottable>
          <span className={clsx(styles.OfferCard__media, innerClassNames?.media)}>
            {image
              ? <img className={clsx(styles.OfferCard__image_inline, innerClassNames?.image)} src={image.src} alt={image.alt} />
              : <Icon icon={icons.image} size={32} />}
          </span>
          <span className={styles.OfferCard__names}>
            {hasReactNode(tag) && <span className={clsx(styles.OfferCard__tag, innerClassNames?.tag)}>{tag}</span>}
            <span className={clsx(styles.OfferCard__title, innerClassNames?.title)}>{title}</span>
            {hasReactNode(notice) && <span className={clsx(styles.OfferCard__note, innerClassNames?.notice)}>{notice}</span>}
            {hasReactNode(meta) && <span className={clsx(styles.OfferCard__note, innerClassNames?.meta)}>{meta}</span>}
          </span>
        </TopRoot>
        {(hasReactNode(avatar) || hasReactNode(subtitle) || hasReactNode(category) || primaryAction) && (
          <div className={clsx(styles.OfferCard__store, innerClassNames?.footer)}>
            {hasReactNode(avatar) && <span className={clsx(styles.OfferCard__avatar, innerClassNames?.avatar)}>{avatar}</span>}
            <span className={styles.OfferCard__storeNames}>
              {hasReactNode(subtitle) && <span className={clsx(styles.OfferCard__storeName, innerClassNames?.subtitle)}>{subtitle}</span>}
              {hasReactNode(category) && <span className={clsx(styles.OfferCard__category, innerClassNames?.category)}>{category}</span>}
            </span>
            {primaryAction && (
              <Button
                size="small"
                className={clsx(innerClassNames?.action)}
                disabled={primaryAction.disabled}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </article>
    );
  }

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
