import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NavBar, NavBarBackButton, NavBarButton, NavBarPill } from './NavBar';

describe('NavBar', () => {
  it('tem o título como h1 e o voltar com nome acessível', () => {
    const onBack = vi.fn();
    render(<NavBar title="Locais" before={<NavBarBackButton label="Voltar" onClick={onBack} />} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Locais' })).toBeTruthy();
    const back = screen.getByRole('button', { name: 'Voltar' });
    expect(back.getAttribute('type')).toBe('button');
    expect(back.querySelector('svg')).toBeTruthy();
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

  it('o botão de ação tem nome acessível e a variante da marca', () => {
    render(<NavBarButton label="Carrinho" variant="accent" icon={<svg />} />);
    const button = screen.getByRole('button', { name: 'Carrinho' });
    expect(button.className).toMatch(/NavBarButton_variant_accent/);
  });

  it('a pílula do chat fica no lugar do título, com o nome do estabelecimento', () => {
    const onOpen = vi.fn();
    render(
      <NavBar
        center={<NavBarPill avatar={<span>RB</span>} onClick={onOpen}>Restaurante Buzin</NavBarPill>}
      />
    );
    expect(screen.queryByRole('heading')).toBeNull();
    const pill = screen.getByRole('button', { name: 'Restaurante Buzin' });
    fireEvent.click(pill);
    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('a pílula mostra quem fala e, embaixo, a loja', () => {
    render(<NavBarPill subtitle="Restaurante Buzin">Milly</NavBarPill>);
    const pill = screen.getByRole('button');
    expect(pill.textContent).toContain('Milly');
    expect(pill.textContent).toContain('Restaurante Buzin');
  });
});
