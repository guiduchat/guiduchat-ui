import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { icons } from '../../icons/catalog';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './QuantityStepper.module.scss';

export type QuantityStepperElementKey = 'button' | 'value';

interface QuantityStepperOwnProps {
  /** Quantidade atual. */
  value: number
  /** Menor valor; o botão de menos desabilita ao chegar nele. 0 por padrão. */
  min?: number
  /** Maior valor; o botão de mais desabilita ao chegar nele. Sem limite por padrão. */
  max?: number
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
  /** Nome do grupo para o leitor de tela, por exemplo "Quantidade de Pizza". Vem do app. */
  label: string
  /** Nome do botão de mais, por exemplo "Aumentar quantidade". Vem do app. */
  incrementLabel: string
  /** Nome do botão de menos, por exemplo "Diminuir quantidade". Vem do app. */
  decrementLabel: string
  innerClassNames?: InnerClassNamesProp<QuantityStepperElementKey>
}

export type QuantityStepperProps = MergeProps<Omit<ComponentProps<'div'>, 'children'>, QuantityStepperOwnProps>;

/**
 * Seletor de quantidade na ordem do desenho: mais, valor, menos. Círculos
 * pequenos na tela, cada um com área de toque de 44 px.
 */
export const QuantityStepper = forwardRef<HTMLDivElement, QuantityStepperProps>((props, ref) => {
  const {
    value, min = 0, max, onIncrement, onDecrement, disabled = false,
    label, incrementLabel, decrementLabel, innerClassNames, className, ...rest
  } = props;
  const atMax = max !== undefined && value >= max;
  const atMin = value <= min;

  return (
    <div ref={ref} role="group" aria-label={label} className={clsx(styles.QuantityStepper, className)} {...rest}>
      <button
        type="button"
        className={clsx(styles.QuantityStepper__button, innerClassNames?.button)}
        aria-label={incrementLabel}
        disabled={disabled || atMax}
        onClick={onIncrement}
      >
        <span className={styles.QuantityStepper__circle}><Icon icon={icons.add} size={14} strokeWidth={2} /></span>
      </button>
      <output className={clsx(styles.QuantityStepper__value, innerClassNames?.value)}>{value}</output>
      <button
        type="button"
        className={clsx(styles.QuantityStepper__button, innerClassNames?.button)}
        aria-label={decrementLabel}
        disabled={disabled || atMin}
        onClick={onDecrement}
      >
        <span className={styles.QuantityStepper__circle}><Icon icon={icons.minus} size={14} strokeWidth={2} /></span>
      </button>
    </div>
  );
});

QuantityStepper.displayName = 'QuantityStepper';
