import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WeekdayAvailability } from './WeekdayAvailability';

const days = [
  { key: 'mon', label: 'SEG', fullLabel: 'Segunda-feira', available: true },
  { key: 'tue', label: 'TER', fullLabel: 'Terça-feira', available: true },
  { key: 'sat', label: 'SAB', fullLabel: 'Sábado', available: false },
  { key: 'sun', label: 'DOM', fullLabel: 'Domingo', available: false }
];

const setup = () =>
  render(
    <WeekdayAvailability
      aria-label="Dias de uso"
      days={days}
      availableLabel="disponível para uso"
      unavailableLabel="indisponível"
      legend="legenda do app"
    />
  );

describe('WeekdayAvailability', () => {
  it('é uma lista nomeada com um item por dia', () => {
    setup();
    const list = screen.getByRole('list', { name: 'Dias de uso' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(4);
  });

  it('o estado de cada dia vem por texto, não só por cor', () => {
    setup();
    const items = screen.getAllByRole('listitem');
    expect(items[0]!.textContent).toContain('Segunda-feira: disponível para uso');
    expect(items[2]!.textContent).toContain('Sábado: indisponível');
  });

  it('mostra a legenda do app e aguenta ficar sem ela', () => {
    const { rerender } = setup();
    expect(screen.getByText('legenda do app')).toBeTruthy();
    rerender(<WeekdayAvailability aria-label="Dias" days={days} availableLabel="sim" unavailableLabel="não" />);
    expect(screen.queryByText('legenda do app')).toBeNull();
  });
});
