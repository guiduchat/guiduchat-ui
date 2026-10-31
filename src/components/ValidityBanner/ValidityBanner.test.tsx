import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ValidityBanner } from './ValidityBanner';

describe('ValidityBanner', () => {
  it('mostra o texto do app e repassa atributos', () => {
    render(<ValidityBanner data-testid="faixa">Oferta válida até: 30/11/2026</ValidityBanner>);
    expect(screen.getByText('Oferta válida até: 30/11/2026')).toBeTruthy();
    expect(screen.getByTestId('faixa')).toBeTruthy();
  });
});
