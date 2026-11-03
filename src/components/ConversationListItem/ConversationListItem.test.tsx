import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ConversationListItem } from './ConversationListItem';
import { ConversationListItemSkeleton } from './ConversationListItemSkeleton';

const base = {
  title: 'Padaria Flor de Geribá',
  message: 'Seu pedido está pronto para retirada.',
  address: 'Av. Geribá, 236, Geribá',
  time: '09:34'
};

describe('ConversationListItem', () => {
  it('mostra nome, última mensagem, endereço e horário', () => {
    render(<ConversationListItem {...base} />);
    expect(screen.getByRole('heading', { name: base.title })).toBeTruthy();
    for (const text of [base.message, base.address, base.time]) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('a linha inteira é o link do app com asChild', () => {
    render(
      <ConversationListItem {...base} asChild>
        <a href="/conversations/c1" />
      </ConversationListItem>
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/conversations/c1');
    expect(link.textContent).toContain(base.title);
  });

  it('check cinza quando enviada e duplo check quando lida', () => {
    const { rerender } = render(<ConversationListItem {...base} status="sent" statusLabel="Enviada" />);
    expect(screen.getByRole('img', { name: 'Enviada' }).className).not.toMatch(/status_read/);
    rerender(<ConversationListItem {...base} status="read" statusLabel="Lida" />);
    expect(screen.getByRole('img', { name: 'Lida' }).className).toMatch(/status_read/);
  });

  it('sem status não mostra check', () => {
    render(<ConversationListItem {...base} statusLabel="Lida" />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('o contador de não lidas ocupa o lugar do check', () => {
    render(<ConversationListItem {...base} status="read" statusLabel="Lida" unread={3} />);
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('sem endereço a linha do local some', () => {
    render(<ConversationListItem {...base} address={undefined} />);
    expect(screen.queryByText(base.address)).toBeNull();
  });
});

describe('ConversationListItemSkeleton', () => {
  it('avisa o leitor de tela e não mostra conteúdo', () => {
    render(<ConversationListItemSkeleton label="Carregando" />);
    expect(screen.getByRole('status').textContent).toBe('Carregando');
  });
});
