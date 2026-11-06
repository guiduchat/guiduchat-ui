import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { ProductPinnedHeader } from './ProductPinnedHeader';

describe('ProductPinnedHeader', () => {
  it('mostra o nome, a foto com o alt do app e o botão das ofertas', () => {
    const onClick = vi.fn();
    render(
      <ProductPinnedHeader
        image={{ src: 'a.jpg', alt: 'Garrafa' }}
        name="Cerveja Corona Extra Long Neck 330ml"
        offers={{ label: '15 Ofertas', onClick }}
      />
    );
    expect(screen.getByText('Cerveja Corona Extra Long Neck 330ml')).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Garrafa' }).getAttribute('src')).toBe('a.jpg');
    fireEvent.click(screen.getByRole('button', { name: '15 Ofertas' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sem foto não cria imagem; sem ações não há botões redondos', () => {
    render(<ProductPinnedHeader name="Produto" />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('cada ação é um botão com o nome do app e avisa o clique', () => {
    const onShare = vi.fn();
    render(
      <ProductPinnedHeader
        name="Produto"
        actions={[
          { label: 'Salvar nos favoritos', icon: <Icon icon={icons.saveAdd} /> },
          { label: 'Compartilhar', icon: <Icon icon={icons.shareNodes} />, onClick: onShare }
        ]}
      />
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('não tem fundo próprio de cartão', () => {
    const { container } = render(<ProductPinnedHeader name="Produto" />);
    expect(container.firstElementChild?.className).toMatch(/ProductPinnedHeader/);
    expect(container.innerHTML).not.toMatch(/background/);
  });
});
