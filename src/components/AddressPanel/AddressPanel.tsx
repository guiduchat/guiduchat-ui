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
  address?: ReactNode
  /** Observação de quem pediu, com o ícone de anotação. */
  note?: ReactNode
}

export type AddressPanelProps = MergeProps<ComponentProps<'div'>, AddressPanelOwnProps>;

/** Quadro interno com o endereço de entrega ou de retirada. */
export const AddressPanel = forwardRef<HTMLDivElement, AddressPanelProps>((props, ref) => {
  const { title, address, note, children, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.AddressPanel, className)} {...rest}>
      <IconTile><Icon icon={icons.location} /></IconTile>
      <div className={styles.AddressPanel__text}>
        <p className={styles.AddressPanel__title}>{title}</p>
        {hasReactNode(address) && <p className={styles.AddressPanel__address}>{address}</p>}
        {hasReactNode(note) && (
          <p className={styles.AddressPanel__note}>
            <Icon icon={icons.note} size={20} />
            <span>{note}</span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
});

AddressPanel.displayName = 'AddressPanel';
