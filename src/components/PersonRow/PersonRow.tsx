import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './PersonRow.module.scss';

interface PersonRowOwnProps {
  /** Normalmente um `Avatar.Container`. */
  avatar?: ReactNode
  name: ReactNode
  /** Linha menor, por exemplo a placa. */
  detail?: ReactNode
  /** Botões redondos, por exemplo conversar e ligar. */
  actions?: ReactNode
  /** `large`: nome de 20 px e detalhe de 16 px, como no ContactCard. `regular` por padrão. */
  textSize?: 'regular' | 'large'
}

export type PersonRowProps = MergeProps<ComponentProps<'div'>, PersonRowOwnProps>;

/** Uma pessoa com os botões de contato, por exemplo quem faz a entrega. */
export const PersonRow = forwardRef<HTMLDivElement, PersonRowProps>((props, ref) => {
  const { avatar, name, detail, actions, textSize = 'regular', className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.PersonRow, textSize === 'large' && styles.PersonRow_large, className)} {...rest}>
      {hasReactNode(avatar) && <span className={styles.PersonRow__avatar}>{avatar}</span>}
      <div className={styles.PersonRow__text}>
        <p className={styles.PersonRow__name}>{name}</p>
        {hasReactNode(detail) && <p className={styles.PersonRow__detail}>{detail}</p>}
      </div>
      {hasReactNode(actions) && <div className={styles.PersonRow__actions}>{actions}</div>}
    </div>
  );
});

PersonRow.displayName = 'PersonRow';
