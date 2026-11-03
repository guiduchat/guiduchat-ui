import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import styles from './Skeleton.module.scss';

/**
 * `rect`: bloco (foto, botão). `circle`: o que é redondo de verdade (botão de seta).
 * `avatar`: cantos do avatar do kit, nunca redondo (Marcelo, 02/11/2026).
 * `text`: linhas em bloco. `line`: uma barra na linha do texto, que ocupa a altura de linha
 * do elemento pai; é o que os esqueletos dos cartões usam dentro das classes reais.
 */
export type SkeletonShape = 'rect' | 'circle' | 'avatar' | 'text' | 'line';

interface SkeletonOwnProps {
  shape?: SkeletonShape
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  /** Com `shape="text"`, quantas linhas; a última fica mais curta. */
  lines?: number
}

export type SkeletonProps = MergeProps<ComponentProps<'span'>, SkeletonOwnProps>;

/**
 * Estado carregando. Só visual (`aria-hidden`): quem carrega marca o
 * contêiner com `aria-busy` e um texto para o leitor de tela.
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>((props, ref) => {
  const { className, shape = 'rect', width, height, lines = 1, style, ...rest } = props;
  const blockClassName = clsx(styles.Skeleton, styles[`Skeleton_shape_${shape}`]);

  if (shape === 'text' && lines > 1) {
    return (
      <span ref={ref} className={clsx(styles.SkeletonGroup, className)} style={style} aria-hidden {...rest}>
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className={blockClassName}
            style={{ width: index === lines - 1 ? '60%' : (width ?? '100%'), height }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={clsx(blockClassName, className)}
      style={{ width: width ?? (shape === 'text' || shape === 'line' ? '100%' : undefined), height, ...style }}
      aria-hidden
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';
