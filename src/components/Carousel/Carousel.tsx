import { clsx } from 'clsx';
import { Children, type ComponentProps, forwardRef, isValidElement, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';

import { type MergeProps } from '../../types';
import styles from './Carousel.module.scss';

interface CarouselOwnProps {
  /**
   * One child per page. Arrays are flattened, and `null`, `undefined`, booleans
   * (such as the result of `cond && <X />`) and empty strings are dropped. A fragment counts as one page.
   */
  children: ReactNode
  /** Accessible name of the scroll area (the keyboard stop), translated by the app. */
  'aria-label': string
  /** Text of the page indicator for screen readers, such as "Page 2 of 3". Required: the kit has no texts of its own. */
  pagerLabel: (page: number, total: number) => string
  /**
   * A página é mais estreita que a trilha, com um vão entre elas, e a ponta da próxima aparece.
   * Pensado para ficar dentro de um cartão de 12 px de margem (`InfoCard plain`): a trilha sai 12 px
   * pela direita, até a borda do cartão, e a rolagem da própria trilha corta a próxima página ali
   * (nada vaza e a página não rola de lado).
   */
  peek?: boolean
  /** Cor da barrinha ativa: `neutral` (padrão, cor do texto) ou `accent` (verde da marca). */
  pagerTone?: 'neutral' | 'accent'
}

/**
 * `className`, `style`, `id`, `ref` and the other props go to the root.
 * `aria-label`, `aria-labelledby` and `onKeyDown` belong to the scroll area (the focusable element).
 */
export type CarouselProps = MergeProps<ComponentProps<'div'>, CarouselOwnProps>;

// `Children.toArray` flattens arrays, drops `null`, `undefined` and booleans, and scopes each key
// to its origin and position, so repeated ids in two lists never collide and `cond && <A />`
// does not remount its sibling. A fragment stays whole, as one page. Empty strings would render
// as blank pages, so they are dropped too.
// eslint-disable-next-line @eslint-react/no-children-to-array -- the only API that scopes keys by origin and position
const toPages = (children: ReactNode): ReactNode[] => Children.toArray(children).filter((child) => child !== '');

const pageKey = (page: ReactNode, index: number): string =>
  isValidElement(page) && page.key !== null ? `k:${page.key}` : `i:${index}`;

/** Side scroll with snap, one page per child, and a bar pager under it (hidden with one page). */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, forwardedRef) => {
  const { children, pagerLabel, peek = false, pagerTone = 'neutral', className, onKeyDown, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...rest } = props;
  const pages = toPages(children);
  const total = pages.length;
  const keys = pages.map(pageKey).join('|');
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The active page is the one that fills most of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || total < 2 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const index = Array.prototype.indexOf.call(track.children, entry.target);
          if (index >= 0) setActive(index);
        }
      }
    }, { root: track, threshold: [0.6] });

    for (const child of track.children) observer.observe(child);
    return () => { observer.disconnect(); };
  }, [total, keys]);

  if (total === 0) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const track = trackRef.current;
    if (!track || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    event.preventDefault();
    // Com `peek`, a página é menor que a trilha: anda de página em página, não de trilha em trilha.
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    const pageStep = peek && first && second ? second.offsetLeft - first.offsetLeft : 0;
    track.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * (pageStep || track.clientWidth) });
  };

  return (
    <div ref={forwardedRef} className={clsx(styles.Carousel, peek && styles.Carousel_peek, className)} {...rest}>
      {/* The scroll area takes the keyboard: Tab focuses it and the arrows scroll. */}
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        tabIndex={0}
        className={clsx(styles.Carousel__track, peek && styles.Carousel__track_peek)}
        onKeyDown={handleKeyDown}
      >
        {pages.map((page, index) => (
          <div key={pageKey(page, index)} className={styles.Carousel__page}>{page}</div>
        ))}
      </div>

      {total > 1 && (
        <div className={clsx(styles.Carousel__pager, pagerTone === 'accent' && styles.Carousel__pager_accent)} role="group" aria-label={pagerLabel(active + 1, total)}>
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={clsx(styles.Carousel__bar, index === active && styles.Carousel__bar_active)}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';
