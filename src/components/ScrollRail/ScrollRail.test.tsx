import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollRail } from './ScrollRail';

const items = ['a', 'b', 'c', 'd', 'e'].map((id) => <span key={id} data-testid="item">{id}</span>);

describe('ScrollRail', () => {
  it('tem o nome dado pelo app', () => {
    render(<ScrollRail aria-label="Sugestões">{items}</ScrollRail>);
    expect(screen.getByRole('group', { name: 'Sugestões' })).toBeTruthy();
  });

  it('com uma fileira, todos os itens ficam juntos', () => {
    const { container } = render(<ScrollRail aria-label="x">{items}</ScrollRail>);
    expect(container.querySelectorAll('[class*="ScrollRail__row"]').length).toBe(1);
    expect(screen.getAllByTestId('item').length).toBe(5);
  });

  it('com rows=2, reparte os filhos em duas fileiras (3 e 2)', () => {
    const { container } = render(<ScrollRail aria-label="x" rows={2}>{items}</ScrollRail>);
    const rows = container.querySelectorAll('[class*="ScrollRail__row"]');
    expect(rows.length).toBe(2);
    expect(rows[0].children.length).toBe(3);
    expect(rows[1].children.length).toBe(2);
  });
});
