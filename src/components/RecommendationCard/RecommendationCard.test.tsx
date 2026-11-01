import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RecommendationCard } from './RecommendationCard';

describe('RecommendationCard', () => {
  it('sem foto mostra a reserva e não cria imagem', () => {
    render(<RecommendationCard title="Indicações" name="Padaria" />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Indicações' })).toBeTruthy();
  });

  it('com foto usa o alt do app', () => {
    render(<RecommendationCard title="T" name="N" image={{ src: 'a.jpg', alt: 'Fachada' }} />);
    expect(screen.getByRole('img', { name: 'Fachada' }).getAttribute('src')).toBe('a.jpg');
  });

  it('a seta é botão com o nome do app e avisa o clique', () => {
    const onClick = vi.fn();
    render(<RecommendationCard title="T" name="N" action={{ label: 'Abrir Padaria', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Padaria' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com asChild a seta vira o link do app', () => {
    render(<RecommendationCard title="T" name="N" action={{ label: 'Abrir Padaria', asChild: true, children: <a href="/places/padaria" /> }} />);
    const link = screen.getByRole('link', { name: 'Abrir Padaria' });
    expect(link.getAttribute('href')).toBe('/places/padaria');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('mostra os avatares e a nota com destaque', () => {
    render(
      <RecommendationCard
        title="T"
        name="N"
        avatars={[<i key="a" data-testid="av" />, <i key="b" data-testid="av" />]}
        note={(
          <>
            Indicado por
            {' '}
            <strong>Buzin</strong>
          </>
        )}
      />
    );
    expect(screen.getAllByTestId('av')).toHaveLength(2);
    expect(screen.getByText('Buzin').tagName).toBe('STRONG');
  });
});
