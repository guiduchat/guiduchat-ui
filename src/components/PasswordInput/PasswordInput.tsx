import { forwardRef, useState } from 'react';

import { icons } from '../../icons';
import { Icon } from '../Icon';
import { Input, type InputProps } from '../Input';
import styles from './PasswordInput.module.scss';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'iconAfter' | 'withClearButton'> {
  /** Nome do botão quando a senha está escondida. */
  showLabel: string
  /** Nome do botão quando a senha está à vista. */
  hideLabel: string
}

/** Campo de senha com o olho para mostrar e esconder. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { showLabel, hideLabel, ...rest } = props;
  const [visible, setVisible] = useState(false);
  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      iconAfter={(
        <button
          type="button"
          className={styles.PasswordInput__toggle}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          <Icon icon={visible ? icons.eyeOff : icons.eye} size={20} />
        </button>
      )}
      {...rest}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
