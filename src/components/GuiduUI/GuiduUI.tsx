import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useMemo } from 'react';

import { isIos } from '../../helpers';
import { useSystemColorScheme } from '../../hooks';
import { type ActorType } from '../../types';
import styles from './GuiduUI.module.scss';
import { GuiduUIContext, type GuiduUIContextInterface } from './GuiduUIContext';

export interface GuiduUIProps extends Partial<GuiduUIContextInterface> {
  children: ComponentProps<'div'>['children']
  className?: ComponentProps<'div'>['className']
  resetBody?: boolean
  /**
   * Ator do visual dos cartões. `hub` (padrão): cartão de fora mais escuro e o de dentro mais claro.
   * `guidu`: o contrário. Vira `data-actor` na raiz; um `data-actor` em qualquer elemento de dentro
   * troca o ator só daquela parte da tela.
   */
  actor?: ActorType
}

export const GuiduUI = forwardRef<HTMLDivElement, GuiduUIProps>((props, ref) => {
  const {
    children,
    className,
    colorScheme: colorSchemeProp,
    platform: platformProp,
    actor = 'hub',
    resetBody = false
  } = props;

  // Tema e plataforma vindos do servidor (props) não são detectados no
  // navegador: evita a tela piscar e a diferença entre servidor e cliente.
  const systemColorScheme = useSystemColorScheme({
    enabled: !colorSchemeProp,
    listenChanges: !colorSchemeProp
  });
  const colorScheme = colorSchemeProp ?? systemColorScheme;
  const platform = platformProp ?? (isIos() ? 'ios' : 'android');

  const config = useMemo<GuiduUIContextInterface>(() => ({
    colorScheme,
    platform
  }), [colorScheme, platform]);

  useEffect(() => {
    if (!resetBody) return;

    document.body.classList.add(styles.GuiduUI_resetBody);

    return () => {
      document.body.classList.remove(styles.GuiduUI_resetBody);
    };
  }, [resetBody]);

  const rootClassName = clsx(
    styles.GuiduUI,
    styles[`GuiduUI_colorScheme_${colorScheme}`],
    styles[`GuiduUI_platform_${platform}`],
    className
  );

  return (
    <GuiduUIContext.Provider value={config}>
      <div ref={ref} className={rootClassName} data-actor={actor}>
        {children}
      </div>
    </GuiduUIContext.Provider>
  );
});

GuiduUI.displayName = 'GuiduUI';
