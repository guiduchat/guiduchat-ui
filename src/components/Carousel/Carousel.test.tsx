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
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
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

  it('ignora false, null e undefined e achata listas aninhadas ao contar as páginas', () => {
    render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        {false}
        {null}
        {undefined}
        <p>a</p>
        {[<p key="b">b</p>, [<p key="c">c</p>, null]]}
      </Carousel>
    );
    expect(screen.getByRole('group', { name: 'Ofertas' }).children).toHaveLength(3);
    expect(screen.getByRole('group', { name: 'Página 1 de 3' })).toBeTruthy();
  });

  it('um fragmento conta como uma página', () => {
    render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        <>
          <p>a</p>
          <p>b</p>
        </>
        <p>c</p>
      </Carousel>
    );
    expect(screen.getByRole('group', { name: 'Página 1 de 2' })).toBeTruthy();
  });

  it('sem filhos válidos não mostra a área focável nem o marcador', () => {
    const { container } = render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        {false}
        {null}
      </Carousel>
    );
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole('group')).toBeNull();
  });

  it('não rola com tecla modificadora', () => {
    render(
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        <p>a</p>
        <p>b</p>
      </Carousel>
    );
    const track = screen.getByRole('group', { name: 'Ofertas' });
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy as unknown as typeof track.scrollBy;
    fireEvent.keyDown(track, { key: 'ArrowLeft', altKey: true });
    fireEvent.keyDown(track, { key: 'ArrowRight', metaKey: true });
    expect(scrollBy).not.toHaveBeenCalled();
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    expect(scrollBy).toHaveBeenCalledWith({ left: -track.clientWidth });
  });

  it('className, id e style vão para a raiz e o nome acessível fica na área de rolagem', () => {
    const { container } = render(
      <Carousel aria-label="Ofertas" pagerLabel={pager} id="ofertas" className="x" style={{ width: 10 }}>
        <p>a</p>
      </Carousel>
    );
    const root = container.firstElementChild as HTMLElement;
    const track = screen.getByRole('group', { name: 'Ofertas' });
    expect(root.id).toBe('ofertas');
    expect(root.classList.contains('x')).toBe(true);
    expect(root.style.width).toBe('10px');
    expect(track).not.toBe(root);
    expect(track.hasAttribute('aria-roledescription')).toBe(false);
  });
});
