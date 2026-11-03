import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('é um campo de busca com nome acessível e avisa o que se digita', () => {
    const onChange = vi.fn();
    render(<SearchField aria-label="Buscar conversas" placeholder="Buscar" onChange={onChange} />);
    const input = screen.getByRole('searchbox', { name: 'Buscar conversas' });
    fireEvent.change(input, { target: { value: 'padaria' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('repassa as props do input para montar um combobox', () => {
    render(
      <SearchField
        type="text"
        role="combobox"
        aria-label="Empresas"
        aria-expanded
        aria-controls="lista"
        aria-activedescendant="opcao-1"
      />
    );
    const input = screen.getByRole('combobox', { name: 'Empresas' });
    expect(input.getAttribute('aria-controls')).toBe('lista');
    expect(input.getAttribute('aria-activedescendant')).toBe('opcao-1');
  });
});
