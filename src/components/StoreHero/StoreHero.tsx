import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { icons } from '../../icons';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import styles from './StoreHero.module.scss';

export interface StoreHeroCover {
  src: string
  /** Texto alternativo; vazio quando a foto é só decorativa. */
  alt?: string
}

export interface StoreHeroToggle {
  /** Nome para o leitor de tela, traduzido pelo app. */
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

interface StoreHeroOwnProps {
  /** Foto de capa. Sem ela, o fundo é `accent`. */
  cover?: StoreHeroCover
  /** Cor de destaque da loja, vinda da API (exceção da U5). */
  accent?: string
  /** Logo sobreposta à capa, em geral `Avatar.Container` de 96 px. */
  avatar: ReactNode
  /** Nome da loja. */
  title: ReactNode
  /** Elemento do nome. `h2` por padrão: o `h1` costuma estar no `NavBar`. */
  titleAs?: ElementType
  /** Linha da categoria. */
  subtitle?: ReactNode
  /** Botão salvar, no canto da capa. */
  save?: StoreHeroToggle
  /** Selo sobre a capa, em geral o `ScoreBadge`. */
  badge?: ReactNode
  /** Botão à direita da logo, abaixo da capa, por exemplo Seguir. O app passa o `Button`. */
  action?: ReactNode
  /** Faixa depois da categoria, em geral o `ProfileStats`. */
  stats?: ReactNode
}

export type StoreHeroProps = MergeProps<ComponentProps<'section'>, StoreHeroOwnProps>;

/** Topo do perfil da loja: capa, logo sobreposta, nome e categoria. */
export const StoreHero = forwardRef<HTMLElement, StoreHeroProps>((props, ref) => {
  const { cover, accent, avatar, title, titleAs: Title = 'h2', subtitle, save, badge, action, stats, className, ...rest } = props;
  return (
    <section ref={ref} className={clsx(styles.StoreHero, className)} {...rest}>
      <div className={styles.StoreHero__cover} style={cover ? undefined : { background: accent }}>
        {cover && <img className={styles.StoreHero__image} src={cover.src} alt={cover.alt ?? ''} />}
        {save && (
          <button
            type="button"
            className={styles.StoreHero__save}
            aria-label={save.label}
            aria-pressed={save.pressed}
            onClick={() => save.onPressedChange(!save.pressed)}
          >
            <Icon icon={save.pressed ? icons.saved : icons.save} />
          </button>
        )}
        {hasReactNode(badge) && <div className={styles.StoreHero__badge}>{badge}</div>}
      </div>
      <div className={styles.StoreHero__row}>
        <div className={styles.StoreHero__avatar}>{avatar}</div>
        {hasReactNode(action) && <div className={styles.StoreHero__action}>{action}</div>}
      </div>
      <Title className={styles.StoreHero__title}>{title}</Title>
      {hasReactNode(subtitle) && <p className={styles.StoreHero__subtitle}>{subtitle}</p>}
      {hasReactNode(stats) && <div className={styles.StoreHero__stats}>{stats}</div>}
    </section>
  );
});

StoreHero.displayName = 'StoreHero';
