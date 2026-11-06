import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ProductHero } from './ProductHero';
import { ProductHeroSkeleton } from './ProductHeroSkeleton';

describe('ProductHero', () => {
  it('mostra a foto com o alt do app; sem foto não cria imagem', () => {
    const { rerender } = render(<ProductHero />);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<ProductHero image={{ src: 'a.jpg', alt: 'Garrafa' }} />);
    expect(screen.getByRole('img', { name: 'Garrafa' }).getAttribute('src')).toBe('a.jpg');
  });

  it('cada ação é um botão com o nome do app e avisa o clique', () => {
    const onShare = vi.fn();
    render(
      <ProductHero
        image={{ src: 'a.jpg' }}
        actions={[
          { label: 'Compartilhar', icon: <Icon icon={icons.share} />, onClick: onShare },
          { label: 'Copiar link', icon: <Icon icon={icons.link} /> }
        ]}
      />
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('o esqueleto reserva a imagem e a coluna de ações com as classes do componente', () => {
    const { container } = render(<ProductHeroSkeleton />);
    expect(container.innerHTML).toMatch(/ProductHero__actions/);
    expect(container.firstElementChild?.className).toMatch(/ProductHero/);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
