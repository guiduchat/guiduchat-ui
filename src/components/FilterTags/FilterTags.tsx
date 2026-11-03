import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './FilterTags.module.scss';

export interface FilterTagItem {
  id: string
  label: ReactNode
}

export interface FilterTagsAdd {
  /** Nome acessível do botão "+", traduzido pelo app (por exemplo "Nova lista"). */
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

interface FilterTagsOwnProps {
  /** Nome do grupo para o leitor de tela, traduzido pelo app (por exemplo "Filtrar conversas"). */
  label: string
  tags: FilterTagItem[]
  /** Tag ativa. Seleção única: sempre uma. */
  value: string
  onValueChange: (id: string) => void
  /** Botão "+" no fim da fileira. Sem ele, não aparece. */
  add?: FilterTagsAdd
}

export type FilterTagsProps = MergeProps<Omit<ComponentProps<'div'>, 'children'>, FilterTagsOwnProps>;

/**
 * Fileira de tags que filtram uma lista, com seleção única e botão "+" opcional no fim. Cada tag tem
 * 24 px de altura e raio de 8 px; a ativa usa a cor da marca. Rola na horizontal, sem barra, se não couber.
 * Acessibilidade: grupo com nome e cada tag com `aria-pressed`. Escolhi isso em vez de radiogroup porque
 * as tags são botões comuns no Tab (sem teclas de seta a aprender) e o leitor de tela anuncia "pressionado".
 */
export const FilterTags = forwardRef<HTMLDivElement, FilterTagsProps>((props, ref) => {
  const { label, tags, value, onValueChange, add, className, ...rest } = props;
  return (
    <div ref={ref} role="group" aria-label={label} className={clsx(styles.FilterTags, className)} {...rest}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          className={clsx(styles.FilterTags__tag, tag.id === value && styles.FilterTags__tag_active)}
          aria-pressed={tag.id === value}
          onClick={() => { onValueChange(tag.id); }}
        >
          {tag.label}
        </button>
      ))}
      {add && (
        <button type="button" className={clsx(styles.FilterTags__tag, styles.FilterTags__add)} aria-label={add.label} onClick={add.onClick}>
          <Icon icon={icons.add} size={16} />
        </button>
      )}
    </div>
  );
});

FilterTags.displayName = 'FilterTags';
