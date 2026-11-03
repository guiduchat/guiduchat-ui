import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { Input, type InputProps } from '../Input';
import styles from './SearchField.module.scss';

export type SearchFieldProps = Omit<InputProps, 'iconBefore' | 'size' | 'mode' | 'innerClassNames'>;

/**
 * Campo de busca isolado: pílula de 48 px com a lupa à esquerda, no fundo `--field-background`.
 * Repassa as props do input, então o app pode montar um combobox (`role`, `aria-controls`,
 * `aria-activedescendant`). Sem rótulo visível: passe `aria-label`.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>((props, ref) => {
  const { className, type = 'search', enterKeyHint = 'search', ...rest } = props;
  return (
    <div className={clsx(styles.SearchField, className)}>
      <Input
        ref={ref}
        type={type}
        enterKeyHint={enterKeyHint}
        size="large"
        iconBefore={<Icon icon={icons.search} size={20} />}
        className={styles.SearchField__input}
        innerClassNames={{ container: styles.SearchField__container }}
        {...rest}
      />
    </div>
  );
});

SearchField.displayName = 'SearchField';
