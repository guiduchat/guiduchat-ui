import { act, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

import { useSnackbar } from '../../hooks';
import { SnackbarProvider } from './SnackbarProvider';

const Show = () => {
  const { showSnackbar } = useSnackbar();
  useEffect(() => { showSnackbar({ text: 'Salvo' }); }, [showSnackbar]);
  return null;
};

describe('Snackbar: textos', () => {
  it('sem regionLabel a região não tem texto fixo nem papel', async () => {
    const { container } = render(<SnackbarProvider><Show /></SnackbarProvider>);
    await act(async () => {});
    const region = container.querySelector('[data-placement]');
    expect(region?.getAttribute('aria-label')).toBeNull();
    expect(region?.getAttribute('role')).toBeNull();
    expect(document.body.innerHTML).not.toMatch(/[Ѐ-ӿ]/);
  });

  it('usa o rótulo traduzido pelo app', async () => {
    render(<SnackbarProvider regionLabel={() => 'Avisos'}><Show /></SnackbarProvider>);
    await act(async () => {});
    expect(screen.getByRole('region', { name: 'Avisos' })).toBeTruthy();
  });
});
