import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type InnerClassNamesProp, type MergeProps } from '../../types';
import styles from './PriceSummary.module.scss';

export type PriceSummaryElementKey = 'row' | 'label' | 'value' | 'total';

export interface PriceSummaryRow {
  label: ReactNode
  /** Valor já formatado pelo app (moeda e idioma). O kit não calcula nada. */
  value: ReactNode
}

interface PriceSummaryOwnProps {
  /** Linhas acima do tracejado, por exemplo subtotal, envio e desconto. */
  rows: PriceSummaryRow[]
  /** Linha do total, depois do tracejado. */
  total: PriceSummaryRow
  innerClassNames?: InnerClassNamesProp<PriceSummaryElementKey>
}

export type PriceSummaryProps = MergeProps<ComponentProps<'dl'>, PriceSummaryOwnProps>;

/** Resumo de valores: linhas, tracejado e total. Rótulos e valores vêm prontos do app. */
export const PriceSummary = forwardRef<HTMLDListElement, PriceSummaryProps>((props, ref) => {
  const { rows, total, innerClassNames, className, ...rest } = props;

  const renderRow = (row: PriceSummaryRow, key: string, extra?: string) => (
    <div key={key} className={clsx(styles.PriceSummary__row, extra, innerClassNames?.row)}>
      <dt className={clsx(styles.PriceSummary__label, innerClassNames?.label)}>{row.label}</dt>
      <dd className={clsx(styles.PriceSummary__value, innerClassNames?.value)}>{row.value}</dd>
    </div>
  );

  return (
    <dl ref={ref} className={clsx(styles.PriceSummary, className)} {...rest}>
      {rows.map((row, index) => renderRow(row, String(index)))}
      {renderRow(total, 'total', clsx(styles.PriceSummary__total, innerClassNames?.total))}
    </dl>
  );
});

PriceSummary.displayName = 'PriceSummary';
