import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmptyState } from './EmptyState';
import { Notice } from './Notice';
import { Skeleton } from './Skeleton';

describe('Notice', () => {
  it('anuncia como status e mostra a ação', () => {
    render(
      <Notice tone="warning" action={<button type="button">Tentar de novo</button>}>
        Sem conexão.
      </Notice>
    );
    expect(screen.getByRole('status').textContent).toContain('Sem conexão.');
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeTruthy();
  });

  it('aceita role="alert" para erro urgente', () => {
    render(<Notice tone="danger" role="alert">Domínio desconhecido</Notice>);
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});

describe('EmptyState', () => {
  it('tem título, explicação e ação', () => {
    render(
      <EmptyState
        title="Não deu para carregar"
        description="Confira a conexão."
        action={<button type="button">Tentar de novo</button>}
      />
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Não deu para carregar' })).toBeTruthy();
    expect(screen.getByText('Confira a conexão.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeTruthy();
  });
});

describe('Skeleton', () => {
  it('é só visual e desenha as linhas pedidas', () => {
    const { container } = render(<Skeleton shape="text" lines={3} />);
    const group = container.firstElementChild;
    expect(group?.getAttribute('aria-hidden')).toBe('true');
    expect(group?.children).toHaveLength(3);
  });
});
