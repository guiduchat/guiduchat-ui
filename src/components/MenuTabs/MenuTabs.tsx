import { clsx } from 'clsx';

import { type InnerClassNamesProp } from '../../types';
import { Segmented, type SegmentedItem } from '../Segmented';
import styles from './MenuTabs.module.scss';

export type MenuTabsElementKey = 'list' | 'item';
export type MenuTabsItem = SegmentedItem;

export interface MenuTabsProps {
  items: MenuTabsItem[]
  activeItem: string
  onChange: (id: string) => void
  /** Accessible name of the menu, for example "Filter places". */
  'aria-label'?: string
  className?: string
  innerClassNames?: InnerClassNamesProp<MenuTabsElementKey>
}

/**
 * Full-width pill menu with equal tabs, such as "Favorites · All · Recommended".
 * Built on `Segmented`, so it keeps the same keyboard behaviour (arrows, Home, End).
 */
export const MenuTabs = (props: MenuTabsProps) => {
  const { items, activeItem, onChange, className, innerClassNames, 'aria-label': ariaLabel } = props;

  return (
    <Segmented
      items={items}
      activeItem={activeItem}
      onClick={onChange}
      aria-label={ariaLabel}
      innerClassNames={{
        list: clsx(styles.MenuTabs, className, innerClassNames?.list),
        item: clsx(styles.MenuTabs__item, innerClassNames?.item)
      }}
    />
  );
};

MenuTabs.displayName = 'MenuTabs';
