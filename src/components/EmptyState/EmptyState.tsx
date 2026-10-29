import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './EmptyState.module.scss';

interface EmptyStateOwnProps {
  icon?: ReactNode
  title: ReactNode
  /** Elemento do título; `h2` por padrão. */
  titleAs?: ElementType
  description?: ReactNode
  /** Ação, por exemplo o botão "Tentar de novo" no estado de erro. */
  action?: ReactNode
}

export type EmptyStateProps = MergeProps<ComponentProps<'div'>, EmptyStateOwnProps>;

/** Vazio e erro: frase, explicação e ação. Os textos vêm do app. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>((props, ref) => {
  const { className, icon, title, titleAs: Title = 'h2', description, action, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.EmptyState, className)} {...rest}>
      {hasReactNode(icon) && <span className={styles.EmptyState__icon} aria-hidden>{icon}</span>}
      <Title className={styles.EmptyState__title}>{title}</Title>
      {hasReactNode(description) && <p className={styles.EmptyState__description}>{description}</p>}
      {hasReactNode(action) && <div className={styles.EmptyState__action}>{action}</div>}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
