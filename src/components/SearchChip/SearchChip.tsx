import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type AsChildProp, type MergeProps } from '../../types';
import styles from './SearchChip.module.scss';

interface SearchChipOwnProps extends AsChildProp {
  /** Ícone de 20 px à esquerda do termo. */
  icon: ReactNode
  children?: ReactNode
}

export type SearchChipProps = MergeProps<ComponentProps<'button'>, SearchChipOwnProps>;

/** Atalho de pesquisa: ícone e termo numa linha, com a largura do texto. Com `asChild`, vira o link do app. */
export const SearchChip = forwardRef<HTMLButtonElement, SearchChipProps>((props, ref) => {
  const { icon, asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root ref={ref} type={asChild ? undefined : (type ?? 'button')} className={clsx(styles.SearchChip, className)} {...rest}>
      <span className={styles.SearchChip__icon} aria-hidden="true">{icon}</span>
      <Slottable>{children}</Slottable>
    </Root>
  );
});

SearchChip.displayName = 'SearchChip';
