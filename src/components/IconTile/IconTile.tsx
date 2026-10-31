import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './IconTile.module.scss';

export type IconTileProps = ComponentProps<'span'>;

/** Quadrado com um ícone, usado à esquerda dos quadros internos. */
export const IconTile = forwardRef<HTMLSpanElement, IconTileProps>(({ className, ...rest }, ref) => (
  <span ref={ref} className={clsx(styles.IconTile, className)} {...rest} />
));

IconTile.displayName = 'IconTile';
