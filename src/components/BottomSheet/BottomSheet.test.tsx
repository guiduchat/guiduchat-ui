import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BottomSheet } from './BottomSheet';

const mockReducedMotion = (reduce: boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
    onchange: null
  })) as unknown as typeof window.matchMedia;
};

const Harness = ({ title = 'Cupom', ...rest }: { title?: string | undefined; handleLabel?: string; label?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>abrir</button>
      <BottomSheet open={open} title={title} aria-label={rest.label} handleLabel={rest.handleLabel} onClose={() => setOpen(false)}>
        <button type="button">um</button>
        <button type="button">dois</button>
      </BottomSheet>
    </>
  );
};

beforeEach(() => {
  vi.useFakeTimers();
  mockReducedMotion(false);
  document.body.style.overflow = '';
});
afterEach(() => {
  vi.useRealTimers();
});

const press = (name: string) => act(() => { fireEvent.click(screen.getByRole('button', { name })); });
const escape = () => act(() => { fireEvent.keyDown(document, { key: 'Escape' }); });

describe('BottomSheet: saída garantida', () => {
  it.each([60, 120, 200])('fechar %i ms depois de abrir (sem transitionend) desmonta e solta o scroll', (ms) => {
    render(<Harness />);
    press('abrir');
    expect(document.body.style.overflow).toBe('hidden');
    act(() => { vi.advanceTimersByTime(ms); });
    // Fechar durante a animação de entrada: o navegador só emitiria animationcancel.
    escape();
    expect(screen.queryByRole('dialog')).not.toBeNull();
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('com movimento reduzido fecha sem esperar', () => {
    mockReducedMotion(true);
    render(<Harness />);
    press('abrir');
    escape();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('limpa o scroll do corpo ao desmontar durante a saída', () => {
    const { unmount } = render(<Harness />);
    press('abrir');
    escape();
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('BottomSheet: diálogo', () => {
  it('tem role, aria-modal e nome pelo título', () => {
    render(<Harness />);
    press('abrir');
    const dialog = screen.getByRole('dialog', { name: 'Cupom' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('sem título usa a prop aria-label', () => {
    render(<Harness title="" label="Detalhes" />);
    press('abrir');
    expect(screen.getByRole('dialog', { name: 'Detalhes' })).toBeTruthy();
  });

  it('move o foco para dentro, prende o Tab e devolve ao gatilho', () => {
    render(<Harness handleLabel="Arraste para baixo para fechar" />);
    const trigger = screen.getByRole('button', { name: 'abrir' });
    trigger.focus();
    press('abrir');
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);

    const handle = screen.getByRole('button', { name: 'Arraste para baixo para fechar' });
    const last = screen.getByRole('button', { name: 'dois' });
    last.focus();
    fireEvent.keyDown(last, { key: 'Tab' });
    expect(document.activeElement).toBe(handle);
    fireEvent.keyDown(handle, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);

    escape();
    act(() => { vi.advanceTimersByTime(400); });
    expect(document.activeElement).toBe(trigger);
  });

  it('não tira o foco de quem já o moveu para dentro', () => {
    const Own = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>abrir</button>
          <BottomSheet open={open} title="X" onClose={() => setOpen(false)}>
            <input aria-label="campo" ref={(el) => el?.focus()} />
          </BottomSheet>
        </>
      );
    };
    render(<Own />);
    press('abrir');
    expect(document.activeElement).toBe(screen.getByLabelText('campo'));
  });
});

describe('BottomSheet: textos', () => {
  it('sem handleLabel a alça fica fora da árvore de acessibilidade e não há texto fixo', () => {
    render(<Harness />);
    press('abrir');
    const handle = document.querySelector('[aria-hidden="true"]');
    expect(handle).not.toBeNull();
    expect(handle?.hasAttribute('aria-label')).toBe(false);
    expect(handle?.hasAttribute('tabindex')).toBe(false);
    expect(document.body.innerHTML).not.toMatch(/[Ѐ-ӿ]/);
  });

  it('usa o rótulo da prop', () => {
    render(<Harness handleLabel="Arraste" />);
    press('abrir');
    expect(screen.getByRole('button', { name: 'Arraste' }).getAttribute('tabindex')).toBe('0');
  });
});

describe('BottomSheet: arrasto curto', () => {
  const drag = (handle: HTMLElement, dy: number) => {
    handle.setPointerCapture = () => {};
    handle.releasePointerCapture = () => {};
    fireEvent.pointerDown(handle, { clientY: 0, pointerId: 1, button: 0, pointerType: 'touch' });
    fireEvent.pointerMove(handle, { clientY: dy, pointerId: 1, pointerType: 'touch' });
    fireEvent.pointerUp(handle, { clientY: dy, pointerId: 1, pointerType: 'touch' });
  };

  it('abaixo do limite, o clique seguinte na película ainda fecha', () => {
    render(<Harness handleLabel="Arraste" />);
    press('abrir');
    const handle = screen.getByRole('button', { name: 'Arraste' });
    drag(handle, 40);
    fireEvent.click(handle); // o clique do fim do gesto para na folha (stopPropagation)
    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement);
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('mesmo sem clique na folha, a supressão expira', () => {
    render(<Harness handleLabel="Arraste" />);
    press('abrir');
    drag(screen.getByRole('button', { name: 'Arraste' }), 40);
    act(() => { vi.advanceTimersByTime(400); });
    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement);
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
