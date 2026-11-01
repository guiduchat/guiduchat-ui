import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './OrderProgressCard.module.scss';

export interface OrderProgressCardImage {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

interface OrderProgressCardOwnProps {
  /** Situação do pedido em destaque, por exemplo "Aguardando pagamento". */
  status: ReactNode
  /** Código do pedido, por exemplo "Pedido ID: #123456". */
  code?: ReactNode
  /** Quantidade de itens, por exemplo "2 itens". */
  items?: ReactNode
  /** Última atualização, por exemplo "Atualizado em 01/11/26 - 12:00h". O kit põe o calendário. */
  updatedAt?: ReactNode
  /** Foto do pedido. Sem ela, fica uma reserva com ícone. */
  image?: OrderProgressCardImage
  /** Passos do pedido: `<Steps count={4} progress={1} role="img" aria-label="..." />`. Sem ele, a linha não aparece. */
  steps?: ReactNode
  /** Logo da loja, em geral `Avatar.Container` de 44 px em círculo. */
  avatar?: ReactNode
  /** Nome da loja. */
  store?: ReactNode
  /** Categoria da loja, abaixo do nome. */
  category?: ReactNode
  /** Botão do rodapé, em geral `<Button size="small">Ver mais</Button>` (ou `asChild` com o link do app). */
  action?: ReactNode
}

export type OrderProgressCardProps = MergeProps<ComponentProps<'article'>, OrderProgressCardOwnProps>;

/**
 * Pedido em andamento: o cartão de dentro do carrossel "Pedidos em andamento".
 * Sem fundo próprio: vai dentro de um `InfoCard plain` e de um `Carousel`. Textos vêm do app.
 */
export const OrderProgressCard = forwardRef<HTMLElement, OrderProgressCardProps>((props, ref) => {
  const { status, code, items, updatedAt, image, steps, avatar, store, category, action, className, ...rest } = props;
  const hasFooter = hasReactNode(avatar) || hasReactNode(store) || hasReactNode(category) || hasReactNode(action);

  return (
    <article ref={ref} className={clsx(styles.OrderProgressCard, className)} {...rest}>
      <div className={styles.OrderProgressCard__frame}>
        <div className={styles.OrderProgressCard__info}>
          <span className={styles.OrderProgressCard__status}>{status}</span>
          {hasReactNode(code) && <span className={styles.OrderProgressCard__line}>{code}</span>}
          {hasReactNode(items) && <span className={styles.OrderProgressCard__line}>{items}</span>}
        </div>
        {hasReactNode(updatedAt) && (
          <p className={styles.OrderProgressCard__updated}>
            <span>{updatedAt}</span>
            <span className={styles.OrderProgressCard__updatedIcon}><Icon icon={icons.calendar} size={24} /></span>
          </p>
        )}
        <div className={styles.OrderProgressCard__media}>
          {image
            ? <img className={styles.OrderProgressCard__image} src={image.src} alt={image.alt ?? ''} />
            : <Icon icon={icons.image} size={32} />}
        </div>
        {hasReactNode(steps) && <div className={styles.OrderProgressCard__steps}>{steps}</div>}
      </div>
      {hasFooter && (
        <div className={styles.OrderProgressCard__footer}>
          {hasReactNode(avatar) && <span className={styles.OrderProgressCard__avatar}>{avatar}</span>}
          <span className={styles.OrderProgressCard__store}>
            {hasReactNode(store) && <span className={styles.OrderProgressCard__storeName}>{store}</span>}
            {hasReactNode(category) && <span className={styles.OrderProgressCard__category}>{category}</span>}
          </span>
          {hasReactNode(action) && <span className={styles.OrderProgressCard__action}>{action}</span>}
        </div>
      )}
    </article>
  );
});

OrderProgressCard.displayName = 'OrderProgressCard';
