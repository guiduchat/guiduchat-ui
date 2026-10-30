import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { icons } from '../../icons';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './RatingStars.module.scss';

interface RatingStarsOwnProps {
  /** Nota de 0 a 5; aceita frações. */
  value: number
  /** Frase para o leitor de tela, por exemplo "Nota 4,6 de 5". */
  label: string
  /** Tamanho de cada estrela, em px. */
  size?: number
}

export type RatingStarsProps = MergeProps<ComponentProps<'span'>, RatingStarsOwnProps>;

const STARS = [0, 1, 2, 3, 4];

/** Cinco estrelas com preenchimento parcial. A Hugeicons gratuita só tem traço: o preenchimento vem do CSS. */
export const RatingStars = forwardRef<HTMLSpanElement, RatingStarsProps>((props, ref) => {
  const { value, label, size = 16, className, style, ...rest } = props;
  const percent = (Math.min(Math.max(value, 0), 5) / 5) * 100;
  const row = STARS.map((star) => <Icon key={star} icon={icons.star} size={size} />);
  return (
    <span ref={ref} role="img" aria-label={label} className={clsx(styles.RatingStars, className)} style={style} {...rest}>
      <span className={styles.RatingStars__empty}>{row}</span>
      <span className={styles.RatingStars__filled} style={{ width: `${percent}%` }}>{row}</span>
    </span>
  );
});

RatingStars.displayName = 'RatingStars';
