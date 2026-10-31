import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';

import { mergeRefs } from '../../helpers';
import { type MergeProps } from '../../types';
import styles from './Carousel.module.scss';

interface CarouselOwnProps {
  /** One child per page. */
  children: ReactNode
  /** Accessible name of the scroll area, translated by the app. */
  'aria-label': string
  /** Text of the page indicator for screen readers, such as "Page 2 of 3". */
  pagerLabel?: (page: number, total: number) => string
}

export type CarouselProps = MergeProps<ComponentProps<'div'>, CarouselOwnProps>;

/** Side scroll with snap, one page per child, and a bar pager under it (hidden with one page). */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, forwardedRef) => {
  const { children, pagerLabel, className, onKeyDown, ...rest } = props;
  // One page per child; a single child arrives without the array.
  const pages: ReactNode[] = Array.isArray(children) ? children : [children];
  const total = pages.length;
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
  }, [total]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const track = trackRef.current;
    if (!track || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    event.preventDefault();
    track.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * track.clientWidth });
  };

  return (
    <div className={clsx(styles.Carousel, className)}>
      {/* The scroll area takes the keyboard: Tab focuses it and the arrows scroll. */}
      <div
        ref={mergeRefs(trackRef, forwardedRef)}
        role="group"
        aria-roledescription="carousel"
        tabIndex={0}
        className={styles.Carousel__track}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {pages.map((page, index) => (
          <div key={index} className={styles.Carousel__page}>{page}</div>
        ))}
      </div>

      {total > 1 && (
        <div className={styles.Carousel__pager} role="group" aria-label={pagerLabel?.(active + 1, total)}>
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
