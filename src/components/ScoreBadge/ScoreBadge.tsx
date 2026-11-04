import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type MergeProps } from '../../types';
import { ProviderMark, type ReviewProviderName } from '../Review/ProviderLogo';
import styles from './ScoreBadge.module.scss';

interface ScoreBadgeOwnProps {
  /** Nota já formatada pelo app, por exemplo "4,6". */
  value: ReactNode
  /** Provedor da nota: mostra o logo oficial de 36 px embaixo da nota. Vale mais que `logo`. */
  provider?: ReviewProviderName
  /** Marca livre de quem deu a nota, quando não há `provider`. */
  logo?: ReactNode
  /** Frase para o leitor de tela, por exemplo "Nota 4,6 no Tripadvisor". */
  label: string
}

export type ScoreBadgeProps = MergeProps<ComponentProps<'div'>, ScoreBadgeOwnProps>;

/** Selo vertical de 44 px com a nota em cima e a marca do provedor embaixo, sobre a capa do `StoreHero`. */
export const ScoreBadge = forwardRef<HTMLDivElement, ScoreBadgeProps>((props, ref) => {
  const { value, provider, logo, label, className, ...rest } = props;
  return (
    <div ref={ref} role="img" aria-label={label} className={clsx(styles.ScoreBadge, className)} {...rest}>
      <span className={styles.ScoreBadge__value}>{value}</span>
      {provider
        ? <span className={styles.ScoreBadge__mark}><ProviderMark provider={provider} /></span>
        : <span className={styles.ScoreBadge__logo}>{logo}</span>}
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';
