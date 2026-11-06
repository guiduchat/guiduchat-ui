import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode, useId } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { type PriceCardImage, type PriceCardSave } from '../ProductPriceCard';
import styles from './StorePriceCard.module.scss';

export interface StorePriceCardPayment {
  /** Título do bloco, como "Opções de Pagamento". */
  title: ReactNode
  /** Formas aceitas, como "Dinheiro, Cartão de Crédito e PIX.". */
  text: ReactNode
}

export interface StorePriceCardOrderAction {
  /** Texto do botão largo, como "Enviar pedido para loja". */
  label: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
}

interface StorePriceCardOwnProps {
  /** Símbolo da moeda, como "R$". */
  currency?: ReactNode
  /** Valor da loja, como "7,80". Vem formatado do app; o kit não calcula nem ordena. */
  price: ReactNode
  /** Legenda do preço, como "Preços em BRL". */
  priceNote?: ReactNode
  /** Texto ao lado do ícone de entrega, como "Retirada ou entrega disponíveis". */
  fulfillment?: ReactNode
  /** Pílula de aviso, como "Preço não inclui frete. Atualizado em 04/11/2026 12:30.". */
  notice?: ReactNode
  /** Logo da loja, em geral `Avatar.Container form="squircle" size={48}`. */
  avatar?: ReactNode
  /** Nome da loja. */
  storeName: ReactNode
  /** Endereço da loja. */
  address?: ReactNode
  /** Situação da loja, como "Aberto até 20h.". Vem pronta do servidor. */
  status?: ReactNode
  /** Cor da situação: `positive` (padrão) ou `negative`. */
  statusTone?: 'positive' | 'negative'
  /** Estado aberto. Controlado: o app decide quem fica aberto (um por vez). */
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Nome acessível do botão de seta, traduzido pelo app. */
  toggleLabel: string
  /** Só no estado aberto: foto do produto, em fundo branco. */
  image?: PriceCardImage
  /** Só no estado aberto: categoria, acima do nome. */
  category?: ReactNode
  /** Só no estado aberto: nome do produto. */
  productName?: ReactNode
  /** Elemento do nome do produto. `h4` por padrão. */
  productNameAs?: ElementType
  /** Só no estado aberto: botão de salvar. */
  save?: PriceCardSave
  /** Só no estado aberto: marca, como "Marca: Corona". */
  brand?: ReactNode
  /** Só no estado aberto: descrição da unidade. */
  description?: ReactNode
  /** Só no estado aberto: formas de pagamento. */
  payment?: StorePriceCardPayment
  /** Só no estado aberto: botão largo de pedido. */
  orderAction?: StorePriceCardOrderAction
}

export type StorePriceCardProps = MergeProps<ComponentProps<'article'>, StorePriceCardOwnProps>;

/**
 * Oferta de uma loja para o produto, com dois estados. Fechado: preço, entrega, aviso de frete e a loja.
 * Aberto: acrescenta foto, nome, marca, unidade, pagamento e o botão de pedido; a seta aponta para cima.
 * O estado é controlado (`open` e `onOpenChange`). Só apresentação: textos e dados vêm do app.
 */
export const StorePriceCard = forwardRef<HTMLElement, StorePriceCardProps>((props, ref) => {
  const {
    currency, price, priceNote, fulfillment, notice, avatar, storeName, address, status, statusTone = 'positive',
    open, onOpenChange, toggleLabel, image, category, productName, productNameAs: ProductName = 'h4', save,
    brand, description, payment, orderAction, className, ...rest
  } = props;
  const detailsId = useId();

  return (
    <article ref={ref} className={clsx(styles.StorePriceCard, className)} {...rest}>
      <div className={styles.StorePriceCard__body}>
        <div className={styles.StorePriceCard__priceRow}>
          <p className={styles.StorePriceCard__price}>
            <span className={styles.StorePriceCard__amount}>
              {hasReactNode(currency) && <span className={styles.StorePriceCard__currency}>{currency}</span>}
              {price}
            </span>
            {hasReactNode(priceNote) && <span className={styles.StorePriceCard__priceNote}>{priceNote}</span>}
          </p>
          {hasReactNode(fulfillment) && (
            <p className={styles.StorePriceCard__fulfillment}>
              <span className={styles.StorePriceCard__fulfillmentText}>{fulfillment}</span>
              <span className={styles.StorePriceCard__fulfillmentIcon}><Icon icon={icons.delivery} size={28} /></span>
            </p>
          )}
        </div>
        {hasReactNode(notice) && <p className={styles.StorePriceCard__notice}>{notice}</p>}
        {open && (
          <div id={`${detailsId}-details`} className={styles.StorePriceCard__details}>
            <div className={styles.StorePriceCard__media}>
              {image
                ? <img className={styles.StorePriceCard__image} src={image.src} alt={image.alt ?? ''} loading="lazy" />
                : <Icon icon={icons.image} size={32} />}
            </div>
            <div className={styles.StorePriceCard__info}>
              <div className={styles.StorePriceCard__heading}>
                <div className={styles.StorePriceCard__titles}>
                  {hasReactNode(category) && <span className={styles.StorePriceCard__category}>{category}</span>}
                  {hasReactNode(productName) && <ProductName className={styles.StorePriceCard__productName}>{productName}</ProductName>}
                </div>
                {save && (
                  <button
                    type="button"
                    className={styles.StorePriceCard__save}
                    aria-label={save.label}
                    aria-pressed={save.pressed}
                    onClick={() => { save.onPressedChange(!save.pressed); }}
                  >
                    <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
                  </button>
                )}
              </div>
              {hasReactNode(brand) && <span className={styles.StorePriceCard__brand}>{brand}</span>}
              {hasReactNode(description) && <span className={styles.StorePriceCard__description}>{description}</span>}
              {payment && (
                <div className={styles.StorePriceCard__payment}>
                  <Icon icon={icons.receipt} size={28} />
                  <p className={styles.StorePriceCard__paymentText}>
                    <strong>{payment.title}</strong>
                    <br />
                    {payment.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {open && orderAction && (
        <Button
          id={`${detailsId}-order`}
          size="small"
          stretched
          iconBefore={<Icon icon={icons.clipboard} size={24} />}
          onClick={orderAction.onClick}
        >
          {orderAction.label}
        </Button>
      )}
      <div className={styles.StorePriceCard__store}>
        {hasReactNode(avatar) && <span className={styles.StorePriceCard__avatar}>{avatar}</span>}
        <div className={styles.StorePriceCard__names}>
          <span className={styles.StorePriceCard__storeName}>{storeName}</span>
          {hasReactNode(address) && <span className={styles.StorePriceCard__address}>{address}</span>}
          {hasReactNode(status) && (
            <span className={clsx(styles.StorePriceCard__status, statusTone === 'negative' && styles.StorePriceCard__status_negative)}>
              {status}
            </span>
          )}
        </div>
        <button
          type="button"
          className={styles.StorePriceCard__toggle}
          aria-label={toggleLabel}
          aria-expanded={open}
          aria-controls={open ? `${detailsId}-details${orderAction ? ` ${detailsId}-order` : ''}` : undefined}
          onClick={() => { onOpenChange(!open); }}
        >
          <Icon icon={open ? icons.chevronUp : icons.chevronDown} size={24} />
        </button>
      </div>
    </article>
  );
});

StorePriceCard.displayName = 'StorePriceCard';
