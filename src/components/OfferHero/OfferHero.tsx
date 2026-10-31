import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { icons } from '../../icons/catalog';
import { type MergeProps } from '../../types';
import { Icon } from '../Icon';
import { type OfferCardImage, type OfferCardToggle } from '../OfferCard';
import styles from './OfferHero.module.scss';

interface OfferHeroOwnProps {
  /** Foto da oferta. Sem ela, fica um fundo de token, sem imagem quebrada. */
  image?: OfferCardImage
  /** Botão salvar (marcador) no canto superior direito. Mesmo formato do `OfferCard`. */
  save?: OfferCardToggle
}

export type OfferHeroProps = MergeProps<ComponentProps<'div'>, OfferHeroOwnProps>;

/** Foto da página da oferta, com o raio do cartão externo e o botão salvar no canto. */
export const OfferHero = forwardRef<HTMLDivElement, OfferHeroProps>((props, ref) => {
  const { image, save, className, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.OfferHero, className)} {...rest}>
      {image && <img className={styles.OfferHero__image} src={image.src} alt={image.alt} />}
      {save && (
        <button
          type="button"
          className={styles.OfferHero__save}
          aria-label={save.label}
          aria-pressed={save.pressed}
          onClick={() => { save.onPressedChange(!save.pressed); }}
        >
          <Icon icon={save.pressed ? icons.saved : icons.save} size={24} />
        </button>
      )}
    </div>
  );
});

OfferHero.displayName = 'OfferHero';
