import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { icons } from '../../icons';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './StarTile.module.scss';

interface StarTileOwnProps {
  /** Lado do quadrado, em px; 24 por padrão. A estrela ocupa 70% e o raio é 25% do lado. */
  size?: number
  /**
   * Nome para o leitor de tela, traduzido pelo app. Sem ele, o quadrado é decorativo (`aria-hidden`),
   * como quando fica ao lado do número da nota.
   */
  label?: string
}

export type StarTileProps = MergeProps<ComponentProps<'span'>, StarTileOwnProps>;

/** Estrela cheia no centro de um quadrado arredondado #2D2D2D (modelo do Marcelo, 01/11/2026). */
export const StarTile = forwardRef<HTMLSpanElement, StarTileProps>((props, ref) => {
  const { size = 24, label, className, style, ...rest } = props;
  return (
    <span
      ref={ref}
      className={clsx(styles.StarTile, className)}
      style={{ width: size, height: size, borderRadius: size * 0.25, ...style }}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...rest}
    >
      <Icon icon={icons.star} size={Math.round(size * 0.7)} fill="currentColor" strokeWidth={1} />
    </span>
  );
});

StarTile.displayName = 'StarTile';
