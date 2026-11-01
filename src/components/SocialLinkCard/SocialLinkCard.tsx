import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './SocialLinkCard.module.scss';

interface SocialLinkCardOwnProps extends AsChildProp {
  /** Ícone de 24 px da rede, por exemplo `<Icon icon={icons.instagram} />`. */
  icon: ReactNode
  /** Frase da faixa, por exemplo "Siga o Guidu no Instagram". É o nome acessível do link. */
  text: ReactNode
  children?: ReactNode
}

export type SocialLinkCardProps = MergeProps<ComponentProps<'button'>, SocialLinkCardOwnProps>;

/** Faixa para seguir uma rede social: ícone, frase e seta. Com `asChild`, vira o link do app. */
export const SocialLinkCard = forwardRef<HTMLButtonElement, SocialLinkCardProps>((props, ref) => {
  const { icon, text, asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root ref={ref} type={asChild ? undefined : (type ?? 'button')} className={clsx(styles.SocialLinkCard, className)} {...rest}>
      <span className={styles.SocialLinkCard__icon}>{icon}</span>
      <Slottable>{children}</Slottable>
      <span className={styles.SocialLinkCard__text}>{text}</span>
      <span className={styles.SocialLinkCard__arrow} aria-hidden="true">
        <Icon icon={icons.arrowForward} size={24} />
      </span>
    </Root>
  );
});

SocialLinkCard.displayName = 'SocialLinkCard';
