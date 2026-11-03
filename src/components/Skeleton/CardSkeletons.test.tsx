import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeaderCardSkeleton } from '../HeaderCard';
import { InfoCardSkeleton } from '../InfoCard';
import { ListingCardSkeleton } from '../ListingCard';
import { OfferCardSkeleton } from '../OfferCard';
import { OrderProgressCardSkeleton } from '../OrderProgressCard';
import { StoreOfferCardSkeleton } from '../StoreOfferCard';
import { StorePhotoCardSkeleton } from '../StorePhotoCard';

// Regra U10: o esqueleto tem a estrutura do cartão real e só avisa "Carregando" uma vez.
describe('esqueletos dos cartões', () => {
  it('o módulo avisa que carrega e esconde o desenho do leitor de tela', () => {
    const { container } = render(
      <InfoCardSkeleton label="Carregando" seeAll bars={4}>
        <OrderProgressCardSkeleton />
      </InfoCardSkeleton>
    );
    expect(screen.getByRole('status').textContent).toBe('Carregando');
    expect(container.querySelector('section')?.getAttribute('aria-busy')).toBe('true');
    expect(container.querySelectorAll('[class*=Carousel__bar]')).toHaveLength(4);
    expect(container.innerHTML).toMatch(/OrderProgressCard__frame/);
    expect(container.innerHTML).toMatch(/OrderProgressCard__footer/);
  });

  it('com peek mostra um cartão e meio, sem barra de "Ver todas" se não pedir', () => {
    const { container } = render(
      <InfoCardSkeleton label="Carregando" peek>
        <StorePhotoCardSkeleton />
      </InfoCardSkeleton>
    );
    expect(container.querySelector('[class*=Carousel__track]')?.children).toHaveLength(2);
    expect(container.innerHTML).not.toMatch(/InfoCard__seeAll/);
  });

  it('cada cartão usa as classes do próprio cartão', () => {
    const cases = [
      [<ListingCardSkeleton key="l" />, /ListingCard__media/],
      [<OfferCardSkeleton key="o" />, /OfferCard__spot/],
      [<StoreOfferCardSkeleton key="s" />, /StoreOfferCard__promo/]
    ] as const;
    for (const [element, pattern] of cases) {
      const { container, unmount } = render(element);
      expect(container.innerHTML).toMatch(pattern);
      expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
      unmount();
    }
  });

  it('o topo tem avatar, saudação, frase e busca', () => {
    const { container } = render(<HeaderCardSkeleton label="Carregando" />);
    expect(screen.getByRole('status')).toBeTruthy();
    expect(container.innerHTML).toMatch(/HeaderCard__search/);
    expect(container.innerHTML).toMatch(/Skeleton_shape_avatar/);
  });
});
