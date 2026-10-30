import { clsx } from 'clsx';
import { forwardRef, useMemo } from 'react';

import { Input, type InputProps } from '../Input';
import { Select } from '../Select';
import styles from './PhoneInput.module.scss';

export interface PhoneCountry {
  /** Código do país (ISO), por exemplo "BR". */
  code: string
  /** Nome no idioma da pessoa. */
  name: string
  /** DDI, por exemplo "+55". */
  dialCode: string
  /** Bandeira em emoji. */
  flag: string
}

export interface PhoneInputProps extends Omit<InputProps, 'type' | 'iconBefore' | 'iconAfter'> {
  /** Países da lista, vindos do app. */
  countries: PhoneCountry[]
  /** Código do país escolhido. */
  country: string
  onCountryChange: (code: string) => void
  /** Nome do seletor de país, traduzido pelo app. */
  countryLabel: string
  /** Texto da busca de países. */
  searchPlaceholder?: string
  /** Texto de quando a busca não acha nada. */
  emptyText?: string
}

/** Telefone com o país: o DDI fica no seletor, e o número, no campo. */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {
  const {
    countries,
    country,
    onCountryChange,
    countryLabel,
    searchPlaceholder,
    emptyText,
    className,
    disabled,
    ...rest
  } = props;

  const options = useMemo(() => countries.map(({ code, name, dialCode, flag }) => ({
    value: code,
    label: `${flag} ${dialCode}`,
    hint: name,
    searchText: `${name} ${dialCode} ${code}`
  })), [countries]);

  return (
    <div className={clsx(styles.PhoneInput, className)}>
      <Select
        aria-label={countryLabel}
        className={styles.PhoneInput__country}
        options={options}
        value={country}
        onValueChange={(code) => onCountryChange(code)}
        searchable
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
        dropdownWidth="auto"
        placement="bottom-start"
        disabled={disabled}
      />
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={styles.PhoneInput__number}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
});

PhoneInput.displayName = 'PhoneInput';
