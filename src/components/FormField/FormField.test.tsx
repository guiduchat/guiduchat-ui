import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GuiduUI } from '../GuiduUI';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { FormField } from './FormField';

describe('FormField', () => {
  it('liga rótulo e erro ao campo', () => {
    render(
      <GuiduUI colorScheme="light" platform="android">
        <FormField label="Nome" error="Preencha o nome">
          <Input />
        </FormField>
      </GuiduUI>
    );
    const field = screen.getByRole('textbox', { name: 'Nome' });
    const error = screen.getByRole('alert');
    expect(error.textContent).toBe('Preencha o nome');
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(field.getAttribute('aria-describedby')).toBe(error.id);
  });
});

describe('PasswordInput', () => {
  it('mostra e esconde a senha', () => {
    const { container } = render(
      <GuiduUI colorScheme="light" platform="android">
        <PasswordInput showLabel="Mostrar senha" hideLabel="Esconder senha" />
      </GuiduUI>
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(input.type).toBe('text');
    fireEvent.click(screen.getByRole('button', { name: 'Esconder senha' }));
    expect(input.type).toBe('password');
  });
});
