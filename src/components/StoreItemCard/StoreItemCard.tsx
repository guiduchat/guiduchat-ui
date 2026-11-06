import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode, useId } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { type PriceCardImage, type PriceCardSave } from '../ProductPriceCard';
import { type StorePriceCardOrderAction, type StorePriceCardPayment } from '../StorePriceCard';
import styles from './StoreItemCard.module.scss';

interface StoreItemCardOwnProps {
  /** Foto do item, em moldura fixa de 100x175 (corta para preencher). Sem ela, fica uma reserva com ícone. */
  image?: PriceCardImage
  /** Categoria, acima do nome, como "Moda Praia". */
  category?: ReactNode
  /** Nome do item. Três linhas no máximo. */
  name: ReactNode
  /** Elemento do nome. `h3` por padrão. */
  nameAs?: ElementType
  /** Botão de salvar, à direita do nome. */
  save?: PriceCardSave
  /** Descrição, como "Tamanhos disponíveis P, M e G. Verifique a disponibilidade no chat.". */
  description?: ReactNode
  /** Texto de entrega ao lado do ícone, como "Retirada ou\nentrega". */
  fulfillment?: ReactNode
  /** Legenda do preço, como "a partir de:". */
  priceLabel?: ReactNode
  /** Símbolo da moeda, como "R$". */
  currency?: ReactNode
  /** Preço do item, como "240". Vem formatado do app; o kit não calcula. */
  price: ReactNode
  /** Só no estado aberto: pílula de aviso, como "Preço não inclui frete. Atualizado em 04/11/2026 12:30.". */
  notice?: ReactNode
  /** Só no estado aberto: formas de pagamento. */
  payment?: StorePriceCardPayment
  /** Só no estado aberto: botão largo de pedido. */
  orderAction?: StorePriceCardOrderAction
  /** Logo da loja, em geral `Avatar.Container form="squircle" size={48}`. */
  avatar?: ReactNode
  /** Nome da loja. */
  storeName: ReactNode
  /** Endereço da loja. */
  address?: ReactNode
  /** Situação da loja, como "Aberto até 22h.". Vem pronta do servidor. */
  status?: ReactNode
  /** Cor da situação: `positive` (padrão) ou `negative`. */
  statusTone?: 'positive' | 'negative'
  /** Estado aberto. Controlado: o app decide quem fica aberto (um por vez). */
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Nome acessível do botão de seta, traduzido pelo app. */
  toggleLabel: string
}

export type StoreItemCardProps = MergeProps<ComponentProps<'article'>, StoreItemCardOwnProps>;

/**
 * Item de uma loja (produto não padronizado), com dois estados. Fechado: foto, nome, descrição, entrega,
 * preço e a faixa da loja com a seta. Aberto: acrescenta o aviso de frete, o pagamento e o botão de pedido;
 * a seta aponta para cima. O estado é controlado (`open` e `onOpenChange`). Só apresentação.
 */
export const StoreItemCard = forwardRef<HTMLElement, StoreItemCardProps>((props, ref) => {
  const {
    image, category, name, nameAs: Name = 'h3', save, description, fulfillment, priceLabel, currency, price, notice,
    payment, orderAction, avatar, storeName, address, status, statusTone = 'positive', open, onOpenChange,
    toggleLabel, className, ...rest
  } = props;
  const detailsId = useId();
  const hasMore = open && (hasReactNode(notice) || payment !== undefined);

  return (
    <article ref={ref} className={clsx(styles.StoreItemCard, className)} {...rest}>
      <div className={styles.StoreItemCard__body}>
        <div className={styles.StoreItemCard__top}>
          <div className={styles.StoreItemCard__media}>
            {image
              ? <img className={styles.StoreItemCard__image} src={image.src} alt={image.alt ?? ''} loading="lazy" />
              : <Icon icon={icons.image} size={32} />}
          </div>
          <div className={styles.StoreItemCard__info}>
            <div className={styles.StoreItemCard__heading}>
              <div className={styles.StoreItemCard__titles}>
                {hasReactNode(category) && <span className={styles.StoreItemCard__category}>{category}</span>}
                <Name className={styles.StoreItemCard__name}>{name}</Name>
              </div>
              {save && (
                <button
                  type="button"
                  className={styles.StoreItemCard__save}
                  aria-label={save.label}
                  aria-pressed={save.pressed}
                  onClick={() => { save.onPressedChange(!save.pressed); }}
                >
                  <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
                </button>
              )}
            </div>
            {hasReactNode(description) && <p className={styles.StoreItemCard__description}>{description}</p>}
            <div className={styles.StoreItemCard__priceRow}>
              {hasReactNode(fulfillment) && (
                <p className={styles.StoreItemCard__fulfillment}>
                  <span className={styles.StoreItemCard__fulfillmentIcon}><Icon icon={icons.delivery} size={24} /></span>
                  <span className={styles.StoreItemCard__fulfillmentText}>{fulfillment}</span>
                </p>
              )}
              <p className={styles.StoreItemCard__price}>
                {hasReactNode(priceLabel) && <span className={styles.StoreItemCard__priceLabel}>{priceLabel}</span>}
                <span className={styles.StoreItemCard__amount}>
                  {hasReactNode(currency) && <span className={styles.StoreItemCard__currency}>{currency}</span>}
                  {price}
                </span>
              </p>
            </div>
          </div>
        </div>
        {hasMore && (
          <div id={`${detailsId}-details`} className={styles.StoreItemCard__more}>
            {hasReactNode(notice) && <p className={styles.StoreItemCard__notice}>{notice}</p>}
            {payment && (
              <div className={styles.StoreItemCard__payment}>
                <Icon icon={icons.receipt} size={28} />
                <p className={styles.StoreItemCard__paymentText}>
                  <strong>{payment.title}</strong>
                  <br />
                  {payment.text}
                </p>
              </div>
            )}
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
      <div className={styles.StoreItemCard__store}>
        {hasReactNode(avatar) && <span className={styles.StoreItemCard__avatar}>{avatar}</span>}
        <div className={styles.StoreItemCard__names}>
          <span className={styles.StoreItemCard__storeName}>{storeName}</span>
          {hasReactNode(address) && <span className={styles.StoreItemCard__address}>{address}</span>}
          {hasReactNode(status) && (
            <span className={clsx(styles.StoreItemCard__status, statusTone === 'negative' && styles.StoreItemCard__status_negative)}>
              {status}
            </span>
          )}
        </div>
        <button
          type="button"
          className={styles.StoreItemCard__toggle}
          aria-label={toggleLabel}
          aria-expanded={open}
          aria-controls={open ? `${hasMore ? `${detailsId}-details ` : ''}${orderAction ? `${detailsId}-order` : ''}`.trim() || undefined : undefined}
          onClick={() => { onOpenChange(!open); }}
        >
          <Icon icon={open ? icons.chevronUp : icons.chevronDown} size={24} />
        </button>
      </div>
    </article>
  );
});

StoreItemCard.displayName = 'StoreItemCard';
