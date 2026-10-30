import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useId } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './FormField.module.scss';

interface FormFieldOwnProps {
  /** Rótulo do campo, traduzido pelo app. */
  label: ReactNode
  /** Linha de ajuda embaixo; o erro, quando há, fica no lugar dela. */
  hint?: ReactNode
  /** Mensagem de erro, traduzida pelo app. */
  error?: ReactNode
  /** O campo: `Input`, `PhoneInput`, `PasswordInput` ou `OtpInput`. */
  children: ReactNode
}

export type FormFieldProps = MergeProps<ComponentProps<'div'>, FormFieldOwnProps>;

/** Rótulo, campo, ajuda e erro, ligados para o leitor de tela. */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const { label, hint, error, children, className, ...rest } = props;
  const id = useId();
  const noteId = `${id}-note`;
  const note = hasReactNode(error) ? error : hint;
  const hasError = hasReactNode(error);

  return (
    <div ref={ref} className={clsx(styles.FormField, className)} {...rest}>
      <label className={styles.FormField__label} htmlFor={id}>{label}</label>
      <Slot id={id} aria-invalid={hasError || undefined} aria-describedby={hasReactNode(note) ? noteId : undefined}>
        {children}
      </Slot>
      {hasReactNode(note) && (
        <span
          id={noteId}
          role={hasError ? 'alert' : undefined}
          className={clsx(styles.FormField__note, hasError && styles.FormField__note_error)}
        >
          {note}
        </span>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
