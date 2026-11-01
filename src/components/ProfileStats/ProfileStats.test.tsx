import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { StoreHero } from '../StoreHero';
import { ProfileStat, ProfileStats } from './ProfileStats';

describe('ProfileStats', () => {
  it('sem onClick só informa: nem botão nem link', () => {
    render(<ProfileStats><ProfileStat value="152" label="Seguidores" /></ProfileStats>);
    expect(screen.getByText('152')).toBeTruthy();
    expect(screen.getByText('Seguidores')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('com onClick vira botão', () => {
    const onClick = vi.fn();
    render(<ProfileStat value="25" label="Seguindo" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com asChild vira o link do app', () => {
    render(<ProfileStat asChild value="213" label="Indicações"><a href="/x/recommendations" /></ProfileStat>);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/x/recommendations');
    expect(link.textContent).toContain('213');
  });
});

describe('StoreHero com action e stats', () => {
  it('mostra os dois quando passados e nenhum quando não', () => {
    const { rerender } = render(<StoreHero avatar="L" title="Loja" action={<button type="button">Seguir</button>} stats={<span>números</span>} />);
    expect(screen.getByRole('button', { name: 'Seguir' })).toBeTruthy();
    expect(screen.getByText('números')).toBeTruthy();
    rerender(<StoreHero avatar="L" title="Loja" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByText('números')).toBeNull();
  });
});
