import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './WeekdayAvailability.module.scss';

export interface WeekdayAvailabilityDay {
  key: string
  /** Abreviação mostrada no círculo, como "SEG". */
  label: string
  /** Nome inteiro para o leitor de tela, como "Segunda-feira". */
  fullLabel: string
  available: boolean
}

interface WeekdayAvailabilityOwnProps {
  /** Dias da semana, na ordem de exibição. */
  days: WeekdayAvailabilityDay[]
  /** Nome da lista para o leitor de tela. Obrigatório. */
  'aria-label': string
  /** Texto lido junto ao dia disponível, como "disponível para uso" (traduzido pelo app). */
  availableLabel: string
  /** Texto lido junto ao dia indisponível, como "indisponível" (traduzido pelo app). */
  unavailableLabel: string
  /** Legenda abaixo dos círculos, em geral a bolinha verde com "disponível para uso". */
  legend?: ReactNode
}

export type WeekdayAvailabilityProps = MergeProps<Omit<ComponentProps<'div'>, 'children'>, WeekdayAvailabilityOwnProps>;

/**
 * Dias da semana em que a oferta vale. O estado nunca depende só da cor: cada dia
 * leva o nome inteiro e o texto de disponível ou indisponível para o leitor de tela,
 * e o disponível também é preenchido (o indisponível só tem contorno).
 */
export const WeekdayAvailability = forwardRef<HTMLDivElement, WeekdayAvailabilityProps>((props, ref) => {
  const { days, availableLabel, unavailableLabel, legend, className, 'aria-label': ariaLabel, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.WeekdayAvailability, className)} {...rest}>
      <ul className={styles.WeekdayAvailability__list} aria-label={ariaLabel}>
        {days.map((day) => (
          <li key={day.key} className={styles.WeekdayAvailability__item}>
            <span
              className={clsx(
                styles.WeekdayAvailability__day,
                day.available ? styles.WeekdayAvailability__day_available : styles.WeekdayAvailability__day_unavailable
              )}
              aria-hidden="true"
            >
              {day.label}
            </span>
            <span className={styles.WeekdayAvailability__sr}>
              {`${day.fullLabel}: ${day.available ? availableLabel : unavailableLabel}`}
            </span>
          </li>
        ))}
      </ul>
      {hasReactNode(legend) && <div className={styles.WeekdayAvailability__legend}>{legend}</div>}
    </div>
  );
});

WeekdayAvailability.displayName = 'WeekdayAvailability';
