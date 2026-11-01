import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CartItemCard } from './CartItemCard';

describe('CartItemCard', () => {
  it('sem foto mostra a reserva e não cria imagem', () => {
    render(<CartItemCard name="Pizza" price="R$ 35,00" />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('Pizza')).toBeTruthy();
    expect(screen.getByText('R$ 35,00')).toBeTruthy();
  });

  it('com foto usa o alt do app e mostra variante e quantidade', () => {
    render(<CartItemCard name="Pizza" detail="Grande" image={{ src: 'a.jpg', alt: 'Pizza' }} stepper={<i data-testid="stepper" />} />);
    expect(screen.getByRole('img', { name: 'Pizza' }).getAttribute('src')).toBe('a.jpg');
    expect(screen.getByText('Grande')).toBeTruthy();
    expect(screen.getByTestId('stepper')).toBeTruthy();
  });
});
