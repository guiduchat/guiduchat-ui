import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Carousel } from './Carousel';

type Callback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;
let callback: Callback | undefined;
const disconnect = vi.fn();
const observed = new Set<Element>();

beforeEach(() => {
  disconnect.mockClear();
  observed.clear();
  class FakeObserver {
    constructor (cb: Callback) { callback = cb; }
    observe = (element: Element) => { observed.add(element); };
    disconnect = () => { observed.clear(); disconnect(); };
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

  describe('observador e chaves', () => {
    const list = (ids: string[]) => (
      <Carousel aria-label="Ofertas" pagerLabel={pager}>
        {ids.map((id) => <p key={id}>{id}</p>)}
      </Carousel>
    );
    const watching = () => {
      const track = screen.getByRole('group', { name: 'Ofertas' });
      return Array.from(track.children).filter((child) => observed.has(child)).length;
    };

    it('troca todas as chaves com a mesma contagem e volta a observar as páginas novas', () => {
      const { rerender } = render(list(['a', 'b', 'c']));
      expect(watching()).toBe(3);
      rerender(list(['d', 'e', 'f']));
      expect(watching()).toBe(3);
    });

    it('troca parcial das chaves com a mesma contagem também reobserva', () => {
      const { rerender } = render(list(['a', 'b', 'c']));
      rerender(list(['a', 'b', 'd']));
      expect(watching()).toBe(3);
    });

    it('chaves repetidas em listas irmãs não geram chave duplicada', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      render(
        <Carousel aria-label="Ofertas" pagerLabel={pager}>
          {[1, 2].map((id) => (
            <p key={id}>
              a
              {id}
            </p>
          ))}
          {[1, 2].map((id) => (
            <p key={id}>
              b
              {id}
            </p>
          ))}
        </Carousel>
      );
      expect(screen.getByRole('group', { name: 'Ofertas' }).children).toHaveLength(4);
      expect(error).not.toHaveBeenCalled();
      error.mockRestore();
    });

    it('um condicional antes do filho não remonta o filho quando muda', () => {
      let mounts = 0;
      const Child = () => {
        useEffect(() => { mounts += 1; }, []);
        return <p>b</p>;
      };
      const ui = (show: boolean) => (
        <Carousel aria-label="Ofertas" pagerLabel={pager}>
          {show && <p>a</p>}
          <Child />
        </Carousel>
      );
      const { rerender } = render(ui(false));
      rerender(ui(true));
      expect(mounts).toBe(1);
    });

    it('string vazia não cria página em branco', () => {
      render(
        <Carousel aria-label="Ofertas" pagerLabel={pager}>
          {''}
          <p>a</p>
        </Carousel>
      );
      expect(screen.getByRole('group', { name: 'Ofertas' }).children).toHaveLength(1);
    });
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

  describe('peek e pagerTone', () => {
    it('sem os props novos não muda nada: nenhuma classe extra', () => {
      const { container } = render(
        <Carousel aria-label="Ofertas" pagerLabel={pager}>
          <p>a</p>
          <p>b</p>
        </Carousel>
      );
      expect(container.innerHTML).not.toMatch(/peek|accent/);
    });

    it('com peek marca a raiz e a trilha, e a página ativa continua seguindo o observador', () => {
      const { container } = render(
        <Carousel aria-label="Pedidos" pagerLabel={pager} peek pagerTone="accent">
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </Carousel>
      );
      expect(container.firstElementChild?.className).toMatch(/Carousel_peek/);
      expect(screen.getByRole('group', { name: 'Pedidos' }).className).toMatch(/track_peek/);
      expect(screen.getByRole('group', { name: 'Página 1 de 3' }).className).toMatch(/pager_accent/);
      const track = screen.getByRole('group', { name: 'Pedidos' });
      // Com peek a página vizinha aparece pela metade (abaixo de 0,6): não vira a ativa.
      callback?.([{ isIntersecting: true, intersectionRatio: 0.5, target: track.children[1] }]);
      expect(screen.getByRole('group', { name: 'Página 1 de 3' })).toBeTruthy();
      callback?.([{ isIntersecting: true, intersectionRatio: 1, target: track.children[2] }]);
      return screen.findByRole('group', { name: 'Página 3 de 3' });
    });

    it('com peek as setas andam uma página, não a largura da trilha', () => {
      render(
        <Carousel aria-label="Pedidos" pagerLabel={pager} peek>
          <p>a</p>
          <p>b</p>
        </Carousel>
      );
      const track = screen.getByRole('group', { name: 'Pedidos' });
      Object.defineProperty(track.children[1], 'offsetLeft', { value: 300 });
      const scrollBy = vi.fn();
      track.scrollBy = scrollBy as unknown as typeof track.scrollBy;
      fireEvent.keyDown(track, { key: 'ArrowRight' });
      expect(scrollBy).toHaveBeenCalledWith({ left: 300 });
      fireEvent.keyDown(track, { key: 'ArrowLeft' });
      expect(scrollBy).toHaveBeenLastCalledWith({ left: -300 });
    });
  });
});
