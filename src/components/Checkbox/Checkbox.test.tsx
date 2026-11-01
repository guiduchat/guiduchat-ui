import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('é uma caixa nativa nomeada pelo rótulo', () => {
    render(<Checkbox label="Aceito" />);
    const box = screen.getByRole('checkbox', { name: 'Aceito' }) as HTMLInputElement;
    expect(box.type).toBe('checkbox');
    expect(box.checked).toBe(false);
  });

  it('clicar no rótulo marca e avisa a mudança', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Aceito" onChange={onChange} />);
    fireEvent.click(screen.getByText('Aceito'));
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('desabilitada não muda', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Aceito" disabled onChange={onChange} />);
    fireEvent.click(screen.getByText('Aceito'));
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});
