import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { OfferCard } from './OfferCard';

const base = { title: '20% de desc Picanha', subtitle: 'Restaurante Buzin', meta: 'Válido até 12/11/2026' };

describe('OfferCard', () => {
  it('o marcador mostra aria-pressed e avisa a troca', () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(<OfferCard {...base} save={{ label: 'Salvar oferta', pressed: false, onPressedChange }} />);
    const toggle = screen.getByRole('button', { name: 'Salvar oferta' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(toggle.getAttribute('type')).toBe('button');
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    rerender(<OfferCard {...base} save={{ label: 'Salvar oferta', pressed: true, onPressedChange }} />);
    expect(screen.getByRole('button', { name: 'Salvar oferta' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('chama as duas ações e respeita o desativado', () => {
    const onSecondary = vi.fn();
    const onPrimary = vi.fn();
    render(
      <OfferCard
        {...base}
        secondaryAction={{ label: 'Ver regras', onClick: onSecondary }}
        primaryAction={{ label: 'Resgatar oferta', onClick: onPrimary, disabled: true }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Ver regras' }));
    fireEvent.click(screen.getByRole('button', { name: 'Resgatar oferta' }));
    expect(onSecondary).toHaveBeenCalledTimes(1);
    expect(onPrimary).not.toHaveBeenCalled();
    expect((screen.getByRole('button', { name: 'Resgatar oferta' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('sem ações não há rodapé; com uma só, há um botão só', () => {
    const { container, rerender } = render(<OfferCard {...base} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(container.querySelector('[class*="OfferCard__footer"]')).toBeNull();
    rerender(<OfferCard {...base} primaryAction={{ label: 'Resgatar oferta', onClick: () => {} }} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('mostra a foto só no destaque, com o alt do app, e aguenta a falta dela', () => {
    const image = { src: 'foto.jpg', alt: 'Picanha' };
    const { rerender } = render(<OfferCard {...base} image={image} />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<OfferCard {...base} appearance="featured" image={image} />);
    expect(screen.getByRole('img', { name: 'Picanha' }).getAttribute('src')).toBe('foto.jpg');
    rerender(<OfferCard {...base} appearance="featured" />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('20% de desc Picanha')).toBeTruthy();
  });

  it('mostra a etiqueta de situação', () => {
    render(<OfferCard {...base} tag="Usado" />);
    expect(screen.getByText('Usado')).toBeTruthy();
  });
});
