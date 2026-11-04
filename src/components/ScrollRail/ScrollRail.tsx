import { clsx } from 'clsx';
import { Children, type ComponentProps, forwardRef, type ReactNode } from 'react';

import { type MergeProps } from '../../types';
import styles from './ScrollRail.module.scss';

interface ScrollRailOwnProps {
  /** Nome da trilha para o leitor de tela, traduzido pelo app. */
  'aria-label': string
  /** Fileiras: com 2, os filhos se repartem em duas fileiras que rolam juntas. */
  rows?: 1 | 2
  children?: ReactNode
}

export type ScrollRailProps = MergeProps<ComponentProps<'div'>, ScrollRailOwnProps>;

/**
 * Trilha que rola para o lado, livre (sem a paginação do `Carousel`), sem barra, com 12 px entre os itens
 * e padding de 16 px que deixa o conteúdo encostar nas bordas da tela. Com `rows={2}`, a primeira metade dos
 * filhos fica na fileira de cima e o resto na de baixo, ambas no mesmo contêiner, então rolam juntas.
 */
export const ScrollRail = forwardRef<HTMLDivElement, ScrollRailProps>((props, ref) => {
  const { rows = 1, children, className, ...rest } = props;
  // eslint-disable-next-line @eslint-react/no-children-to-array -- repartir os filhos em fileiras exige a lista achatada, como no Carousel
  const items = Children.toArray(children);
  const half = Math.ceil(items.length / 2);
  return (
    <div ref={ref} role="group" data-rows={rows} className={clsx(styles.ScrollRail, className)} {...rest}>
      <div className={styles.ScrollRail__content}>
        {rows === 2
          ? (
            <>
              <div className={styles.ScrollRail__row}>{items.slice(0, half)}</div>
              <div className={styles.ScrollRail__row}>{items.slice(half)}</div>
            </>
          )
          : <div className={styles.ScrollRail__row}>{children}</div>}
      </div>
    </div>
  );
});

ScrollRail.displayName = 'ScrollRail';
