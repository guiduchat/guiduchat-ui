import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type AsChildProp, type MergeProps } from '../../types';
import styles from './ShortcutCard.module.scss';

interface ShortcutCardOwnProps extends AsChildProp {
  /** Pílula em cima, por exemplo "Novo". */
  badge?: ReactNode
  /** Título em cima, no lugar da pílula. */
  title?: ReactNode
  /** Frase embaixo. */
  text: ReactNode
  /** Ícone de 24 px no botão redondo. */
  icon: ReactNode
  children?: ReactNode
}

export type ShortcutCardProps = MergeProps<ComponentProps<'button'>, ShortcutCardOwnProps>;

/** Cartão de atalho, por exemplo Ofertas ou Pedidos recentes. Com `asChild`, vira o link do app. */
export const ShortcutCard = forwardRef<HTMLButtonElement, ShortcutCardProps>((props, ref) => {
  const { badge, title, text, icon, asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root ref={ref} type={asChild ? undefined : (type ?? 'button')} className={clsx(styles.ShortcutCard, className)} {...rest}>
      <span className={styles.ShortcutCard__top}>
        {hasReactNode(badge) && <span className={styles.ShortcutCard__badge}>{badge}</span>}
        {hasReactNode(title) && <span className={styles.ShortcutCard__title}>{title}</span>}
        <span className={styles.ShortcutCard__icon}>{icon}</span>
      </span>
      <Slottable>{children}</Slottable>
      <span className={styles.ShortcutCard__text}>{text}</span>
    </Root>
  );
});

ShortcutCard.displayName = 'ShortcutCard';
