import {clsx} from "clsx";
import {KeyboardEventHandler, MouseEventHandler, ReactNode} from "react";

import type {InnerClassNamesProp} from "../../types";
import styles from "./Segmented.module.scss";

/** `pill` (padrão): trilho único com o item ativo em relevo. `buttons`: botões separados de 44 px, o ativo na cor de destaque. */
export type SegmentedVariant = 'pill' | 'buttons';
export type SegmentedElementKey = 'list' | 'item';
export interface SegmentedItem {
  id: string;
  title: string;
  /** Ícone antes do título (por exemplo `<Icon icon={icons.delivery} size={20} />`). Decorativo. */
  icon?: ReactNode;
}
export interface SegmentedProps {
  items: SegmentedItem[],
  /** Aparência. `pill` por padrão (como sempre foi). */
  variant?: SegmentedVariant,
  activeItem: string,
  onClick: (id: string) => void,
  innerClassNames?: InnerClassNamesProp<SegmentedElementKey>
  /** Accessible name of the tab list, read by screen readers. */
  'aria-label'?: string
}

export const Segmented = ({items, activeItem, onClick, innerClassNames, variant = 'pill', 'aria-label': ariaLabel}: SegmentedProps) => {
  const handleClick = (itemId: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    onClick(itemId);
    event.currentTarget.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
  };

  const onKeyDown = (index: number): KeyboardEventHandler<HTMLButtonElement> => (event) => {
    const last = items.length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onClick(items[index].id);
        return;
      default:
        return;
    }
    event.preventDefault();
    onClick(items[next].id);
    const nextEl = event.currentTarget.parentElement?.children[next] as HTMLElement | undefined;
    nextEl?.focus();
    nextEl?.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
  };
  const isActive = (id: string): boolean => id === activeItem;

  return (
    <div className={clsx(styles.segmented, {[styles.segmented_buttons]: variant === 'buttons'}, innerClassNames?.list)} role="tablist" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <button
          key={item.id}
          role="tab"
          tabIndex={isActive(item.id) ? 0 : -1}
          aria-selected={isActive(item.id)}
          onKeyDown={onKeyDown(index)}
          className={clsx(styles.segment, innerClassNames?.item, {[styles.segment_active]: isActive(item.id), [styles.segment_buttons]: variant === 'buttons'})}
          onClick={handleClick(item.id)}
          type="button"
        >
          {item.icon}
          {item.title}
        </button>
      ))}
    </div>
  );
};
