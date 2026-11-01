import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PriceSummary } from './PriceSummary';

describe('PriceSummary', () => {
  it('mostra as linhas e o total como lista de definição, sem calcular', () => {
    render(<PriceSummary rows={[{ label: 'Subtotal', value: 'R$ 350,00' }, { label: 'Envio', value: 'R$ 0,00' }]} total={{ label: 'Total', value: 'R$ 999,00' }} />);
    expect(screen.getByText('Subtotal').tagName).toBe('DT');
    expect(screen.getByText('R$ 350,00').tagName).toBe('DD');
    expect(screen.getByText('R$ 999,00')).toBeTruthy();
    expect(screen.getAllByRole('term')).toHaveLength(3);
  });
});
