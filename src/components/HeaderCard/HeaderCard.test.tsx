import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeaderCard } from './HeaderCard';

describe('HeaderCard', () => {
  it('o título é h2 por padrão (o h1 da página fica no NavBar)', () => {
    render(<HeaderCard title="Encontre novos locais" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Encontre novos locais' })).toBeTruthy();
  });

  it('titleAs troca o elemento do título', () => {
    render(<HeaderCard title="Locais" titleAs="h1" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Locais' })).toBeTruthy();
  });

  it('a busca e o filtro têm os nomes passados pelo app', () => {
    render(
      <HeaderCard
        title="Encontre novos locais"
        search={{ label: 'Buscar locais' }}
        filter={{ label: 'Filtros', onClick: () => {} }}
      />
    );
    expect(screen.getByRole('searchbox', { name: 'Buscar locais' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Filtros' })).toBeTruthy();
  });
});
