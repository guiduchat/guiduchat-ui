import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SearchChip } from './SearchChip';

describe('SearchChip', () => {
  it('é um botão com o termo e avisa o clique', () => {
    const onClick = vi.fn();
    render(<SearchChip icon={<svg />} onClick={onClick}>Chopp duplo</SearchChip>);
    fireEvent.click(screen.getByRole('button', { name: 'Chopp duplo' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('com asChild vira o link do app, com o termo como nome', () => {
    render(
      <SearchChip asChild icon={<svg />}>
        <a href="/q">Dentista 24h</a>
      </SearchChip>
    );
    expect(screen.getByRole('link', { name: 'Dentista 24h' }).getAttribute('href')).toBe('/q');
  });
});
