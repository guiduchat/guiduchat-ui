import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InfoCard } from './InfoCard';

describe('InfoCard', () => {
  it('com seeAll mostra o link ao lado do título', () => {
    render(<InfoCard title="Favoritos" seeAll={<a href="/places?tab=favorites">Ver todas</a>} plain><p>x</p></InfoCard>);
    const heading = screen.getByRole('heading', { name: 'Favoritos' });
    const link = screen.getByRole('link', { name: 'Ver todas' });
    expect(heading.parentElement).toBe(link.parentElement?.parentElement);
  });

  it('sem seeAll o título fica como sempre, sem o cabeçalho extra', () => {
    const { container } = render(<InfoCard title="Contato"><p>x</p></InfoCard>);
    expect(container.innerHTML).not.toMatch(/InfoCard__header|InfoCard__seeAll|withSeeAll/);
    expect(screen.getByRole('heading', { name: 'Contato' }).parentElement?.tagName).toBe('SECTION');
  });

  it('sem título o seeAll não aparece', () => {
    render(<InfoCard seeAll={<a href="/x">Ver todas</a>}><p>x</p></InfoCard>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
