import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FilterTags } from './FilterTags';
import { FilterTagsSkeleton } from './FilterTagsSkeleton';

const tags = [
  { id: 'all', label: 'Todas' },
  { id: 'unread', label: 'Não lidas' }
];

describe('FilterTags', () => {
  it('é um grupo com nome e só a tag ativa fica pressionada', () => {
    render(<FilterTags label="Filtrar conversas" tags={tags} value="all" onValueChange={() => {}} />);
    expect(screen.getByRole('group', { name: 'Filtrar conversas' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Todas' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Não lidas' }).getAttribute('aria-pressed')).toBe('false');
  });

  it('tocar numa tag avisa o id', () => {
    const onValueChange = vi.fn();
    render(<FilterTags label="Filtrar" tags={tags} value="all" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Não lidas' }));
    expect(onValueChange).toHaveBeenCalledWith('unread');
  });

  it('o botão + só aparece com `add`, com o nome do app', () => {
    const onClick = vi.fn();
    const { rerender } = render(<FilterTags label="Filtrar" tags={tags} value="all" onValueChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Nova lista' })).toBeNull();
    rerender(<FilterTags label="Filtrar" tags={tags} value="all" onValueChange={() => {}} add={{ label: 'Nova lista', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Nova lista' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('FilterTagsSkeleton', () => {
  it('é só desenho, escondido do leitor de tela', () => {
    const { container } = render(<FilterTagsSkeleton />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
