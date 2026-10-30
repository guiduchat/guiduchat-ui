import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type AsChildProp, type MergeProps } from '../../types';
import styles from './QuickActions.module.scss';

export type QuickActionsProps = ComponentProps<'div'>;

/** Fileira de ações do perfil: Ligar, Conversar, E-mail, Mais. */
export const QuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(({ className, ...rest }, ref) => (
  <div ref={ref} role="group" className={clsx(styles.QuickActions, className)} {...rest} />
));

QuickActions.displayName = 'QuickActions';

interface QuickActionOwnProps extends AsChildProp {
  /** Ícone de 24 px. */
  icon: ReactNode
  /** Rótulo curto, traduzido pelo app. */
  label: ReactNode
  children?: ReactNode
}

export type QuickActionProps = MergeProps<ComponentProps<'button'>, QuickActionOwnProps>;

/** Ação com ícone em cima do rótulo. Com `asChild`, vira o link do app (`tel:`, `mailto:`). */
export const QuickAction = forwardRef<HTMLButtonElement, QuickActionProps>((props, ref) => {
  const { icon, label, asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root
      ref={ref}
      type={asChild ? undefined : (type ?? 'button')}
      className={clsx(styles.QuickAction, className)}
      {...rest}
    >
      <span className={styles.QuickAction__icon}>{icon}</span>
      <Slottable>{children}</Slottable>
      <span className={styles.QuickAction__label}>{label}</span>
    </Root>
  );
});

QuickAction.displayName = 'QuickAction';
