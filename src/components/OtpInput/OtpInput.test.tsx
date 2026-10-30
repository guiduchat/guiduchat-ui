import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField';
import { OtpInput } from './OtpInput';

const Otp = ({ onComplete }: { onComplete?: (value: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <FormField label="Código">
      <OtpInput value={value} onChange={setValue} onComplete={onComplete} />
    </FormField>
  );
};

describe('OtpInput', () => {
  it('aceita colar, só com dígitos, e avisa ao completar', () => {
    const onComplete = vi.fn();
    render(<Otp onComplete={onComplete} />);
    const field = screen.getByRole('textbox', { name: 'Código' }) as HTMLInputElement;

    fireEvent.change(field, { target: { value: '12-34 56789' } });

    expect(field.value).toBe('123456');
    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('apagar não dispara o aviso e tira o dígito do quadrado', () => {
    const onComplete = vi.fn();
    const { container } = render(<Otp onComplete={onComplete} />);
    const field = screen.getByRole('textbox', { name: 'Código' });

    fireEvent.change(field, { target: { value: '123' } });
    fireEvent.change(field, { target: { value: '12' } });

    expect(onComplete).not.toHaveBeenCalled();
    expect(container.querySelector('[aria-hidden]')?.textContent).toBe('12');
  });

  it('pede o preenchimento automático e o teclado numérico', () => {
    render(<Otp />);
    const field = screen.getByRole('textbox', { name: 'Código' });
    expect(field.getAttribute('autocomplete')).toBe('one-time-code');
    expect(field.getAttribute('inputmode')).toBe('numeric');
  });
});
