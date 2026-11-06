import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductSummary } from './ProductSummary';
import { ProductSummarySkeleton } from './ProductSummarySkeleton';

describe('ProductSummary', () => {
  it('mostra categoria, nome, selo, legenda e preço', () => {
    render(
      <ProductSummary
        category="Cervejas"
        name="Cerveja Corona Extra Long Neck 330ml"
        discount={(
          <>
            {'Descontos de até '}
            <strong>35%</strong>
          </>
        )}
        priceLabel="A partir de:"
        currency="R$"
        price="7,80"
      />
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Cerveja Corona Extra Long Neck 330ml' })).toBeTruthy();
    for (const text of ['Cervejas', '35%', 'A partir de:', 'R$', '7,80']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('sem desconto não há selo', () => {
    const { container } = render(<ProductSummary name="Produto" price="1,00" />);
    expect(container.innerHTML).not.toMatch(/ProductSummary__badge/);
  });

  it('o esqueleto usa as classes do componente', () => {
    const { container } = render(<ProductSummarySkeleton />);
    expect(container.innerHTML).toMatch(/ProductSummary__titles/);
    expect(container.innerHTML).toMatch(/ProductSummary__price/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
