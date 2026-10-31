import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OfferPrice } from './OfferPrice';

describe('OfferPrice', () => {
  it('mostra o preço antigo riscado, com o rótulo do app', () => {
    const { container } = render(<OfferPrice price="R$ 89,90" originalPrice="R$ 119,90" originalPriceLabel="Preço original" />);
    expect(screen.getByText('R$ 89,90')).toBeTruthy();
    const old = screen.getByText('R$ 119,90');
    expect(old.tagName).toBe('S');
    expect(container.textContent).toContain('Preço original');
  });

  it('sem preço antigo não há risco nem rótulo', () => {
    const { container } = render(<OfferPrice price="R$ 89,90" originalPriceLabel="Preço original" />);
    expect(container.querySelector('s')).toBeNull();
    expect(container.textContent).toBe('R$ 89,90');
  });
});
