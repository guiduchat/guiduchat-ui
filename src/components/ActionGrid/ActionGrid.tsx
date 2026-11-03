import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import styles from './ActionGrid.module.scss';

export interface ActionGridItem {
  id: string
  /** Rótulo curto embaixo do ícone, traduzido pelo app. */
  label: string
  /** Ícone de 24 px (escuro, dentro do círculo amarelo). */
  icon: ReactNode
  onClick: () => void
}

export interface ActionGridProps extends Omit<ComponentProps<'div'>, 'children'> {
  items: ActionGridItem[]
  /** Nome do grupo para o leitor de tela. */
  'aria-label'?: string
}

/**
 * Grade de 3 colunas de ações: cada quadro é um botão com o ícone num círculo
 * amarelo e o rótulo embaixo. Usada na folha de anexos do chat.
 */
export const ActionGrid = forwardRef<HTMLDivElement, ActionGridProps>(({ items, className, ...rest }, ref) => (
  <div ref={ref} role="group" className={clsx(styles.ActionGrid, className)} {...rest}>
    {items.map((item) => (
      <button key={item.id} type="button" className={styles.ActionGrid__tile} onClick={item.onClick}>
        <span className={styles.ActionGrid__icon} aria-hidden>{item.icon}</span>
        <span className={styles.ActionGrid__label}>{item.label}</span>
      </button>
    ))}
  </div>
));

ActionGrid.displayName = 'ActionGrid';
