import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import styles from './AddressPanel.module.scss';

interface AddressPanelOwnProps {
  /** Nome do lugar, por exemplo "Pousada Flor do Mar". */
  title: ReactNode
  /** Slot na mesma linha do nome, à direita dele (por exemplo o link "Alterar endereço"). Quebra para a linha de baixo se faltar espaço. */
  titleAction?: ReactNode
  address?: ReactNode
  /** Observação de quem pediu, com o ícone de anotação. */
  note?: ReactNode
  /**
   * Tira a caixa do ícone: o pino fica direto ao lado do nome, na cor de destaque, e o endereço
   * (e o restante) alinha à esquerda, sob o pino. Falso por padrão.
   */
  plainIcon?: boolean
}

export type AddressPanelProps = MergeProps<ComponentProps<'div'>, AddressPanelOwnProps>;

/** Quadro interno com o endereço de entrega ou de retirada. */
export const AddressPanel = forwardRef<HTMLDivElement, AddressPanelProps>((props, ref) => {
  const { title, titleAction, address, note, plainIcon = false, children, className, ...rest } = props;

  const name = <p className={styles.AddressPanel__title}>{title}</p>;
  const heading = hasReactNode(titleAction)
    ? (
      <div className={styles.AddressPanel__titleRow}>
        {name}
        <span className={styles.AddressPanel__titleAction}>{titleAction}</span>
      </div>
    )
    : name;

  const details = (
    <>
      {hasReactNode(address) && <p className={styles.AddressPanel__address}>{address}</p>}
      {hasReactNode(note) && (
        <p className={styles.AddressPanel__note}>
          <Icon icon={icons.note} size={20} />
          <span>{note}</span>
        </p>
      )}
      {children}
    </>
  );

  if (plainIcon) {
    return (
      <div ref={ref} className={clsx(styles.AddressPanel, styles.AddressPanel_plainIcon, className)} {...rest}>
        <div className={styles.AddressPanel__header}>
          <span className={styles.AddressPanel__pin}><Icon icon={icons.location} /></span>
          {heading}
        </div>
        {details}
      </div>
    );
  }

  return (
    <div ref={ref} className={clsx(styles.AddressPanel, className)} {...rest}>
      <IconTile><Icon icon={icons.location} /></IconTile>
      <div className={styles.AddressPanel__text}>
        {heading}
        {details}
      </div>
    </div>
  );
});

AddressPanel.displayName = 'AddressPanel';
