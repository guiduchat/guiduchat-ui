import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type AsChildProp, type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './PromptCard.module.scss';

export type PromptCardTone = 'lime' | 'sky' | 'lavender' | 'cream';

interface PromptCardOwnProps extends AsChildProp {
  /** Ícone de 24 px no círculo da esquerda. */
  icon: ReactNode
  /** Título embaixo, em até 2 linhas. */
  title: ReactNode
  /** Cor do cartão. Igual nos dois temas. */
  tone?: PromptCardTone
  children?: ReactNode
}

export type PromptCardProps = MergeProps<Omit<ComponentProps<'button'>, 'title'>, PromptCardOwnProps>;

/**
 * Cartão colorido de frase da página Descubra: ícone à esquerda, seta à direita e título de até 2 linhas.
 * Com `asChild`, vira o link do app. O texto é sempre escuro (`--text-primary-static`) porque o fundo é sempre claro.
 */
export const PromptCard = forwardRef<HTMLButtonElement, PromptCardProps>((props, ref) => {
  const { icon, title, tone = 'lime', asChild = false, children, className, type, ...rest } = props;
  const Root = asChild ? Slot : 'button';
  return (
    <Root
      ref={ref}
      type={asChild ? undefined : (type ?? 'button')}
      data-tone={tone}
      className={clsx(styles.PromptCard, styles[`PromptCard_${tone}`], className)}
      {...rest}
    >
      <span className={styles.PromptCard__top}>
        <span className={styles.PromptCard__circle}>{icon}</span>
        <span className={styles.PromptCard__circle} aria-hidden="true"><Icon icon={icons.arrowUpRight} size={24} /></span>
      </span>
      <Slottable>{children}</Slottable>
      <span className={styles.PromptCard__title}>{title}</span>
    </Root>
  );
});

PromptCard.displayName = 'PromptCard';
