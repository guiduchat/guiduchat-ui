import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './Notice.module.scss';

export type NoticeTone = 'info' | 'warning' | 'danger';

interface NoticeOwnProps {
  tone?: NoticeTone
  /** Ícone no lugar do padrão do tom (ex.: `<Icon icon={icons.offline} size={20} />` no "sem conexão"). */
  icon?: ReactNode
  /** Ação à direita, por exemplo "Tentar de novo". */
  action?: ReactNode
}

export type NoticeProps = MergeProps<ComponentProps<'div'>, NoticeOwnProps>;

const defaultIcon: Record<NoticeTone, ReactNode> = {
  info: <Icon icon={icons.info} size={20} />,
  warning: <Icon icon={icons.warning} size={20} />,
  danger: <Icon icon={icons.warning} size={20} />
};

/**
 * Faixa de aviso (sem conexão, domínio desconhecido no pagamento). Anuncia
 * ao leitor de tela com `role="status"`; para erro urgente, passe
 * `role="alert"`.
 */
export const Notice = forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
  const { className, tone = 'info', icon, action, children, role = 'status', ...rest } = props;
  return (
    <div
      ref={ref}
      role={role}
      className={clsx(styles.Notice, styles[`Notice_tone_${tone}`], className)}
      {...rest}
    >
      <span className={styles.Notice__icon} aria-hidden>{icon ?? defaultIcon[tone]}</span>
      <div className={styles.Notice__content}>{children}</div>
      {hasReactNode(action) && <div className={styles.Notice__action}>{action}</div>}
    </div>
  );
});

Notice.displayName = 'Notice';
