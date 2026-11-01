import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { SocialLinkCard } from './SocialLinkCard';

describe('SocialLinkCard', () => {
  it('é um botão com a frase como nome e avisa o clique', () => {
    const onClick = vi.fn();
    render(<SocialLinkCard icon={<Icon icon={icons.instagram} />} text="Siga o Guidu no Instagram" onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Siga o Guidu no Instagram' });
    expect(button.getAttribute('type')).toBe('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com asChild vira o link do app, com o mesmo nome e sem botão', () => {
    render(
      <SocialLinkCard asChild icon={<Icon icon={icons.facebook} />} text="Siga o Guidu no Facebook">
        <a href="https://facebook.com/guidu" target="_blank" rel="noreferrer" />
      </SocialLinkCard>
    );
    const link = screen.getByRole('link', { name: 'Siga o Guidu no Facebook' });
    expect(link.getAttribute('href')).toBe('https://facebook.com/guidu');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(screen.queryByRole('button')).toBeNull();
  });
});
