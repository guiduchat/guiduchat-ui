import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type AsChildProp, type MergeProps } from '../../types';
import styles from './InfoCard.module.scss';

interface InfoCardOwnProps {
  /** Título, por exemplo "Informações úteis". */
  title?: ReactNode
  /** Elemento do título. `h2` por padrão. */
  titleAs?: ElementType
}

export type InfoCardProps = MergeProps<ComponentProps<'section'>, InfoCardOwnProps>;

/** Superfície com título e um quadro interno; as linhas são `InfoRow`. */
export const InfoCard = forwardRef<HTMLElement, InfoCardProps>((props, ref) => {
  const { title, titleAs: Title = 'h2', children, className, ...rest } = props;
  return (
    <section ref={ref} className={clsx(styles.InfoCard, className)} {...rest}>
      {hasReactNode(title) && <Title className={styles.InfoCard__title}>{title}</Title>}
      <div className={styles.InfoCard__body}>{children}</div>
    </section>
  );
});

InfoCard.displayName = 'InfoCard';

interface InfoRowOwnProps extends AsChildProp {
  /** Ícone de 24 px à esquerda. */
  icon?: ReactNode
  /** Rótulo pequeno em cima, por exemplo "Telefone". */
  label?: ReactNode
  /** O texto da linha. */
  value: ReactNode
  children?: ReactNode
}

export type InfoRowProps = MergeProps<ComponentProps<'div'>, InfoRowOwnProps>;

/** Linha de informação. Com `asChild`, vira o link do app (`tel:`, rede social). */
export const InfoRow = forwardRef<HTMLDivElement, InfoRowProps>((props, ref) => {
  const { icon, label, value, asChild = false, children, className, ...rest } = props;
  const Root = asChild ? Slot : 'div';
  return (
    <Root ref={ref} className={clsx(styles.InfoRow, className)} {...rest}>
      {hasReactNode(icon) && <span className={styles.InfoRow__icon}>{icon}</span>}
      <Slottable>{children}</Slottable>
      <span className={styles.InfoRow__content}>
        {hasReactNode(label) && <span className={styles.InfoRow__label}>{label}</span>}
        <span className={styles.InfoRow__value}>{value}</span>
      </span>
    </Root>
  );
});

InfoRow.displayName = 'InfoRow';
