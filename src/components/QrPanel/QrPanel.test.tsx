import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { QrPanel } from './QrPanel';

describe('QrPanel', () => {
  it('mostra o QR com o nome do app e chama a ação', () => {
    const onClick = vi.fn();
    render(<QrPanel value="GUIDU-7K3Q-92XM" qrLabel="QR do cupom" action={{ label: 'Imprimir', onClick }} />);
    expect(screen.getByRole('img', { name: 'QR do cupom' })).toBeTruthy();
    const button = screen.getByRole('button', { name: 'Imprimir' });
    expect(button.getAttribute('type')).toBe('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sem ação não há botão e o valor não vaza para o DOM', () => {
    const { container } = render(<QrPanel value="SEGREDO-123" qrLabel="QR" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(container.innerHTML).not.toContain('SEGREDO-123');
  });
});
