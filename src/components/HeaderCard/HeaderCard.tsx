import { clsx } from 'clsx';
import { type ChangeEventHandler, type ComponentProps, type FormEventHandler, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { Icon16SearchOutline, Icon24Filter } from '../../icons';
import { type InnerClassNamesProp, type MergeProps } from '../../types';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import styles from './HeaderCard.module.scss';

export type HeaderCardInnerElementKey = 'top' | 'avatar' | 'greeting' | 'title' | 'search' | 'input' | 'filter';

export interface HeaderCardSearch {
  value?: string
  defaultValue?: string
  placeholder?: string
  /** Accessible name of the search field; the kit has no texts of its own. */
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Called when the person presses Enter or the search key on the keyboard. */
  onSubmit?: (value: string) => void
}

export interface HeaderCardFilter {
  /** Accessible name of the filter button. */
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  /** Marks the button when filters are applied. */
  active?: boolean
}

interface HeaderCardOwnProps {
  /** Usually an `Avatar.Container` with the person photo or initials. */
  avatar?: ReactNode
  /** Short line next to the avatar, such as "Olá, João!". */
  greeting?: ReactNode
  /** Main sentence of the page, such as "Encontre novos locais ou continue a conversa." */
  title: ReactNode
  search?: HeaderCardSearch
  filter?: HeaderCardFilter
  innerClassNames?: InnerClassNamesProp<HeaderCardInnerElementKey>
}

export type HeaderCardProps = MergeProps<ComponentProps<'section'>, HeaderCardOwnProps>;

export const HeaderCard = forwardRef<HTMLElement, HeaderCardProps>((props, forwardedRef) => {
  const { avatar, greeting, title, search, filter, className, innerClassNames, ...rest } = props;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('q') as HTMLInputElement | null;
    search?.onSubmit?.(input?.value ?? '');
  };

  return (
    <section ref={forwardedRef} className={clsx(styles.HeaderCard, className)} {...rest}>
      {(hasReactNode(avatar) || hasReactNode(greeting)) && (
        <div className={clsx(styles.HeaderCard__top, innerClassNames?.top)}>
          {hasReactNode(avatar) && <span className={clsx(styles.HeaderCard__avatar, innerClassNames?.avatar)}>{avatar}</span>}
          {hasReactNode(greeting) && <span className={clsx(styles.HeaderCard__greeting, innerClassNames?.greeting)}>{greeting}</span>}
        </div>
      )}

      <h1 className={clsx(styles.HeaderCard__title, innerClassNames?.title)}>{title}</h1>

      {(search || filter) && (
        <form
          role="search"
          className={clsx(styles.HeaderCard__search, innerClassNames?.search)}
          onSubmit={handleSubmit}
        >
          {search && (
            <Input
              name="q"
              type="search"
              enterKeyHint="search"
              size="large"
              aria-label={search.label}
              placeholder={search.placeholder}
              value={search.value}
              defaultValue={search.defaultValue}
              onChange={search.onChange}
              iconBefore={<Icon16SearchOutline width={20} height={20} />}
              className={styles.HeaderCard__input}
              innerClassNames={{ container: clsx(styles.HeaderCard__inputContainer, innerClassNames?.input) }}
            />
          )}

          {filter && (
            <IconButton
              type="button"
              size="small"
              variant={filter.active ? 'neutral' : 'secondary'}
              className={clsx(styles.HeaderCard__filter, innerClassNames?.filter)}
              aria-label={filter.label}
              aria-pressed={filter.active ?? false}
              onClick={filter.onClick}
            >
              <Icon24Filter />
            </IconButton>
          )}
        </form>
      )}
    </section>
  );
});

HeaderCard.displayName = 'HeaderCard';
