import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { type ProductHeroAction } from '../ProductHero';
import styles from './ProductPinnedHeader.module.scss';

export interface ProductPinnedHeaderOffers {
  /** Texto do botão, como "15 Ofertas". Vem pronto do app. */
  label: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface ProductPinnedHeaderOwnProps {
  /** Foto do produto, em quadro de 80x80 em fundo branco. Sem ela, fica uma reserva com ícone. */
  image?: { src: string, alt?: string }
  /** Nome do produto, em até duas linhas. */
  name: ReactNode
  /** Elemento do nome. `p` por padrão: o título da página é outro. */
  nameAs?: ElementType
  /** Botão com o total de ofertas. */
  offers?: ProductPinnedHeaderOffers
  /** Ações redondas de 36 px, à direita do botão (favoritos, alerta de preço, compartilhar). */
  actions?: ProductHeroAction[]
}

export type ProductPinnedHeaderProps = MergeProps<ComponentProps<'div'>, ProductPinnedHeaderOwnProps>;

/**
 * Complemento das abas grudadas da página do produto: foto pequena, nome e o botão com o total de ofertas,
 * com as ações do produto. Sem cartão e sem fundo próprio: o app o põe num elemento grudado, com o fundo
 * da página, acima das abas. Só apresentação.
 */
export const ProductPinnedHeader = forwardRef<HTMLDivElement, ProductPinnedHeaderProps>((props, ref) => {
  const { image, name, nameAs: Name = 'p', offers, actions, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ProductPinnedHeader, className)} {...rest}>
      <div className={styles.ProductPinnedHeader__media}>
        {image
          ? <img className={styles.ProductPinnedHeader__image} src={image.src} alt={image.alt ?? ''} />
          : <Icon icon={icons.image} size={24} />}
      </div>
      <div className={styles.ProductPinnedHeader__info}>
        <Name className={styles.ProductPinnedHeader__name}>{name}</Name>
        <div className={styles.ProductPinnedHeader__row}>
          {offers && (
            <Button size="small" className={styles.ProductPinnedHeader__offers} onClick={offers.onClick}>
              {offers.label}
            </Button>
          )}
          {actions && actions.length > 0 && (
            <div className={styles.ProductPinnedHeader__actions}>
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className={styles.ProductPinnedHeader__action}
                  aria-label={action.label}
                  onClick={action.onClick}
                >
                  <span aria-hidden style={{ display: 'contents' }}>{action.icon}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProductPinnedHeader.displayName = 'ProductPinnedHeader';
