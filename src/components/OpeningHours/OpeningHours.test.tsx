import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GuiduUI } from '../GuiduUI';
import { OpeningHours } from './OpeningHours';

const renderHours = () => render(
  <GuiduUI colorScheme="light" platform="android">
    <OpeningHours
      title="Horário de funcionamento"
      todayLabel="Horários de hoje"
      todayHours={['11:30 – 14:30', '18:00 – 22:00']}
      status="Fechará em breve"
      statusTone="attention"
      expandLabel="Ver a semana"
      week={[
        { day: 'Segunda', hours: ['Fechado'] },
        { day: 'Terça', hours: ['11:30 – 14:30', '18:00 – 22:00'], today: true }
      ]}
    />
  </GuiduUI>
);

describe('OpeningHours', () => {
  it('mostra hoje e esconde a semana até expandir', () => {
    renderHours();
    expect(screen.getByText('Fechará em breve')).toBeTruthy();
    expect(screen.queryByRole('definition')).toBeNull();

    const toggle = screen.getByRole('button', { name: 'Ver a semana' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual(['Segunda', 'Terça']);
  });
});
