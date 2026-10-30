import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './NavBar.module.scss';

interface NavBarOwnProps {
  /** Título da página, centralizado. Use `center` para a pílula do chat. */
  title?: ReactNode
  /** Elemento do título. `h1` por padrão: é o título da página. */
  titleAs?: ElementType
  /** No lugar do título, por exemplo a `NavBarPill` do chat. */
  center?: ReactNode
  /** À esquerda, em geral o `NavBarBackButton`. */
  before?: ReactNode
  /** À direita, ações da tela (`NavBarButton`). */
  after?: ReactNode
}

export type NavBarProps = MergeProps<ComponentProps<'header'>, NavBarOwnProps>;

/**
 * Cabeçalho de 60 px: voltar, título centralizado (ou a pílula do chat) e
 * ações em botões redondos de 40 px. Igual no iOS e no Android.
 */
export const NavBar = forwardRef<HTMLElement, NavBarProps>((props, ref) => {
  const { className, title, titleAs: Title = 'h1', center, before, after, ...rest } = props;

  return (
    <header ref={ref} className={clsx(styles.NavBar, className)} {...rest}>
      <div className={styles.NavBar__before}>{before}</div>
      <div className={styles.NavBar__center}>
        {hasReactNode(center) ? center : <Title className={styles.NavBar__title}>{title}</Title>}
      </div>
      <div className={styles.NavBar__after}>{after}</div>
    </header>
  );
});

NavBar.displayName = 'NavBar';

export type NavBarButtonVariant = 'neutral' | 'accent';

interface NavBarButtonOwnProps extends AsChildProp {
  /** Nome para o leitor de tela, traduzido pelo app (ex.: "Carrinho"). */
  label: string
  /** O ícone (24 px, desenhado em 20 px). Com `asChild`, vai dentro do filho. */
  icon: ReactNode
  /** `neutral`: fundo cinza (voltar, menu). `accent`: cor da marca (carrinho). */
  variant?: NavBarButtonVariant
  children?: ReactNode
}

export type NavBarButtonProps = MergeProps<ComponentProps<'button'>, NavBarButtonOwnProps>;

/** Botão redondo de 40 px do cabeçalho. Com `asChild`, vira o `<Link>` do app. */
export const NavBarButton = forwardRef<HTMLButtonElement, NavBarButtonProps>((props, ref) => {
  const { className, asChild = false, label, icon, variant = 'neutral', children, type, ...rest } = props;
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={clsx(styles.NavBarButton, styles[`NavBarButton_variant_${variant}`], className)}
      aria-label={label}
      type={asChild ? undefined : (type ?? 'button')}
      {...rest}
    >
      <Slottable>
        {getSubtree({
          options: { asChild, children },
          content: <span aria-hidden style={{ display: 'contents' }}>{icon}</span>
        })}
      </Slottable>
    </Comp>
  );
});

NavBarButton.displayName = 'NavBarButton';

export type NavBarBackButtonProps = Omit<NavBarButtonProps, 'icon' | 'variant'> & {
  icon?: ReactNode
};

/** Voltar do cabeçalho: `NavBarButton` com a seta. */
export const NavBarBackButton = forwardRef<HTMLButtonElement, NavBarBackButtonProps>((props, ref) => {
  const { icon, ...rest } = props;
  return <NavBarButton ref={ref} icon={icon ?? <Icon icon={icons.back} size={24} />} {...rest} />;
});

NavBarBackButton.displayName = 'NavBarBackButton';

interface NavBarPillOwnProps extends AsChildProp {
  /** Avatar do estabelecimento, em geral `Avatar.Container` de 32 px. */
  avatar?: ReactNode
  /** Nome do estabelecimento. Com `asChild`, o nome é o conteúdo do filho. */
  children?: ReactNode
}

export type NavBarPillProps = MergeProps<ComponentProps<'button'>, NavBarPillOwnProps>;

/**
 * Pílula do chat com o avatar e o nome do estabelecimento, no lugar do
 * título. Tocar abre o que o app decidir (o perfil da loja, por exemplo).
 */
export const NavBarPill = forwardRef<HTMLButtonElement, NavBarPillProps>((props, ref) => {
  const { className, asChild = false, avatar, children, type, ...rest } = props;
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={clsx(styles.NavBarPill, className)}
      type={asChild ? undefined : (type ?? 'button')}
      {...rest}
    >
      <Slottable>
        {getSubtree({
          options: { asChild, children },
          content: (label) => (
            <>
              {hasReactNode(avatar) && (
                <span className={styles.NavBarPill__avatar} aria-hidden>{avatar}</span>
              )}
              <span className={styles.NavBarPill__label}>{label}</span>
            </>
          )
        })}
      </Slottable>
    </Comp>
  );
});

NavBarPill.displayName = 'NavBarPill';
