import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Carousel } from './Carousel';

type Callback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;
let callback: Callback | undefined;
const disconnect = vi.fn();

beforeEach(() => {
  disconnect.mockClear();
  class FakeObserver {
    constructor (cb: Callback) { callback = cb; }
    observe = vi.fn();
    disconnect = disconnect;
  }
  vi.stubGlobal('IntersectionObserver', FakeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  callback = undefined;
});

const pager = (page: number, total: number) => `Página ${page} de ${total}`;

describe('Carousel', () => {
  it('com três páginas mostra o marcador, com a página ativa e o nome para o leitor de tela', () => {
    render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        <p>a</p>
        <p>b</p>
        <p>c</p>
      </Carousel>
    );
    const group = screen.getByRole('group', { name: 'Página 1 de 3' });
    expect(group.querySelectorAll('[aria-current="true"]')).toHaveLength(1);
    expect(group.children).toHaveLength(3);
  });

  it('com um item só o marcador some', () => {
    render(<Carousel aria-label="Ofertas" pagerLabel={pager}><p>a</p></Carousel>);
    expect(screen.queryByRole('group', { name: /Página/ })).toBeNull();
  });

  it('a página ativa acompanha o que aparece na tela', () => {
    render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        <p>a</p>
        <p>b</p>
        <p>c</p>
      </Carousel>
    );
    const track = screen.getByRole('group', { name: 'Ofertas' });
    callback?.([{ isIntersecting: true, intersectionRatio: 1, target: track.children[1] }]);
    return screen.findByRole('group', { name: 'Página 2 de 3' });
  });

  it('é focável pelo teclado, as setas rolam e o observador sai no unmount', () => {
    const { unmount } = render(
      <Carousel aria-label="Ofertas">
        <p>a</p>
        <p>b</p>
      </Carousel>
    );
    const track = screen.getByRole('group', { name: 'Ofertas' });
    expect(track.getAttribute('tabindex')).toBe('0');
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy as unknown as typeof track.scrollBy;
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(scrollBy).toHaveBeenCalledWith({ left: track.clientWidth });
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
