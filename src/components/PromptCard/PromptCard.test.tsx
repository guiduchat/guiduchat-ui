import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PromptCard } from './PromptCard';

describe('PromptCard', () => {
  it('é um botão com o título e avisa o clique', () => {
    const onClick = vi.fn();
    render(<PromptCard icon={<svg />} title="Encontre novos locais" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Encontre novos locais' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('o tom padrão é lime e o tom escolhido vai para o cartão', () => {
    const { rerender } = render(<PromptCard icon={<svg />} title="A" />);
    expect(screen.getByRole('button').getAttribute('data-tone')).toBe('lime');
    rerender(<PromptCard icon={<svg />} title="A" tone="sky" />);
    expect(screen.getByRole('button').getAttribute('data-tone')).toBe('sky');
  });

  it('com asChild vira o link do app', () => {
    render(
      <PromptCard asChild icon={<svg />} title="Converse com o Guidu">
        <a href="/chat" />
      </PromptCard>
    );
    const link = screen.getByRole('link', { name: 'Converse com o Guidu' });
    expect(link.getAttribute('href')).toBe('/chat');
  });
});
