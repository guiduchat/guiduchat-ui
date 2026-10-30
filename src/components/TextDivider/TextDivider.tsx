import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './TextDivider.module.scss';

export type TextDividerProps = ComponentProps<'div'>;

/** Linha com um texto curto no meio, como "ou". */
export const TextDivider = forwardRef<HTMLDivElement, TextDividerProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={clsx(styles.TextDivider, className)} {...rest} />
));

TextDivider.displayName = 'TextDivider';
