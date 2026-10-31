import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BottomSheet } from './BottomSheet';

const HeroHarness = ({ withHero = true, withFooter = true }: { withHero?: boolean; withFooter?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => { setOpen(true); }}>abrir</button>
      <BottomSheet
        open={open}
        aria-label="Cupom"
        onClose={() => { setOpen(false); }}
        hero={withHero ? <button type="button">imprimir</button> : undefined}
        footer={withFooter ? <button type="button">copiar</button> : undefined}
      >
        <button type="button">um</button>
      </BottomSheet>
    </>
  );
};

const openSheet = () => { act(() => { fireEvent.click(screen.getByRole('button', { name: 'abrir' })); }); };
const tab = (shiftKey = false) => { act(() => { fireEvent.keyDown(document, { key: 'Tab', shiftKey }); }); };

beforeEach(() => {
  vi.useFakeTimers();
  document.body.style.overflow = '';
});
afterEach(() => {
  vi.useRealTimers();
});

describe('BottomSheet: hero e footer', () => {
  it('hero e footer ficam fora da área rolável', () => {
    render(<HeroHarness />);
    openSheet();
    const content = screen.getByText('um').parentElement!;
    expect(content.className).toContain('content');
    expect(content.contains(screen.getByText('imprimir'))).toBe(false);
    expect(content.contains(screen.getByText('copiar'))).toBe(false);
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(screen.getByText('imprimir'))).toBe(true);
    expect(dialog.contains(screen.getByText('copiar'))).toBe(true);
  });

  it('o Tab fica preso incluindo os focáveis do hero e do footer', () => {
    render(<HeroHarness />);
    openSheet();
    const hero = screen.getByRole('button', { name: 'imprimir' });
    const footer = screen.getByRole('button', { name: 'copiar' });
    footer.focus();
    tab();
    expect(document.activeElement).toBe(hero);
    tab(true);
    expect(document.activeElement).toBe(footer);
    hero.focus();
    tab(true);
    expect(document.activeElement).toBe(footer);
  });

  it('sem hero e sem footer o DOM é o de antes', () => {
    render(<HeroHarness withHero={false} withFooter={false} />);
    openSheet();
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('[class*="hero"]')).toBeNull();
    expect(dialog.querySelector('[class*="footer"]')).toBeNull();
    expect(dialog.querySelector('[class*="overHero"]')).toBeNull();
    // Filhos diretos: só a alça e o conteúdo.
    expect(dialog.children).toHaveLength(2);
    expect(dialog.children[1]!.className).toContain('content');
  });

  it('com hero ou footer a folha inteira rola; sem eles, não', () => {
    const { unmount } = render(<HeroHarness />);
    openSheet();
    expect(screen.getByRole('dialog').className).toContain('sheet_scroll');
    unmount();
    render(<HeroHarness withHero={false} withFooter={false} />);
    openSheet();
    expect(screen.getByRole('dialog').className).not.toContain('sheet_scroll');
  });

  it('sem title, o nome do diálogo vem do aria-label', () => {
    render(<HeroHarness />);
    openSheet();
    expect(screen.getByRole('dialog', { name: 'Cupom' })).toBeTruthy();
  });
});
