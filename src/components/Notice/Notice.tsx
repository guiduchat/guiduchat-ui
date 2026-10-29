import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { Icon20Info, Icon20Warning } from '../../icons';
import { type MergeProps } from '../../types';
import styles from './Notice.module.scss';

export type NoticeTone = 'info' | 'warning' | 'danger';

interface NoticeOwnProps {
  tone?: NoticeTone
  /** Ícone no lugar do padrão do tom (ex.: `Icon20WifiSlash` no "sem conexão"). */
  icon?: ReactNode
  /** Ação à direita, por exemplo "Tentar de novo". */
  action?: ReactNode
}

export type NoticeProps = MergeProps<ComponentProps<'div'>, NoticeOwnProps>;

const defaultIcon: Record<NoticeTone, ReactNode> = {
  info: <Icon20Info />,
  warning: <Icon20Warning />,
  danger: <Icon20Warning />
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
