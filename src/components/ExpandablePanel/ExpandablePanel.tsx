import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useId, useState } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import styles from './ExpandablePanel.module.scss';

interface ExpandablePanelOwnProps {
  icon?: ReactNode
  /** O que fica sempre à vista, por exemplo itens e total. */
  summary: ReactNode
  /** Nome do botão para o leitor de tela, por exemplo "Ver itens do pedido". */
  label: string
  /** O que aparece ao abrir. */
  children: ReactNode
  defaultOpen?: boolean
}

export type ExpandablePanelProps = MergeProps<ComponentProps<'div'>, ExpandablePanelOwnProps>;

/** Quadro interno que abre com a seta. */
export const ExpandablePanel = forwardRef<HTMLDivElement, ExpandablePanelProps>((props, ref) => {
  const { icon, summary, label, children, defaultOpen = false, className, ...rest } = props;
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  return (
    <div ref={ref} className={clsx(styles.ExpandablePanel, className)} {...rest}>
      <div className={styles.ExpandablePanel__top}>
        {hasReactNode(icon) && <IconTile>{icon}</IconTile>}
        <div className={styles.ExpandablePanel__summary}>{summary}</div>
        <button
          type="button"
          className={clsx(styles.ExpandablePanel__toggle, open && styles.ExpandablePanel__toggle_open)}
          aria-label={label}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((current) => !current)}
        >
          <Icon icon={icons.chevronDown} />
        </button>
      </div>
      <div id={contentId} className={styles.ExpandablePanel__content} hidden={!open}>{children}</div>
    </div>
  );
});

ExpandablePanel.displayName = 'ExpandablePanel';
