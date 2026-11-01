import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GuiduUI } from './GuiduUI';

afterEach(() => vi.restoreAllMocks());

describe('GuiduUI', () => {
  it('com tema e plataforma por prop, não consulta o navegador', () => {
    const matchMedia = vi.fn();
    vi.stubGlobal('matchMedia', matchMedia);
    const { container } = render(
      <GuiduUI colorScheme="dark" platform="android">conteúdo</GuiduUI>
    );
    expect(matchMedia).not.toHaveBeenCalled();
    expect(container.firstElementChild?.className).toMatch(/colorScheme_dark/);
    expect(container.firstElementChild?.className).toMatch(/platform_android/);
    vi.unstubAllGlobals();
  });

  it('o ator é hub por padrão e vira data-actor na raiz', () => {
    const { container, rerender } = render(<GuiduUI colorScheme="light" platform="ios">a</GuiduUI>);
    expect(container.firstElementChild?.getAttribute('data-actor')).toBe('hub');
    rerender(<GuiduUI colorScheme="light" platform="ios" actor="guidu">a</GuiduUI>);
    expect(container.firstElementChild?.getAttribute('data-actor')).toBe('guidu');
  });
});
