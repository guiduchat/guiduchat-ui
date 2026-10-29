import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { getSubtree } from '../../helpers';
import { type AsChildProp, type MergeProps } from '../../types';
import { Counter } from '../Counter';
import styles from './TabBar.module.scss';

export type TabBarProps = ComponentProps<'nav'>;

/**
 * Rodapé de navegação do app. O app posiciona (fixo embaixo) e passa o
 * `aria-label` traduzido.
 */
export const TabBar = forwardRef<HTMLElement, TabBarProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <nav ref={ref} className={clsx(styles.TabBar, className)} {...rest}>
      {children}
    </nav>
  );
});

TabBar.displayName = 'TabBar';

interface TabBarItemOwnProps extends AsChildProp {
  /** Ícone da aba inativa (contorno). */
  icon: ReactNode
  /** Ícone da aba ativa (preenchido). Sem ele, usa `icon`. */
  activeIcon?: ReactNode
  /** Aba da página atual: ícone preenchido, rótulo forte e `aria-current="page"`. */
  active?: boolean
  /** Contador (por exemplo, mensagens não lidas). Some quando é 0. */
  count?: number
  /** Texto do contador para o leitor de tela, traduzido pelo app (ex.: "3 não lidas"). */
  countLabel?: string
  /** Rótulo da aba. Com `asChild`, o rótulo é o conteúdo do filho (ex.: `<Link>`). */
  children?: ReactNode
}

export type TabBarItemProps = MergeProps<ComponentProps<'a'>, TabBarItemOwnProps>;

export const TabBarItem = forwardRef<HTMLAnchorElement, TabBarItemProps>((props, ref) => {
  const {
    className,
    asChild = false,
    icon,
    activeIcon,
    active = false,
    count = 0,
    countLabel,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'a';
  const showCount = count > 0;

  return (
    <Comp
      ref={ref}
      className={clsx(styles.TabBarItem, active && styles.TabBarItem_active, className)}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      <Slottable>
        {getSubtree({
          options: { asChild, children },
          content: (label) => (
            <>
              <span className={styles.TabBarItem__icon} aria-hidden>
                {active ? (activeIcon ?? icon) : icon}
                {showCount && (
                  <Counter className={styles.TabBarItem__badge} value={count} rounded />
                )}
              </span>
              <span className={styles.TabBarItem__label}>{label}</span>
              {showCount && countLabel && (
                <span className={styles.TabBarItem__countLabel}>{countLabel}</span>
              )}
            </>
          )
        })}
      </Slottable>
    </Comp>
  );
});

TabBarItem.displayName = 'TabBarItem';
