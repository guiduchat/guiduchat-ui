import { HugeiconsIcon } from '@hugeicons/react';
import { type ComponentProps, forwardRef } from 'react';

import { type IconData } from '../../icons/catalog';

export interface IconProps extends Omit<ComponentProps<'svg'>, 'ref'> {
  /** Um item do catálogo (`icons.search`, `icons.cart`...). */
  icon: IconData
  /** Tamanho em px; 24 por padrão. */
  size?: number
  /** Espessura do traço; 1,5 por padrão (direção visual). */
  strokeWidth?: number
  /**
   * Nome para o leitor de tela, traduzido pelo app. Sem ele, o ícone é
   * decorativo (`aria-hidden`), como quando há texto ao lado.
   */
  label?: string
}

/** Ícone do kit (Hugeicons): 24 px, traço 1,5 e a cor do texto em volta. */
export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { icon, size = 24, strokeWidth = 1.5, label, color = 'currentColor', ...rest } = props;
  return (
    <HugeiconsIcon
      ref={ref}
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      focusable="false"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...rest}
    />
  );
});

Icon.displayName = 'Icon';
