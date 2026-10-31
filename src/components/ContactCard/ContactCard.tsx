import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './ContactCard.module.scss';

interface ContactCardOwnProps {
  /** Normalmente um `Avatar.Container`. */
  avatar?: ReactNode
  name: ReactNode
  /** Elemento do nome. `h2` por padrão. */
  nameAs?: ElementType
  /** Linha menor, por exemplo "@flordebuzios". */
  handle?: ReactNode
  address?: ReactNode
  /** Os botões do app, por exemplo Obter Rota e Abrir Chat. */
  actions?: ReactNode
}

export type ContactCardProps = MergeProps<ComponentProps<'section'>, ContactCardOwnProps>;

/** Quem atende o pedido: logo, nome, endereço e os botões de contato. */
export const ContactCard = forwardRef<HTMLElement, ContactCardProps>((props, ref) => {
  const { avatar, name, nameAs: Name = 'h2', handle, address, actions, className, ...rest } = props;
  return (
    <section ref={ref} className={clsx(styles.ContactCard, className)} {...rest}>
      <div className={styles.ContactCard__top}>
        {hasReactNode(avatar) && <span className={styles.ContactCard__avatar}>{avatar}</span>}
        <div className={styles.ContactCard__names}>
          <Name className={styles.ContactCard__name}>{name}</Name>
          {hasReactNode(handle) && <p className={styles.ContactCard__handle}>{handle}</p>}
        </div>
      </div>
      {hasReactNode(address) && (
        <p className={styles.ContactCard__address}>
          <Icon className={styles.ContactCard__icon} icon={icons.location} />
          <span>{address}</span>
        </p>
      )}
      {hasReactNode(actions) && <div className={styles.ContactCard__actions}>{actions}</div>}
    </section>
  );
});

ContactCard.displayName = 'ContactCard';
