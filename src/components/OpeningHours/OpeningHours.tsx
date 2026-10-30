import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode, useId, useState } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './OpeningHours.module.scss';

export type OpeningHoursTone = 'positive' | 'attention' | 'negative';

export interface OpeningHoursDay {
  /** Nome do dia, traduzido pelo app. */
  day: ReactNode
  /** Horários do dia, um por linha; ou o texto "Fechado". */
  hours: ReactNode[]
  /** Marca o dia de hoje. */
  today?: boolean
}

interface OpeningHoursOwnProps {
  title: ReactNode
  /** Elemento do título. `h2` por padrão. */
  titleAs?: ElementType
  /** Rótulo de cima, por exemplo "Horários de hoje". */
  todayLabel: ReactNode
  /** Horários de hoje, um por linha. */
  todayHours: ReactNode[]
  /** Situação pronta do servidor, por exemplo "Fechará em breve". */
  status?: ReactNode
  statusTone?: OpeningHoursTone
  /** A semana inteira, mostrada ao expandir. */
  week: OpeningHoursDay[]
  /** Nome do botão de expandir, traduzido pelo app. */
  expandLabel: string
}

export type OpeningHoursProps = MergeProps<ComponentProps<'section'>, OpeningHoursOwnProps>;

/** Horário de funcionamento: hoje e, ao expandir, a semana inteira. */
export const OpeningHours = forwardRef<HTMLElement, OpeningHoursProps>((props, ref) => {
  const {
    title,
    titleAs: Title = 'h2',
    todayLabel,
    todayHours,
    status,
    statusTone = 'positive',
    week,
    expandLabel,
    className,
    ...rest
  } = props;
  const [expanded, setExpanded] = useState(false);
  const weekId = useId();

  return (
    <section ref={ref} className={clsx(styles.OpeningHours, className)} {...rest}>
      <Title className={styles.OpeningHours__title}>{title}</Title>
      <div className={styles.OpeningHours__body}>
        <div className={styles.OpeningHours__today}>
          <span className={styles.OpeningHours__label}>{todayLabel}</span>
          {todayHours.map((hours, index) => <span key={index}>{hours}</span>)}
          {hasReactNode(status) && (
            <span className={clsx(styles.OpeningHours__status, styles[`OpeningHours__status_${statusTone}`])}>{status}</span>
          )}
        </div>
        <button
          type="button"
          className={clsx(styles.OpeningHours__toggle, expanded && styles.OpeningHours__toggle_expanded)}
          aria-label={expandLabel}
          aria-expanded={expanded}
          aria-controls={weekId}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon icon={icons.chevronDown} />
        </button>
        <dl id={weekId} className={styles.OpeningHours__week} hidden={!expanded}>
          {week.map(({ day, hours, today }, index) => (
            <div key={index} className={clsx(styles.OpeningHours__day, today && styles.OpeningHours__day_today)}>
              <dt>{day}</dt>
              <dd>{hours.map((line, lineIndex) => <span key={lineIndex}>{line}</span>)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
});

OpeningHours.displayName = 'OpeningHours';
