import { act, fireEvent, render, screen } from '@testing-library/react';
import { type ReactNode, useState } from 'react';
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

describe('BottomSheet: lista de focáveis e Tab por posição', () => {
  const Sheet = ({ children }: { children: ReactNode }) => (
    <BottomSheet open title="X" enableDrag={false} onClose={() => {}}>{children}</BottomSheet>
  );
  const tab = (el: Element, shiftKey = false) => {
    const notPrevented = fireEvent.keyDown(el, { key: 'Tab', shiftKey });
    return !notPrevented;
  };

  it('Shift+Tab com o foco num filho tabIndex={-1} antes do primeiro botão vai ao último', () => {
    render(
      <Sheet>
        <div tabIndex={-1} data-testid="alvo">cupom</div>
        <button type="button">um</button>
        <button type="button">dois</button>
      </Sheet>
    );
    const alvo = screen.getByTestId('alvo');
    alvo.focus();
    expect(tab(alvo, true)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'dois' }));
  });

  it('Tab com o foco em elemento tabIndex={-1} antes do primeiro botão segue o fluxo nativo', () => {
    render(
      <Sheet>
        <div tabIndex={-1} data-testid="alvo">cupom</div>
        <button type="button">um</button>
      </Sheet>
    );
    const alvo = screen.getByTestId('alvo');
    alvo.focus();
    expect(tab(alvo)).toBe(false);
  });

  it('Tab com o foco em elemento tabIndex={-1} depois do último item volta ao primeiro', () => {
    render(
      <Sheet>
        <button type="button">um</button>
        <button type="button">dois</button>
        <div tabIndex={-1} data-testid="alvo">fim</div>
      </Sheet>
    );
    const alvo = screen.getByTestId('alvo');
    alvo.focus();
    expect(tab(alvo)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'um' }));
  });

  it('Shift+Tab com o foco em elemento tabIndex={-1} depois do último item não é desviado', () => {
    render(
      <Sheet>
        <button type="button">um</button>
        <div tabIndex={-1} data-testid="alvo">fim</div>
      </Sheet>
    );
    const alvo = screen.getByTestId('alvo');
    alvo.focus();
    expect(tab(alvo, true)).toBe(false);
  });

  it('ignora tabIndex negativo, desativados, fieldset desativado e ocultos', () => {
    render(
      <Sheet>
        <button type="button" tabIndex={-1}>neg</button>
        <button type="button">primeiro</button>
        <button type="button" disabled>off</button>
        <fieldset disabled><input aria-label="fs" /></fieldset>
        <div hidden><button type="button">oculto</button></div>
        <div style={{ display: 'none' }}><button type="button">none</button></div>
        <button type="button" style={{ visibility: 'hidden' }}>invisivel</button>
        <button type="button">ultimo</button>
        <button type="button" tabIndex={-1}>neg2</button>
      </Sheet>
    );
    const ultimo = screen.getByRole('button', { name: 'ultimo' });
    ultimo.focus();
    expect(tab(ultimo)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'primeiro' }));
    expect(tab(document.activeElement as Element, true)).toBe(true);
    expect(document.activeElement).toBe(ultimo);
  });

  it('grupo de rádio entra no Tab só pelo marcado', () => {
    render(
      <Sheet>
        <button type="button">antes</button>
        <input type="radio" name="g" aria-label="r1" />
        <input type="radio" name="g" aria-label="r2" defaultChecked />
        <input type="radio" name="g" aria-label="r3" />
      </Sheet>
    );
    const r2 = screen.getByLabelText('r2');
    r2.focus();
    // r2 é o último focável: Tab volta ao primeiro; Shift+Tab em 'antes' vai ao r2.
    expect(tab(r2)).toBe(true);
    const antes = screen.getByRole('button', { name: 'antes' });
    expect(document.activeElement).toBe(antes);
    expect(tab(antes, true)).toBe(true);
    expect(document.activeElement).toBe(r2);
  });

  it('sem rádio marcado, só o primeiro do grupo entra no Tab', () => {
    render(
      <Sheet>
        <input type="radio" name="h" aria-label="a" />
        <input type="radio" name="h" aria-label="b" />
      </Sheet>
    );
    const a = screen.getByLabelText('a');
    a.focus();
    expect(tab(a)).toBe(true);
    expect(document.activeElement).toBe(a);
  });

  it('foco no body: Tab vai ao primeiro item e Shift+Tab ao último', () => {
    render(
      <Sheet>
        <button type="button">um</button>
        <button type="button">dois</button>
      </Sheet>
    );
    (document.activeElement as HTMLElement).blur();
    expect(document.activeElement).toBe(document.body);
    expect(tab(document.body)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'um' }));
    (document.activeElement as HTMLElement).blur();
    expect(tab(document.body, true)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'dois' }));
  });

  it('foco em botão fora da folha: Tab vai ao primeiro e Shift+Tab ao último', () => {
    render(
      <>
        <button type="button">fundo</button>
        <Sheet>
          <button type="button">um</button>
          <button type="button">dois</button>
        </Sheet>
      </>
    );
    const fundo = screen.getByRole('button', { name: 'fundo', hidden: true });
    fundo.focus();
    expect(tab(fundo)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'um' }));
    fundo.focus();
    expect(tab(fundo, true)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'dois' }));
  });

  it('sem focáveis: foco fora vai à folha; foco dentro não é movido', () => {
    render(
      <>
        <button type="button">fundo</button>
        <Sheet><p>texto longo</p></Sheet>
      </>
    );
    const sheet = screen.getByRole('dialog');
    const fundo = screen.getByRole('button', { name: 'fundo', hidden: true });
    fundo.focus();
    expect(tab(fundo)).toBe(true);
    expect(document.activeElement).toBe(sheet);
    const antes = document.activeElement;
    expect(tab(sheet, true)).toBe(true);
    expect(document.activeElement).toBe(antes);
  });

  it('durante exiting não captura o Tab', () => {
    render(<Harness />);
    press('abrir');
    escape();
    expect(screen.queryByRole('dialog')).not.toBeNull();
    const abrir = screen.getByRole('button', { name: 'abrir', hidden: true });
    abrir.focus();
    expect(tab(abrir)).toBe(false);
    expect(document.activeElement).toBe(abrir);
  });

  it('o primeiro legend de fieldset desativado continua focável; o segundo não', () => {
    render(
      <Sheet>
        <button type="button">antes</button>
        <fieldset disabled>
          <legend><input aria-label="no-legend" /></legend>
          <legend><input aria-label="legend2" /></legend>
          <input aria-label="corpo" />
        </fieldset>
      </Sheet>
    );
    const noLegend = screen.getByLabelText('no-legend');
    noLegend.focus();
    expect(tab(noLegend)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'antes' }));
    expect(tab(document.activeElement as Element, true)).toBe(true);
    expect(document.activeElement).toBe(noLegend);
  });

  it('ignora itens sob aria-hidden e inert', () => {
    render(
      <Sheet>
        <button type="button">primeiro</button>
        <div aria-hidden="true"><button type="button">escondido</button></div>
        <div inert><button type="button">inerte</button></div>
      </Sheet>
    );
    const primeiro = screen.getByRole('button', { name: 'primeiro' });
    primeiro.focus();
    expect(tab(primeiro)).toBe(true);
    expect(document.activeElement).toBe(primeiro);
  });
});
