import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { SwipeActions, type SwipeActionsProps } from './SwipeActions';

const WIDTH = 120;

// O jsdom não calcula layout: as ações "medem" 120 px.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => WIDTH });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const setup = (over: Partial<SwipeActionsProps> = {}) => {
  const onOpenChange = vi.fn();
  const onSave = vi.fn();
  render(
    <SwipeActions
      open={false}
      onOpenChange={onOpenChange}
      actions={[
        { id: 'save', label: 'Salvar', icon: <i />, tone: 'primary', onClick: onSave },
        { id: 'delete', label: 'Excluir', icon: <i />, onClick: () => {} }
      ]}
      {...over}
    >
      {over.children ?? <div data-testid="row">Linha</div>}
    </SwipeActions>
  );
  const row = screen.getByRole('button', { name: 'Salvar' }).parentElement?.nextElementSibling as HTMLElement;
  const move = (to: { x: number, y: number }) => {
    fireEvent.pointerDown(row, { clientX: 300, clientY: 100, pointerId: 1, pointerType: 'touch' });
    fireEvent.pointerMove(row, { clientX: 300 + to.x, clientY: 100 + to.y, pointerId: 1, pointerType: 'touch' });
    fireEvent.pointerUp(row, { clientX: 300 + to.x, clientY: 100 + to.y, pointerId: 1, pointerType: 'touch' });
  };
  return { row, move, onOpenChange, onSave };
};

describe('SwipeActions', () => {
  it('arrasto horizontal além do limiar abre a linha', () => {
    const { move, onOpenChange } = setup();
    move({ x: -60, y: 2 });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('arrasto horizontal curto não abre', () => {
    const { move, onOpenChange } = setup();
    move({ x: -20, y: 0 });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('o eixo vertical não mexe na linha: a rolagem da página fica livre', () => {
    const { row, move, onOpenChange } = setup();
    move({ x: -10, y: 60 });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(row.style.transform).toBe('translateX(0px)');
  });

  it('aberta, arrastar para a direita fecha', () => {
    const { move, onOpenChange } = setup({ open: true });
    move({ x: 60, y: 0 });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('o clique que termina o arrasto não aciona nada dentro da linha', () => {
    const onInside = vi.fn();
    const { row, move } = setup({ children: <button type="button" onClick={onInside}>Dentro</button> });
    move({ x: -60, y: 0 });
    fireEvent.click(row.querySelector('button') as HTMLElement);
    expect(onInside).not.toHaveBeenCalled();
  });

  it('foco por teclado numa ação abre a linha', () => {
    const { onOpenChange } = setup();
    screen.getByRole('button', { name: 'Excluir' }).focus();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('fechada, as ações não recebem ponteiro; aberta, recebem', () => {
    const actions = [{ id: 'a', label: 'A', icon: <i />, onClick: () => {} }];
    const { rerender } = render(<SwipeActions open={false} onOpenChange={() => {}} actions={actions}>x</SwipeActions>);
    const wrapper = screen.getByRole('button', { name: 'A' }).parentElement as HTMLElement;
    expect(wrapper.className).not.toMatch(/actions_open/);
    rerender(<SwipeActions open onOpenChange={() => {}} actions={actions}>x</SwipeActions>);
    expect(wrapper.className).toMatch(/actions_open/);
  });

  it('Escape fecha a linha aberta', () => {
    const { row, onOpenChange } = setup({ open: true });
    fireEvent.keyDown(row, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
