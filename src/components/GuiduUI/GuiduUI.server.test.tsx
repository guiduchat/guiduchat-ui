// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { GuiduUI } from './GuiduUI';

// No Next.js o GuiduUI também renderiza no servidor, onde não há window nem
// navigator (U6 do guidu-chat).
describe('GuiduUI no servidor', () => {
  it('renderiza sem window, com o tema e a plataforma vindos do servidor', () => {
    expect(typeof window).toBe('undefined');
    const html = renderToString(
      <GuiduUI colorScheme="light" platform="ios">conteúdo</GuiduUI>
    );
    expect(html).toContain('conteúdo');
    expect(html).toMatch(/colorScheme_light/);
  });

  it('renderiza sem window mesmo sem props', () => {
    expect(() => renderToString(<GuiduUI>conteúdo</GuiduUI>)).not.toThrow();
  });
});
