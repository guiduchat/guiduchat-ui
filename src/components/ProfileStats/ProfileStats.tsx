import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { type AsChildProp, type MergeProps } from '../../types';
import styles from './ProfileStats.module.scss';

export type ProfileStatsProps = ComponentProps<'div'>;

/** Faixa de números do perfil (Seguidores, Seguindo, Indicações): colunas iguais, sem quadro. */
export const ProfileStats = forwardRef<HTMLDivElement, ProfileStatsProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx(styles.ProfileStats, className)} {...rest} />
));

ProfileStats.displayName = 'ProfileStats';

interface ProfileStatOwnProps extends AsChildProp {
  /** Número já formatado pelo app. */
  value: ReactNode
  /** Rótulo, traduzido pelo app. Aparece em caixa alta por CSS. */
  label: ReactNode
  children?: ReactNode
}

export type ProfileStatProps = MergeProps<ComponentProps<'button'>, ProfileStatOwnProps>;

/** Coluna da faixa. Com `onClick` é botão; com `asChild`, o link do app; sem os dois, só informa. */
export const ProfileStat = forwardRef<HTMLButtonElement, ProfileStatProps>((props, ref) => {
  const { value, label, asChild = false, children, className, type, onClick, ...rest } = props;
  const Root: ElementType = asChild ? Slot : onClick ? 'button' : 'div';
  return (
    <Root
      ref={ref}
      type={Root === 'button' ? (type ?? 'button') : undefined}
      className={clsx(styles.ProfileStat, className)}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.ProfileStat__value}>{value}</span>
      <span className={styles.ProfileStat__label}>{label}</span>
      <Slottable>{children}</Slottable>
    </Root>
  );
});

ProfileStat.displayName = 'ProfileStat';
