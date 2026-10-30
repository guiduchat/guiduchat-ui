import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type AsChildProp, type MergeProps } from '../../types';
import styles from './StatStrip.module.scss';

interface StatStripOwnProps {
  /** Linha embaixo das colunas, por exemplo o link do site. */
  footer?: ReactNode
}

export type StatStripProps = MergeProps<ComponentProps<'section'>, StatStripOwnProps>;

/** Quadro de colunas do perfil: Avaliações, Preço, Obter rota. Aceita outras colunas. */
export const StatStrip = forwardRef<HTMLElement, StatStripProps>(({ footer, children, className, ...rest }, ref) => (
  <section ref={ref} className={clsx(styles.StatStrip, className)} {...rest}>
    <div className={styles.StatStrip__items}>{children}</div>
    {hasReactNode(footer) && <div className={styles.StatStrip__footer}>{footer}</div>}
  </section>
));

StatStrip.displayName = 'StatStrip';

interface StatStripItemOwnProps extends AsChildProp {
  /** Rótulo da coluna. */
  label: ReactNode
  /** O valor: ícones, nota ou texto. */
  value: ReactNode
  children?: ReactNode
}

export type StatStripItemProps = MergeProps<ComponentProps<'button'>, StatStripItemOwnProps>;

/** Coluna do quadro. Com `onClick` é botão; com `asChild`, o link do app; sem os dois, só informa. */
export const StatStripItem = forwardRef<HTMLButtonElement, StatStripItemProps>((props, ref) => {
  const { label, value, asChild = false, children, className, type, onClick, ...rest } = props;
  const Root: ElementType = asChild ? Slot : onClick ? 'button' : 'div';
  return (
    <Root
      ref={ref}
      type={Root === 'button' ? (type ?? 'button') : undefined}
      className={clsx(styles.StatStripItem, className)}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.StatStripItem__label}>{label}</span>
      <Slottable>{children}</Slottable>
      <span className={styles.StatStripItem__value}>{value}</span>
    </Root>
  );
});

StatStripItem.displayName = 'StatStripItem';
