import { render, screen } from '@testing-library/react';
import { type ComponentProps, forwardRef } from 'react';
import { describe, expect, it } from 'vitest';

import { TabBar, TabBarItem } from './TabBar';

const Outline = () => <svg data-testid="outline" />;
const Filled = () => <svg data-testid="filled" />;

// Simula o <Link> do Next.js: um <a> que recebe ref e props.
const FakeLink = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>((props, ref) => (
  <a ref={ref} data-fake-link {...props} />
));
FakeLink.displayName = 'FakeLink';

describe('TabBar', () => {
  it('marca a aba ativa com aria-current e o ícone preenchido', () => {
    render(
      <TabBar aria-label="Menu principal">
        <TabBarItem href="/descubra" icon={<Outline />} activeIcon={<Filled />}>Descubra</TabBarItem>
        <TabBarItem href="/locais" active icon={<Outline />} activeIcon={<Filled />}>Locais</TabBarItem>
      </TabBar>
    );
    expect(screen.getByRole('navigation', { name: 'Menu principal' })).toBeTruthy();
    const active = screen.getByRole('link', { name: 'Locais' });
    expect(active.getAttribute('aria-current')).toBe('page');
    expect(active.querySelector('[data-testid="filled"]')).toBeTruthy();
    const inactive = screen.getByRole('link', { name: 'Descubra' });
    expect(inactive.getAttribute('aria-current')).toBeNull();
    expect(inactive.querySelector('[data-testid="outline"]')).toBeTruthy();
  });

  it('mostra o contador com o texto para o leitor de tela e some quando é 0', () => {
    const { rerender } = render(
      <TabBarItem href="/conversas" icon={<Outline />} count={3} countLabel="3 não lidas">Conversas</TabBarItem>
    );
    expect(screen.getByRole('link', { name: /^Conversas\s?3 não lidas$/ })).toBeTruthy();

    rerender(
      <TabBarItem href="/conversas" icon={<Outline />} count={0} countLabel="0 não lidas">Conversas</TabBarItem>
    );
    expect(screen.getByRole('link', { name: 'Conversas' })).toBeTruthy();
  });

  it('com asChild, o link do app recebe o ícone e o rótulo', () => {
    render(
      <TabBarItem asChild active icon={<Outline />} activeIcon={<Filled />}>
        <FakeLink href="/conta">Conta</FakeLink>
      </TabBarItem>
    );
    const link = screen.getByRole('link', { name: 'Conta' });
    expect(link.hasAttribute('data-fake-link')).toBe(true);
    expect(link.getAttribute('href')).toBe('/conta');
    expect(link.getAttribute('aria-current')).toBe('page');
    expect(link.querySelector('[data-testid="filled"]')).toBeTruthy();
  });
});
