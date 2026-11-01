import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './Checkbox.module.scss';

export type CheckboxElementKey = 'input' | 'control' | 'label';

interface CheckboxOwnProps {
  /** Texto do rótulo, traduzido pelo app. Clicar nele marca ou desmarca. */
  label: ReactNode
  innerClassNames?: InnerClassNamesProp<CheckboxElementKey>
}

export type CheckboxProps = MergeProps<Omit<ComponentProps<'input'>, 'type' | 'children'>, CheckboxOwnProps>;

/** Caixa de seleção com rótulo. O alvo de toque inteiro (rótulo incluso) tem no mínimo 44 px de altura. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, forwardedRef) => {
  const { label, innerClassNames, className, ...rest } = props;

  return (
    <label className={clsx(styles.Checkbox, { [styles.Checkbox_disabled]: rest.disabled }, className)}>
      <input
        {...rest}
        ref={forwardedRef}
        type="checkbox"
        className={clsx(styles.Checkbox__input, innerClassNames?.input)}
      />
      <span className={clsx(styles.Checkbox__control, innerClassNames?.control)}>
        <Icon icon={icons.check} size={16} strokeWidth={2.5} />
      </span>
      <span className={clsx(styles.Checkbox__label, innerClassNames?.label)}>{label}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
