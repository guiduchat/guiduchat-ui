import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ReviewCard, ReviewSummary } from './Review';

const filledCount = (row: HTMLElement) => [...row.querySelectorAll('span[aria-hidden="true"]')].filter((tile) => !/empty/.test(tile.className)).length;

describe('ReviewSummary', () => {
  it('arredonda a nota para as estrelas cheias (4,5 dá 5) e tem um nome só na fileira', () => {
    render(<ReviewSummary provider="google" providerLabel="Google" score="4,5 (128)" rating={4.5} ratingLabel="Nota 4,5 de 5" />);
    const row = screen.getByRole('img', { name: 'Nota 4,5 de 5' });
    expect(row.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(5);
    expect(filledCount(row)).toBe(5);
    expect(screen.getByRole('img', { name: 'Google' })).toBeTruthy();
    expect(screen.getByText('4,5 (128)')).toBeTruthy();
  });

  it('nota 3,2 dá 3 estrelas cheias e 2 apagadas', () => {
    render(<ReviewSummary provider="tripadvisor" providerLabel="Tripadvisor" score="3,2 (45)" rating={3.2} ratingLabel="Nota 3,2 de 5" />);
    expect(filledCount(screen.getByRole('img', { name: 'Nota 3,2 de 5' }))).toBe(3);
    expect(screen.getByRole('img', { name: 'Tripadvisor' })).toBeTruthy();
  });

  it('dois logos do Google na mesma página não repetem ids de gradiente', () => {
    const { container } = render(
      <>
        <ReviewSummary provider="google" providerLabel="Google" score="a" rating={5} ratingLabel="a" />
        <ReviewSummary provider="google" providerLabel="Google" score="b" rating={5} ratingLabel="b" />
      </>
    );
    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('ReviewCard', () => {
  it('com rating e sem ratingLabel a fileira é decorativa, sem img sem nome', () => {
    const { container } = render(<ReviewCard text="a" author="b" rating={4} />);
    expect(container.querySelector('[role="img"]')).toBeNull();
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(5);
  });

  it('rating NaN mostra 0 estrelas cheias', () => {
    render(<ReviewCard text="a" author="b" rating={Number.NaN} ratingLabel="Sem nota" />);
    expect(filledCount(screen.getByRole('img', { name: 'Sem nota' }))).toBe(0);
  });

  it('mostra o texto, as estrelas e o nome', () => {
    render(<ReviewCard text="Muito bom." author="Joaquim" rating={4} ratingLabel="Nota 4 de 5" />);
    expect(screen.getByText('Muito bom.')).toBeTruthy();
    expect(screen.getByText('Joaquim')).toBeTruthy();
    expect(filledCount(screen.getByRole('img', { name: 'Nota 4 de 5' }))).toBe(4);
  });
});
