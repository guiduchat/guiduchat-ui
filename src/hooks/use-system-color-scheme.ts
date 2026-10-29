import { useEffect, useState } from 'react';

type SystemColorScheme = 'light' | 'dark';

interface Params {
  // Falso quando o tema vem por prop (do servidor, no Next.js): não lê nem
  // escuta o navegador.
  enabled?: boolean
  listenChanges?: boolean
}

const QUERY = '(prefers-color-scheme: dark)';

// No servidor não há window; o tema certo chega por prop (U6 do guidu-chat).
const readSystemColorScheme = (): SystemColorScheme => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia(QUERY).matches ? 'dark' : 'light';
};

export const useSystemColorScheme = (params: Params = {}): SystemColorScheme => {
  const { enabled = true, listenChanges } = params;
  const [colorScheme, setColorScheme] = useState<SystemColorScheme>(
    () => (enabled ? readSystemColorScheme() : 'light')
  );

  useEffect(() => {
    if (!enabled) return undefined;

    const mediaQuery = window.matchMedia(QUERY);
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    if (!listenChanges) return undefined;

    const handleSchemeChanged = (event: MediaQueryListEvent): void => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleSchemeChanged);
    return () => {
      mediaQuery.removeEventListener('change', handleSchemeChanged);
    };
  }, [enabled, listenChanges]);

  return colorScheme;
};
