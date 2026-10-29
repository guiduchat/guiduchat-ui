import { render } from '@testing-library/react';
import axe from 'axe-core';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { Avatar, Button, Counter, GuiduUI, HeaderCard, MenuTabs, PlaceCard, Switch } from './index';

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
