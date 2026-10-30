import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './BentoGrid.module.scss';

interface BentoGridOwnProps {
  /** Peça alta, à esquerda. */
  tall?: ReactNode
  /** Peça larga, em cima à direita. */
  wide?: ReactNode
}

export type BentoGridProps = MergeProps<ComponentProps<'section'>, BentoGridOwnProps>;

/** Mosaico do perfil: duas fotos e, em `children`, até dois `ActionTile`. */
export const BentoGrid = forwardRef<HTMLElement, BentoGridProps>(({ tall, wide, children, className, ...rest }, ref) => {
  const hasMedia = hasReactNode(tall) || hasReactNode(wide);
  return (
    <section ref={ref} className={clsx(styles.BentoGrid, !hasMedia && styles.BentoGrid_tilesOnly, className)} {...rest}>
      {hasReactNode(tall) && <div className={styles.BentoGrid__tall}>{tall}</div>}
      {hasReactNode(wide) && <div className={styles.BentoGrid__wide}>{wide}</div>}
      {children}
    </section>
  );
});

BentoGrid.displayName = 'BentoGrid';

export type BentoImageProps = ComponentProps<'img'>;

/** Foto do mosaico. Sem `src`, mostra o marcador de imagem. */
export const BentoImage = forwardRef<HTMLImageElement, BentoImageProps>(({ src, alt = '', className, ...rest }, ref) =>
  src
    ? <img ref={ref} className={clsx(styles.BentoImage, className)} src={src} alt={alt} {...rest} />
    : <span className={clsx(styles.BentoImage, styles.BentoImage_empty, className)}><Icon icon={icons.image} size={32} /></span>
);

BentoImage.displayName = 'BentoImage';

interface ActionTileOwnProps extends AsChildProp {
  title: ReactNode
  children?: ReactNode
}

export type ActionTileProps = MergeProps<ComponentProps<'button'>, ActionTileOwnProps>;

/** Bloco com título e seta, por exemplo Horário e Social. */
export const ActionTile = forwardRef<HTMLButtonElement, ActionTileProps>((props, ref) => {
  const { title, asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root ref={ref} type={asChild ? undefined : (type ?? 'button')} className={clsx(styles.ActionTile, className)} {...rest}>
      <span className={styles.ActionTile__title}>{title}</span>
      <Slottable>{children}</Slottable>
      <span className={styles.ActionTile__arrow}><Icon icon={icons.arrowForward} size={20} /></span>
    </Root>
  );
});

ActionTile.displayName = 'ActionTile';
