import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { getSubtree } from '../../helpers';
import { usePlatform } from '../../hooks';
import { Icon24CaretLeft } from '../../icons';
import { type AsChildProp, type MergeProps } from '../../types';
import styles from './NavBar.module.scss';

interface NavBarOwnProps {
  title: ReactNode
  /** Elemento do título. `h1` por padrão: é o título da página. */
  titleAs?: ElementType
  /** À esquerda, em geral o `NavBarBackButton`. */
  before?: ReactNode
  /** À direita, ações da tela. */
  after?: ReactNode
}

export type NavBarProps = MergeProps<ComponentProps<'header'>, NavBarOwnProps>;

/** Barra do topo: voltar, título e ação. No iOS o título fica no centro. */
export const NavBar = forwardRef<HTMLElement, NavBarProps>((props, ref) => {
  const { className, title, titleAs: Title = 'h1', before, after, ...rest } = props;
  const platform = usePlatform();

  return (
    <header
      ref={ref}
      className={clsx(styles.NavBar, styles[`NavBar_platform_${platform}`], className)}
      {...rest}
    >
      <div className={styles.NavBar__before}>{before}</div>
      <Title className={styles.NavBar__title}>{title}</Title>
      <div className={styles.NavBar__after}>{after}</div>
    </header>
  );
});

NavBar.displayName = 'NavBar';

interface NavBarBackButtonOwnProps extends AsChildProp {
  /** Nome para o leitor de tela, traduzido pelo app (ex.: "Voltar"). */
  label: string
  icon?: ReactNode
  children?: ReactNode
}

export type NavBarBackButtonProps = MergeProps<ComponentProps<'button'>, NavBarBackButtonOwnProps>;

/** Botão de voltar do `NavBar`. Com `asChild`, vira o `<Link>` do app. */
export const NavBarBackButton = forwardRef<HTMLButtonElement, NavBarBackButtonProps>((props, ref) => {
  const { className, asChild = false, label, icon, children, type, ...rest } = props;
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={clsx(styles.NavBarBackButton, className)}
      aria-label={label}
      type={asChild ? undefined : (type ?? 'button')}
      {...rest}
    >
      <Slottable>
        {getSubtree({
          options: { asChild, children },
          content: icon ?? <Icon24CaretLeft aria-hidden />
        })}
      </Slottable>
    </Comp>
  );
});

NavBarBackButton.displayName = 'NavBarBackButton';
