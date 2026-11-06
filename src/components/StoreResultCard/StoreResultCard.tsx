import { clsx } from 'clsx';
import { cloneElement, type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { type PriceCardImage, type PriceCardSave, type ProductPriceCardAction } from '../ProductPriceCard';
import styles from './StoreResultCard.module.scss';

interface StoreResultCardOwnProps {
  /** Foto do item, em moldura fixa de 100x175 (corta para preencher). Sem ela, fica uma reserva com ícone. */
  image?: PriceCardImage
  /** Nome do item. Três linhas no máximo. */
  name: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  nameAs?: ElementType
  /** Botão de salvar, à direita do nome. */
  save?: PriceCardSave
  /**
   * Frase "N ofertas / em categoria / a partir de:", já pronta do app, com `\n` entre as linhas.
   * Dentro dela, `<strong>` fica em destaque e `<em>` na cor do tema (sem itálico).
   */
  offers?: ReactNode
  /** Símbolo da moeda, como "R$". */
  currency?: ReactNode
  /** Preço do item da foto, como "240". Vem formatado do app; o kit não calcula. */
  price: ReactNode
  /** Logo da loja, em geral `Avatar.Container form="squircle" size={48}`. */
  avatar?: ReactNode
  /** Nome da loja. */
  storeName: ReactNode
  /** Endereço da loja. */
  address?: ReactNode
  /** Texto de entrega ao lado do ícone, como "Retirada ou\nentrega hoje por R$ 8,00". */
  delivery?: ReactNode
  /** Situação da loja, sob o texto de entrega, como "Aberto até 20h". Vem pronta do servidor. */
  status?: ReactNode
  /** Cor da situação: `positive` (padrão) ou `negative`. */
  statusTone?: 'positive' | 'negative'
  /** Botão da faixa de baixo, como "Ver Opções". */
  action?: ProductPriceCardAction
}

export type StoreResultCardProps = MergeProps<ComponentProps<'article'>, StoreResultCardOwnProps>;

/**
 * Resultado da pesquisa por loja (produto não padronizado): o item de destaque da loja com a foto, o nome,
 * quantas ofertas a loja tem e o preço, a loja, e na faixa de baixo a entrega, a situação e "Ver Opções".
 * Cartão de fora com cartão de dentro. Só apresentação: textos, números e ações vêm do app.
 */
export const StoreResultCard = forwardRef<HTMLElement, StoreResultCardProps>((props, ref) => {
  const {
    image, name, nameAs: Name = 'h3', save, offers, currency, price, avatar, storeName, address, delivery, status,
    statusTone = 'positive', action, className, ...rest
  } = props;

  return (
    <article ref={ref} className={clsx(styles.StoreResultCard, className)} {...rest}>
      <div className={styles.StoreResultCard__body}>
        <div className={styles.StoreResultCard__top}>
          <div className={styles.StoreResultCard__media}>
            {image
              ? <img className={styles.StoreResultCard__image} src={image.src} alt={image.alt ?? ''} loading="lazy" />
              : <Icon icon={icons.image} size={32} />}
          </div>
          <div className={styles.StoreResultCard__info}>
            <div className={styles.StoreResultCard__heading}>
              <Name className={styles.StoreResultCard__name}>{name}</Name>
              {save && (
                <button
                  type="button"
                  className={styles.StoreResultCard__save}
                  aria-label={save.label}
                  aria-pressed={save.pressed}
                  onClick={() => { save.onPressedChange(!save.pressed); }}
                >
                  <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
                </button>
              )}
            </div>
            <div className={styles.StoreResultCard__priceRow}>
              {hasReactNode(offers) && <p className={styles.StoreResultCard__offers}>{offers}</p>}
              <p className={styles.StoreResultCard__price}>
                {hasReactNode(currency) && <span className={styles.StoreResultCard__currency}>{currency}</span>}
                {price}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.StoreResultCard__store}>
          {hasReactNode(avatar) && <span className={styles.StoreResultCard__avatar}>{avatar}</span>}
          <div className={styles.StoreResultCard__names}>
            <span className={styles.StoreResultCard__storeName}>{storeName}</span>
            {hasReactNode(address) && <span className={styles.StoreResultCard__address}>{address}</span>}
          </div>
        </div>
      </div>
      {(hasReactNode(delivery) || hasReactNode(status) || action) && (
        <div className={styles.StoreResultCard__footer}>
          <div className={styles.StoreResultCard__delivery}>
            <span className={styles.StoreResultCard__deliveryIcon}><Icon icon={icons.delivery} size={28} /></span>
            <p className={styles.StoreResultCard__deliveryText}>
              {hasReactNode(delivery) && <span>{delivery}</span>}
              {hasReactNode(status) && (
                <span className={clsx(styles.StoreResultCard__status, statusTone === 'negative' && styles.StoreResultCard__status_negative)}>
                  {status}
                </span>
              )}
            </p>
          </div>
          {action && (
            <Button
              size="small"
              className={styles.StoreResultCard__action}
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

StoreResultCard.displayName = 'StoreResultCard';
