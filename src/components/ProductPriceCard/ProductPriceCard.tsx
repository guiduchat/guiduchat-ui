import { clsx } from 'clsx';
import { cloneElement, type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactElement, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import styles from './ProductPriceCard.module.scss';

export interface PriceCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface PriceCardSave {
  /** Nome acessível do botão, traduzido pelo app. */
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

export interface ProductPriceCardAction extends AsChildProp {
  /** Texto do botão, traduzido pelo app. */
  label: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  /** Com `asChild`, o app passa o link vazio aqui (`<a href="..." />`); o kit põe o texto dentro dele. */
  children?: ReactElement
}

interface ProductPriceCardOwnProps {
  /** Foto do produto, em fundo branco. Sem ela, fica uma reserva com ícone. */
  image?: PriceCardImage
  /** Nome do produto. Três linhas no máximo. */
  name: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  nameAs?: ElementType
  /** Marca, como "Marca: Corona". Slot do app. */
  brand?: ReactNode
  /** Botão de salvar, à direita do nome. */
  save?: PriceCardSave
  /**
   * Frase "N ofertas em <categoria> a partir de:", ao lado da foto, já pronta do app. Quebras de linha do texto são mantidas. Dentro dela, `<strong>` fica em
   * destaque e `<em>` na cor do tema (sem itálico).
   */
  offers?: ReactNode
  /** Símbolo da moeda, como "R$", pequeno ao lado do valor. */
  currency?: ReactNode
  /** Valor, como "7,49". Vem formatado do app; o kit não calcula. */
  price: ReactNode
  /** Unidade do preço, como "(unidade de 330ml)". */
  unit?: ReactNode
  /** Texto da faixa de baixo, ao lado do ícone de entrega. */
  delivery?: ReactNode
  /** Botão da faixa de baixo, como "Comparar Ofertas". */
  action?: ProductPriceCardAction
}

export type ProductPriceCardProps = MergeProps<ComponentProps<'article'>, ProductPriceCardOwnProps>;

/**
 * Cartão do produto na pesquisa de preços: foto, nome, marca, ofertas, o menor preço e, na faixa de baixo,
 * a entrega e o botão para comparar as lojas. Cartão de fora com cartão de dentro (mais claro no hub escuro).
 * Só apresentação: textos, números e ações vêm do app.
 */
export const ProductPriceCard = forwardRef<HTMLElement, ProductPriceCardProps>((props, ref) => {
  const { image, name, nameAs: Name = 'h3', brand, save, offers, currency, price, unit, delivery, action, className, ...rest } = props;

  return (
    <article ref={ref} className={clsx(styles.ProductPriceCard, className)} {...rest}>
      <div className={styles.ProductPriceCard__body}>
        <div className={styles.ProductPriceCard__top}>
          <div className={styles.ProductPriceCard__media}>
            {image
              ? <img className={styles.ProductPriceCard__image} src={image.src} alt={image.alt ?? ''} loading="lazy" />
              : <Icon icon={icons.image} size={32} />}
          </div>
          <div className={styles.ProductPriceCard__info}>
            <div className={styles.ProductPriceCard__heading}>
              <Name className={styles.ProductPriceCard__name}>{name}</Name>
              {save && (
                <button
                  type="button"
                  className={styles.ProductPriceCard__save}
                  aria-label={save.label}
                  aria-pressed={save.pressed}
                  onClick={() => { save.onPressedChange(!save.pressed); }}
                >
                  <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
                </button>
              )}
            </div>
            {hasReactNode(brand) && <span className={styles.ProductPriceCard__brand}>{brand}</span>}
            <div className={styles.ProductPriceCard__priceRow}>
              {hasReactNode(offers) && <p className={styles.ProductPriceCard__offers}>{offers}</p>}
              <p className={styles.ProductPriceCard__price}>
                <span className={styles.ProductPriceCard__amount}>
                  {hasReactNode(currency) && <span className={styles.ProductPriceCard__currency}>{currency}</span>}
                  {price}
                </span>
                {hasReactNode(unit) && <span className={styles.ProductPriceCard__unit}>{unit}</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
      {(hasReactNode(delivery) || action) && (
        <div className={styles.ProductPriceCard__footer}>
          {hasReactNode(delivery) && (
            <p className={styles.ProductPriceCard__delivery}>
              <span className={styles.ProductPriceCard__deliveryIcon}><Icon icon={icons.delivery} size={28} /></span>
              <span>{delivery}</span>
            </p>
          )}
          {action && (
            <Button
              size="small"
              className={styles.ProductPriceCard__action}
              asChild={action.asChild}
              onClick={action.onClick}
            >
              {action.asChild && action.children ? cloneElement(action.children, undefined, action.label) : action.label}
            </Button>
          )}
        </div>
      )}
    </article>
  );
});

ProductPriceCard.displayName = 'ProductPriceCard';
