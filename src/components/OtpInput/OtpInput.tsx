import { clsx } from 'clsx';
import { type ChangeEvent, type ComponentProps, forwardRef, useState } from 'react';

import { type MergeProps } from '../../types';
import styles from './OtpInput.module.scss';

interface OtpInputOwnProps {
  value: string
  onChange: (value: string) => void
  /** Chamado quando o último dígito entra. */
  onComplete?: (value: string) => void
  /** Quantidade de dígitos. */
  length?: number
  /** Marca os quadrados em vermelho. */
  invalid?: boolean
}

export type OtpInputProps = MergeProps<Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'size'>, OtpInputOwnProps>;

/**
 * Código de verificação. É um campo só, por cima dos quadrados: assim colar,
 * apagar e o preenchimento automático do aparelho funcionam sem lógica extra.
 */
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>((props, ref) => {
  const { value, onChange, onComplete, length = 6, invalid = false, className, onFocus, onBlur, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const active = Math.min(value.length, length - 1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value.replace(/\D/g, '').slice(0, length);
    onChange(next);
    if (next.length === length && next !== value) onComplete?.(next);
  };

  return (
    <div className={clsx(styles.OtpInput, invalid && styles.OtpInput_invalid, className)}>
      <div className={styles.OtpInput__boxes} aria-hidden>
        {Array.from({ length }, (_, index) => (
          <span
            key={index}
            className={clsx(styles.OtpInput__box, focused && index === active && styles.OtpInput__box_active)}
          >
            {value[index]}
          </span>
        ))}
      </div>
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={length}
        className={styles.OtpInput__input}
        value={value}
        onChange={handleChange}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...rest}
      />
    </div>
  );
});

OtpInput.displayName = 'OtpInput';
