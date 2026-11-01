import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { QuantityStepper, type QuantityStepperProps } from './QuantityStepper';

const base = (over: Partial<QuantityStepperProps> = {}): QuantityStepperProps => ({
  value: 2,
  label: 'Quantidade',
  incrementLabel: 'Mais',
  decrementLabel: 'Menos',
  onIncrement: () => {},
  onDecrement: () => {},
  ...over
});

describe('QuantityStepper', () => {
  it('mostra o valor e avisa mais e menos', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    render(<QuantityStepper {...base({ onIncrement, onDecrement })} />);
    expect(screen.getByRole('group', { name: 'Quantidade' }).textContent).toContain('2');
    fireEvent.click(screen.getByRole('button', { name: 'Mais' }));
    fireEvent.click(screen.getByRole('button', { name: 'Menos' }));
    expect(onIncrement).toHaveBeenCalledTimes(1);
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('no mínimo o menos fica desabilitado, e no máximo o mais', () => {
    const { rerender } = render(<QuantityStepper {...base({ value: 1, min: 1, max: 5 })} />);
    expect((screen.getByRole('button', { name: 'Menos' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Mais' }) as HTMLButtonElement).disabled).toBe(false);
    rerender(<QuantityStepper {...base({ value: 5, min: 1, max: 5 })} />);
    expect((screen.getByRole('button', { name: 'Mais' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Menos' }) as HTMLButtonElement).disabled).toBe(false);
  });

  it('desabilitado trava os dois', () => {
    render(<QuantityStepper {...base({ disabled: true })} />);
    expect(screen.getAllByRole('button').every((b) => (b as HTMLButtonElement).disabled)).toBe(true);
  });
});
