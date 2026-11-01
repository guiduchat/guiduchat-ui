import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type KeyboardEvent } from 'react';

import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { Button } from '../Button';
import styles from './ActionInput.module.scss';

export type ActionInputElementKey = 'container' | 'input' | 'button';

interface ActionInputOwnProps {
  /** Nome acessível do campo (ele não mostra rótulo, só o `placeholder`). Vem do app. */
  label: string
  placeholder?: string
  /** Texto do botão dentro do campo, por exemplo "Aplicar". Vem do app. */
  actionLabel: string
  /** Chamado ao tocar no botão ou apertar Enter no campo. */
  onAction: () => void
  /** Desabilita só o botão (o campo segue editável). */
  actionDisabled?: boolean
  innerClassNames?: InnerClassNamesProp<ActionInputElementKey>
}

export type ActionInputProps = MergeProps<Omit<ComponentProps<'input'>, 'size' | 'aria-label'>, ActionInputOwnProps>;

/**
 * Campo com botão dentro (por exemplo, cupom e Aplicar). O botão fica fora do
 * `label` do campo, por isso o `Input` e o `iconAfter` dele não servem aqui.
 */
export const ActionInput = forwardRef<HTMLInputElement, ActionInputProps>((props, forwardedRef) => {
  const {
    label, placeholder, actionLabel, onAction, actionDisabled = false, innerClassNames, className, onKeyDown, disabled, ...rest
  } = props;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === 'Enter' && !event.defaultPrevented && !actionDisabled && !disabled) {
      event.preventDefault();
      onAction();
    }
  };

  return (
    <div className={clsx(styles.ActionInput, { [styles.ActionInput_disabled]: disabled }, className, innerClassNames?.container)}>
      <input
        {...rest}
        ref={forwardedRef}
        className={clsx(styles.ActionInput__input, innerClassNames?.input)}
        aria-label={label}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="button"
        size="small"
        variant="secondary"
        className={clsx(innerClassNames?.button)}
        disabled={disabled || actionDisabled}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
});

ActionInput.displayName = 'ActionInput';
