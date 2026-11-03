import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PlaceListCard } from './PlaceListCard';
import { PlaceListCardSkeleton } from './PlaceListCardSkeleton';

const base = {
  title: 'Padaria Flor de Geribá',
  rating: '4,8 (235)',
  description: 'Frutos do mar e pratos da casa na Rua das Pedras.',
  address: 'Av. Geribá, 256, Geribá, Armação dos Búzios, RJ',
  status: 'Fechado',
  statusTone: 'negative' as const,
  hours: 'Abre às 12:00'
};

describe('PlaceListCard', () => {
  it('mostra nome, nota, descrição, endereço, situação e horário', () => {
    render(<PlaceListCard {...base} />);
    expect(screen.getByRole('heading', { name: base.title })).toBeTruthy();
    for (const text of [base.rating, base.description, base.address, base.status, base.hours]) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.getByText('Fechado').className).toMatch(/status_negative/);
  });

  it('o quadro abre o local: botão ou o link do app com asChild', () => {
    const onClick = vi.fn();
    const { rerender } = render(<PlaceListCard {...base} open={{ label: 'Abrir Padaria', onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir Padaria' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<PlaceListCard {...base} open={{ label: 'Abrir Padaria', asChild: true, children: <a href="/places/padaria" /> }} />);
    expect(screen.getByRole('link', { name: 'Abrir Padaria' }).getAttribute('href')).toBe('/places/padaria');
  });

  it('salvar avisa o novo estado', () => {
    const onPressedChange = vi.fn();
    render(<PlaceListCard {...base} save={{ label: 'Salvar Padaria', pressed: false, onPressedChange }} />);
    const save = screen.getByRole('button', { name: 'Salvar Padaria' });
    expect(save.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(save);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('ligar vira link tel:, e sem `call` não aparece', () => {
    const { rerender } = render(<PlaceListCard {...base} call={{ label: 'Ligar para Padaria', href: 'tel:+5522999990000' }} />);
    expect(screen.getByRole('link', { name: 'Ligar para Padaria' }).getAttribute('href')).toBe('tel:+5522999990000');
    rerender(<PlaceListCard {...base} />);
    expect(screen.queryByRole('link', { name: 'Ligar para Padaria' })).toBeNull();
  });

  it('o chat mostra o contador só com mensagens não lidas', () => {
    const onClick = vi.fn();
    const { container, rerender } = render(<PlaceListCard {...base} chat={{ label: 'Abrir Chat', onClick, count: 3 }} />);
    fireEvent.click(screen.getByRole('button', { name: /Abrir Chat/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.textContent).toMatch(/3/);
    rerender(<PlaceListCard {...base} chat={{ label: 'Abrir Chat', onClick, count: 0 }} />);
    expect(container.innerHTML).not.toMatch(/Counter/);
  });

  it('o esqueleto avisa uma vez e esconde o desenho', () => {
    const { container } = render(<PlaceListCardSkeleton label="Carregando" />);
    expect(screen.getByRole('status').textContent).toBe('Carregando');
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
    expect(container.innerHTML).toMatch(/PlaceListCard__footer/);
  });
});
