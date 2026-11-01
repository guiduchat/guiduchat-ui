import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('status coupon mostra o texto do app com a classe própria', () => {
    render(<StatusBadge text="uso individual" status="coupon" />);
    expect(screen.getByText('uso individual').className).toContain('coupon');
  });
});
