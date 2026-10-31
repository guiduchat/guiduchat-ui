import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type MergeProps } from '../../types';
import styles from './ValidityBanner.module.scss';

export type ValidityBannerProps = MergeProps<ComponentProps<'div'>, object>;

/** Faixa de largura total com a validade da oferta, como "Oferta válida até: 30/11/2026". O texto vem do app. */
export const ValidityBanner = forwardRef<HTMLDivElement, ValidityBannerProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} className={clsx(styles.ValidityBanner, className)} {...rest}>
      {children}
    </div>
  );
});

ValidityBanner.displayName = 'ValidityBanner';
