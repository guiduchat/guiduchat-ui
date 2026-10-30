import { render } from '@testing-library/react';
import axe from 'axe-core';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import {
  ActionTile,
  Avatar,
  BentoGrid,
  BentoImage,
  Button,
  Composer,
  Counter,
  EmptyState,
  GuiduUI,
  HeaderCard,
  Icon,
  icons,
  InfoCard,
  InfoRow,
  MenuTabs,
  MessageBubble,
  NavBar,
  NavBarBackButton,
  NavBarButton,
  NavBarPill,
  Notice,
  OpeningHours,
  PlaceCard,
  QuickAction,
  QuickActions,
  RatingStars,
  ReviewCard,
  ReviewRail,
  ReviewSummary,
  ScoreBadge,
  Skeleton,
  StatStrip,
  StatStripItem,
  StoreHero,
  Switch,
  TabBar,
  TabBarItem
} from './index';

// Acessibilidade com o axe nos componentes, nos dois temas. Componente novo
// entra nesta lista (U7 do guidu-chat).
const cases: Array<[string, ReactNode]> = [
  [
    'StoreHero',
    <StoreHero
      key="sh"
      accent="#c2410c"
      avatar={<Avatar.Container size={96} form="squircle"><Avatar.Text gradient="orange">RB</Avatar.Text></Avatar.Container>}
      title="Restaurante Buzin"
      subtitle="Restaurante"
      save={{ label: 'Salvar', pressed: false, onPressedChange: () => {} }}
      badge={<ScoreBadge value="4,6" logo="Google" label="Nota 4,6 no Google" />}
    />
  ],
  [
    'QuickActions',
    <QuickActions key="qa" aria-label="Ações">
      <QuickAction asChild icon={<Icon icon={icons.call} />} label="Ligar"><a href="tel:+5522999998884" /></QuickAction>
      <QuickAction disabled icon={<Icon icon={icons.mail} />} label="E-mail" />
    </QuickActions>
  ],
  [
    'StatStrip',
    <StatStrip key="ss" footer={<a href="https://buzin.com.br">buzin.com.br</a>}>
      <StatStripItem label="Avaliações" value="92%" onClick={() => {}} />
      <StatStripItem label="Preço" value="$$" />
    </StatStrip>
  ],
  [
    'BentoGrid',
    <BentoGrid key="bg" tall={<BentoImage src="data:," alt="Salão" />} wide={<BentoImage />}>
      <ActionTile title="Horário" />
      <ActionTile title="Social" />
    </BentoGrid>
  ],
  [
    'InfoCard',
    <InfoCard key="ic" title="Contato">
      <InfoRow icon={<Icon icon={icons.location} />} label="Endereço" value="Rua das Pedras, 10" />
      <InfoRow asChild label="Telefone" value="+55 22 99999-8884"><a href="tel:+5522999998884" /></InfoRow>
    </InfoCard>
  ],
  [
    'OpeningHours',
    <OpeningHours
      key="oh"
      title="Horário de funcionamento"
      todayLabel="Horários de hoje"
      todayHours={['11:30 – 14:30']}
      status="Aberto agora"
      expandLabel="Ver a semana"
      week={[{ day: 'Segunda', hours: ['11:30 – 14:30'], today: true }]}
    />
  ],
  [
    'Review',
    <ReviewRail key="rv" label="Avaliações">
      <ReviewSummary logo="Google" count="12 avaliações" rating={<RatingStars value={4.6} label="Nota 4,6 de 5" />} />
      <ReviewCard text="Muito bom." author="Joaquim" source="Google" rating={<RatingStars value={5} label="Nota 5 de 5" />} />
    </ReviewRail>
  ],
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
      <TabBarItem href="/descubra" icon={<Icon icon={icons.discover} />}>Descubra</TabBarItem>
      <TabBarItem
        href="/conversas"
        active
        icon={<Icon icon={icons.chats} />}
        count={3}
        countLabel="3 não lidas"
      >
        Conversas
      </TabBarItem>
    </TabBar>
  ],
  ['NavBar', <NavBar key="n" title="Locais" before={<NavBarBackButton label="Voltar" />} after={<NavBarButton label="Carrinho" variant="accent" icon={<Icon icon={icons.cart} />} />} />],
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
      icon={<Icon icon={icons.offline} size={20} />}
      title="Não deu para carregar"
      description="Confira a conexão."
      action={<Button>Tentar de novo</Button>}
    />
  ],
  [
    'Notice',
    <Notice key="o" tone="warning" icon={<Icon icon={icons.offline} size={20} />} action={<Button size="small">Tentar de novo</Button>}>
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
  ],
  [
    'Composer',
    <Composer
      key="c2"
      label="Mensagem"
      placeholder="Escreva sua mensagem"
      sendLabel="Enviar"
      onSend={() => {}}
      attach={{ label: 'Anexar', onClick: () => {} }}
      voice={{ label: 'Gravar áudio', onClick: () => {} }}
      modes={{
        label: 'Com quem conversar',
        active: 'chat',
        onChange: () => {},
        items: [{ id: 'chat', title: 'chat' }, { id: 'guidu', title: 'guidu bot' }]
      }}
    />
  ],
  [
    'MessageBubble',
    <div key="mb">
      <MessageBubble side="theirs" author="Milly" meta="14:30">Temos mesa às 20h.</MessageBubble>
      <MessageBubble side="mine" meta="14:31">Quero sim!</MessageBubble>
    </div>
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
