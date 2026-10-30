import { render } from '@testing-library/react';
import axe from 'axe-core';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import {
  Avatar,
  Button,
  Counter,
  EmptyState,
  GuiduUI,
  HeaderCard,
  Icon20WifiSlash,
  Icon24Cart,
  Icon24ChatFilled,
  Icon24ChatOutline,
  Icon24CompassOutline,
  MenuTabs,
  NavBar,
  NavBarBackButton,
  NavBarButton,
  NavBarPill,
  Notice,
  PlaceCard,
  Skeleton,
  Switch,
  TabBar,
  TabBarItem
} from './index';

// Acessibilidade com o axe nos componentes, nos dois temas. Componente novo
// entra nesta lista (U7 do guidu-chat).
const cases: Array<[string, ReactNode]> = [
  ['Button', <Button key="b">Enviar pedido</Button>],
  [
    'Switch',
    <label key="s">
      Receber avisos
      <Switch defaultChecked />
    </label>
  ],
  ['Counter', <Counter key="c" value={3} />],
  [
    'PlaceCard',
    <PlaceCard
      key="p"
      title="Boutique da Praia"
      subtitle="Moda praia"
      text="Chegou a coleção nova."
      action={{ label: 'Ver mensagens', count: 2 }}
      save={{ label: 'Salvar', pressed: false, onPressedChange: () => {} }}
    />
  ],
  [
    'TabBar',
    <TabBar key="t" aria-label="Menu principal">
      <TabBarItem href="/descubra" icon={<Icon24CompassOutline />}>Descubra</TabBarItem>
      <TabBarItem
        href="/conversas"
        active
        icon={<Icon24ChatOutline />}
        activeIcon={<Icon24ChatFilled />}
        count={3}
        countLabel="3 não lidas"
      >
        Conversas
      </TabBarItem>
    </TabBar>
  ],
  ['NavBar', <NavBar key="n" title="Locais" before={<NavBarBackButton label="Voltar" />} after={<NavBarButton label="Carrinho" variant="accent" icon={<Icon24Cart />} />} />],
  [
    'NavBarPill',
    <NavBar key="np" before={<NavBarBackButton label="Voltar" />} center={<NavBarPill avatar={<Avatar.Container size={32}><Avatar.Text gradient="orange">RB</Avatar.Text></Avatar.Container>}>Restaurante Buzin</NavBarPill>} />
  ],
  [
    'Skeleton',
    <div key="k" aria-busy="true">
      <Skeleton shape="text" lines={2} />
    </div>
  ],
  [
    'EmptyState',
    <EmptyState
      key="e"
      icon={<Icon20WifiSlash />}
      title="Não deu para carregar"
      description="Confira a conexão."
      action={<Button>Tentar de novo</Button>}
    />
  ],
  [
    'Notice',
    <Notice key="o" tone="warning" icon={<Icon20WifiSlash />} action={<Button size="small">Tentar de novo</Button>}>
      Sem conexão.
    </Notice>
  ],
  [
    'HeaderCard',
    <HeaderCard
      key="h"
      avatar={(
        <Avatar.Container size={32} form="squircle">
          <Avatar.Text gradient="blue">J</Avatar.Text>
        </Avatar.Container>
      )}
      greeting="Olá, João!"
      title="Encontre novos locais ou continue a conversa."
      search={{ label: 'Buscar locais', placeholder: 'Buscar por nome ou categoria' }}
      filter={{ label: 'Filtros', onClick: () => {} }}
    />
  ],
  [
    'MenuTabs',
    <MenuTabs
      key="m"
      items={[
        { id: 'favorites', title: 'Favoritos' },
        { id: 'all', title: 'Todos' },
        { id: 'recommended', title: 'Recomendados' }
      ]}
      activeItem="favorites"
      onChange={() => {}}
      aria-label="Filtrar locais"
    />
  ]
];

describe.each(['light', 'dark'] as const)('acessibilidade no tema %s', (colorScheme) => {
  it.each(cases)('%s não tem violações do axe', async (_name, node) => {
    const { container } = render(
      <GuiduUI colorScheme={colorScheme} platform="ios">{node}</GuiduUI>
    );
    // Cor e contraste dependem do CSS, que o jsdom não calcula; o contraste
    // dos tokens é conferido em tokens.test.ts.
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } }
    });
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
