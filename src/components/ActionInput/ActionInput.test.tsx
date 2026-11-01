import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ActionInput } from './ActionInput';

describe('ActionInput', () => {
  it('o botão fica fora do label do campo e avisa o clique', () => {
    const onAction = vi.fn();
    render(<ActionInput label="Cupom" placeholder="Código" actionLabel="Aplicar" onAction={onAction} />);
    const button = screen.getByRole('button', { name: 'Aplicar' });
    expect(button.closest('label')).toBeNull();
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('textbox', { name: 'Cupom' }).getAttribute('placeholder')).toBe('Código');
  });

  it('Enter no campo aciona o botão', () => {
    const onAction = vi.fn();
    render(<ActionInput label="Cupom" actionLabel="Aplicar" onAction={onAction} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
