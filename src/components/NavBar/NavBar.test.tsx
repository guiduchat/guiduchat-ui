import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NavBar, NavBarBackButton } from './NavBar';

describe('NavBar', () => {
  it('tem o título como h1 e o voltar com nome acessível', () => {
    const onBack = vi.fn();
    render(<NavBar title="Locais" before={<NavBarBackButton label="Voltar" onClick={onBack} />} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Locais' })).toBeTruthy();
    const back = screen.getByRole('button', { name: 'Voltar' });
    expect(back.getAttribute('type')).toBe('button');
    fireEvent.click(back);
    expect(onBack).toHaveBeenCalledOnce();
  });

  it('com asChild, o voltar vira o link do app', () => {
    render(
      <NavBarBackButton asChild label="Voltar">
        <a href="/locais" />
      </NavBarBackButton>
    );
    const link = screen.getByRole('link', { name: 'Voltar' });
    expect(link.getAttribute('href')).toBe('/locais');
    expect(link.querySelector('svg')).toBeTruthy();
  });
});
