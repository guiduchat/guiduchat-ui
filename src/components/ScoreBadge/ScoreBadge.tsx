import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type MergeProps } from '../../types';
import styles from './ScoreBadge.module.scss';

interface ScoreBadgeOwnProps {
  /** Nota já formatada pelo app, por exemplo "4,6". */
  value: ReactNode
  /** Marca de quem deu a nota, como o logo do Tripadvisor ou do Google. */
  logo: ReactNode
  /** Frase para o leitor de tela, por exemplo "Nota 4,6 no Tripadvisor". */
  label: string
}

export type ScoreBadgeProps = MergeProps<ComponentProps<'div'>, ScoreBadgeOwnProps>;

/** Selo com a nota e a marca do provedor, sobre a capa do `StoreHero`. */
export const ScoreBadge = forwardRef<HTMLDivElement, ScoreBadgeProps>((props, ref) => {
  const { value, logo, label, className, ...rest } = props;
  return (
    <div ref={ref} role="img" aria-label={label} className={clsx(styles.ScoreBadge, className)} {...rest}>
      <span className={styles.ScoreBadge__value}>{value}</span>
      <span className={styles.ScoreBadge__logo}>{logo}</span>
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';
