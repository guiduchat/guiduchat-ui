import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './ProductHero.module.scss';

export interface ProductHeroAction {
  /** Nome acessível do botão, traduzido pelo app. */
  label: string
  /** O ícone, em geral `<Icon icon={icons.share} />`. */
  icon: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface ProductHeroOwnProps {
  /** Foto do produto, em fundo branco. Sem ela, fica uma reserva com ícone. */
  image?: { src: string, alt?: string }
  /** Ações redondas de 44 px em coluna, à direita da imagem (compartilhar, alerta, favoritos, copiar link). */
  actions?: ProductHeroAction[]
}

export type ProductHeroProps = MergeProps<ComponentProps<'div'>, ProductHeroOwnProps>;

/**
 * Imagem de destaque da página do produto: de borda a borda, em fundo branco e com cantos arredondados,
 * com a coluna de ações sobre ela. Só apresentação: textos e ações vêm do app.
 */
export const ProductHero = forwardRef<HTMLDivElement, ProductHeroProps>((props, ref) => {
  const { image, actions, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductHero, className)} {...rest}>
      {image
        ? <img className={styles.ProductHero__image} src={image.src} alt={image.alt ?? ''} />
        : <Icon icon={icons.image} size={48} />}
      {actions && actions.length > 0 && (
        <div className={styles.ProductHero__actions}>
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={styles.ProductHero__action}
              aria-label={action.label}
              onClick={action.onClick}
            >
              <span aria-hidden style={{ display: 'contents' }}>{action.icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ProductHero.displayName = 'ProductHero';
