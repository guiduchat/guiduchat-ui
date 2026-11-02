import { render } from '@testing-library/react';
import axe from 'axe-core';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import {
  ActionInput,
  ActionTile,
  AddressPanel,
  Avatar,
  BentoGrid,
  BentoImage,
  BottomSheet,
  Button,
  Carousel,
  CartItemCard,
  Checkbox,
  Composer,
  ContactCard,
  Counter,
  EmptyState,
  ExpandablePanel,
  FormField,
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
  OfferCard,
  OfferHero,
  OfferPrice,
  OpeningHours,
  OrderProgressCard,
  OrderStatusCard,
  OrderSummaryCard,
  OrderTimeline,
  OtpInput,
  PasswordInput,
  PaymentPanel,
  PersonRow,
  PhoneInput,
  PlaceCard,
  PriceSummary,
  QrCode,
  QrPanel,
  QuantityStepper,
  QuickAction,
  QuickActions,
  ReviewCard,
  ReviewRail,
  ReviewSummary,
  ScoreBadge,
  Segmented,
  ShortcutCard,
  Skeleton,
  SocialButton,
  SocialLinkCard,
  StatStrip,
  StatStripItem,
  Steps,
  StoreHero,
  StoreOfferCard,
  StorePhotoCard,
  SwipeActions,
  Switch,
  TabBar,
  TabBarItem,
  TextDivider,
  ValidityBanner,
  WeekdayAvailability,
} from './index';

// Acessibilidade com o axe nos componentes, nos dois temas. Componente novo
// entra nesta lista (U7 do guidu-chat).
const cases: Array<[string, ReactNode]> = [
  [
    'Detalhes da oferta',
    <div key="detail">
      <OfferHero image={{ src: 'foto.jpg', alt: 'Picanha' }} save={{ label: 'Salvar oferta', pressed: false, onPressedChange: () => {} }} />
      <OfferPrice price="R$ 89,90" originalPrice="R$ 119,90" originalPriceLabel="Preço original" />
      <ValidityBanner>Oferta válida até: 30/11/2026</ValidityBanner>
      <WeekdayAvailability
        aria-label="Dias de uso"
        availableLabel="disponível para uso"
        unavailableLabel="indisponível"
        legend="disponível para uso"
        days={[
          { key: 'mon', label: 'SEG', fullLabel: 'Segunda-feira', available: true },
          { key: 'sun', label: 'DOM', fullLabel: 'Domingo', available: false }
        ]}
      />
    </div>
  ],
  [
    'QrCode e QrPanel',
    <div key="qr">
      <QrCode value="GUIDU-7K3Q-92XM" aria-label="QR code do cupom" size={160} />
      <QrPanel value="GUIDU-7K3Q-92XM" qrLabel="QR code do cupom" action={{ label: 'Imprimir', onClick: () => {} }} />
    </div>
  ],
  [
    'BottomSheet com hero e footer',
    <BottomSheet
      key="sheet-hero"
      open
      aria-label="Cupom"
      onClose={() => {}}
      hero={<QrPanel value="GUIDU-7K3Q-92XM" qrLabel="QR code do cupom" action={{ label: 'Imprimir', onClick: () => {} }} />}
      footer={<Button stretched>GUIDU-7K3Q-92XM</Button>}
    >
      <p>Regras do cupom.</p>
    </BottomSheet>
  ],
  [
    'Página do pedido',
    <div key="od">
      <OrderStatusCard title="Pedido #23546" detail="Previsão de entrega: 1 hora" />
      <ContactCard name="Padaria Flor de Búzios" handle="@flordebuzios" address="R. Manoel Turíbio de Farias, 273" />
      <ExpandablePanel summary="Itens do pedido: 2" label="Ver itens do pedido">Pão de queijo × 2</ExpandablePanel>
      <PaymentPanel amount="R$ 350,00" description="O pagamento deve ser feito no ato da entrega." />
      <AddressPanel title="Pousada Flor do Mar" address="Av. Geribá, 360" note="Pode deixar na portaria." />
      <PersonRow name="Fabiano Silva" detail="Placa: FDV3453" />
      <OrderTimeline
        aria-label="Andamento"
        items={[
          { key: 'done', icon: '1', title: 'Pedido confirmado', description: '12:40', state: 'done' },
          { key: 'now', icon: '2', title: 'Pedido retirado', state: 'current' },
          { key: 'next', icon: '3', title: 'Entrega', state: 'pending' }
        ]}
      />
    </div>
  ],
  [
    'OfferCard',
    <div key="offers">
      <OfferCard
        title="20% de desc Picanha 2 pessoas"
        subtitle="Restaurante Buzin"
        meta="Válido até 12/11/2026"
        tag="Usado"
        save={{ label: 'Salvar oferta', pressed: false, onPressedChange: () => {} }}
        secondaryAction={{ label: 'Ver regras', onClick: () => {} }}
        primaryAction={{ label: 'Resgatar oferta', onClick: () => {}, disabled: true }}
      />
      <OfferCard
        appearance="featured"
        image={{ src: 'foto.jpg', alt: 'Picanha' }}
        title="20% de desc Picanha 2 pessoas"
        subtitle="Restaurante Buzin"
        primaryAction={{ label: 'Resgatar oferta', onClick: () => {} }}
      />
      <Carousel aria-label="Ofertas em destaque" pagerLabel={(page, total) => `Página ${page} de ${total}`}>
        <p>Primeira</p>
        <p>Segunda</p>
      </Carousel>
    </div>
  ],
  [
    'OrderSummaryCard',
    <OrderSummaryCard
      key="os"
      title="Restaurante Buzin"
      status="Retirado"
      statusTone="positive"
      meta="PED#235 - Segunda, 12/11/2026"
      summary="Almoço completo / + 1 item"
      totalLabel="Total:"
      total="R$ 350,00"
      actions={<Button size="small">Pedir novamente</Button>}
    />
  ],
  [
    'ShortcutCard',
    <div key="sc">
      <ShortcutCard badge="Novo" text="Ofertas especiais para você." icon={<Icon icon={icons.arrowUpRight} />} />
      <ShortcutCard asChild title="Pedidos recentes" text="Acompanhe seus últimos pedidos." icon={<Icon icon={icons.orders} />}>
        <a href="/conta?aba=pedidos" />
      </ShortcutCard>
    </div>
  ],
  [
    'Formulário de entrada',
    <form key="auth">
      <FormField label="Telefone" error="Número inválido">
        <PhoneInput
          countries={[{ code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' }]}
          country="BR"
          onCountryChange={() => {}}
          countryLabel="País"
        />
      </FormField>
      <FormField label="Senha">
        <PasswordInput showLabel="Mostrar senha" hideLabel="Esconder senha" />
      </FormField>
      <FormField label="Código">
        <OtpInput value="12" onChange={() => {}} />
      </FormField>
      <TextDivider>ou</TextDivider>
      <SocialButton provider="google">Continuar com Google</SocialButton>
      <SocialButton provider="apple">Continuar com Apple</SocialButton>
    </form>
  ],
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
      <ReviewSummary provider="google" providerLabel="Google" score="4,6 (12)" rating={4.6} ratingLabel="Nota 4,6 de 5" />
      <ReviewSummary provider="tripadvisor" providerLabel="Tripadvisor" score="4,5 (128)" rating={4.5} ratingLabel="Nota 4,5 de 5" />
      <ReviewCard text="Muito bom." author="Joaquim" rating={5} ratingLabel="Nota 5 de 5" />
    </ReviewRail>
  ],
  [
    'Cartões da página Para Você',
    <div key="fy">
      <InfoCard title="Pedidos em andamento" seeAll={<a href="/orders">Ver todas</a>} plain>
        <Carousel aria-label="Pedidos em andamento" pagerLabel={(page, total) => `Pedido ${page} de ${total}`} peek pagerTone="accent">
          <OrderProgressCard
            status="Aguardando pagamento"
            code="Pedido ID: #123456"
            items="2 itens"
            updatedAt="Atualizado em 01/11/26 - 12:00h"
            steps={<Steps count={4} progress={1} role="img" aria-label="Passo 1 de 4" />}
            avatar={<Avatar.Container size={44} form="circle"><Avatar.Text>RB</Avatar.Text></Avatar.Container>}
            store="Restaurante Buzin"
            category="Restaurantes & Cafés"
            action={<Button asChild size="small"><a href="/orders/1">Ver mais</a></Button>}
          />
          <OrderProgressCard status="Em preparo" code="Pedido ID: #123457" items="1 item" />
        </Carousel>
      </InfoCard>
      <InfoCard title="Ofertas Imperdíveis" seeAll={<a href="/offers">Ver todas</a>} plain>
        <OfferCard
          appearance="spotlight"
          avatar={<Avatar.Container size={44} form="circle"><Avatar.Text>RB</Avatar.Text></Avatar.Container>}
          title="20% de desc Picanha 2 pessoas"
          notice="Verifique as regras da promoção."
          meta="Válido até 12/11/2026"
          subtitle="Restaurante Buzin"
          category="Restaurantes & Cafés"
          topAction={{ asChild: true, children: <a href="/offers/1" /> }}
          primaryAction={{ label: 'Resgatar', onClick: () => {} }}
        />
      </InfoCard>
      <InfoCard title="Favoritos" seeAll={<a href="/places?tab=favorites">Ver todas</a>} plain>
        <StoreOfferCard
          category="Restaurantes & Bares"
          name="Padaria Flor de Geribá"
          address="Av. Geribá, 345"
          rating="4,8 (235)"
          action={{ label: 'Abrir Padaria Flor de Geribá', asChild: true, children: <a href="/places/padaria" /> }}
          promo="20% de desconto nos produtos da linha artesanal"
        />
      </InfoCard>
      <InfoCard title="Mais Recomendados" seeAll={<a href="/places?tab=recommended">Ver todas</a>} plain>
        <StorePhotoCard
          category="Restaurantes & Bares"
          name="Padaria Flor de Geribá"
          address="Av. Geribá, 345"
          rating="4,8 (235)"
          action={{ label: 'Abrir Padaria Flor de Geribá', onClick: () => {} }}
        />
      </InfoCard>
      <SocialLinkCard asChild icon={<Icon icon={icons.instagram} />} text="Siga o Guidu no Instagram">
        <a href="https://instagram.com/guidu" />
      </SocialLinkCard>
    </div>
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
    'Carrinho: item, quantidade, linha deslizante, cupom, resumo e aceite',
    <div key="cart">
      <AddressPanel
        plainIcon
        title="Pousada Luar de Geribá"
        titleAction={<Button variant="link" size="xsmall">Alterar endereço</Button>}
        address="Av Geribá, 256"
      >
        <Button variant="link" size="xsmall" iconBefore={<Icon icon={icons.note} size={20} />}>Adicionar referência</Button>
      </AddressPanel>
      <AddressPanel title="Pousada" titleAction={<Button variant="link" size="xsmall">Alterar</Button>} address="Av. Geribá" />
      <Segmented
        aria-label="Entrega ou retirada"
        variant="buttons"
        activeItem="delivery"
        onClick={() => {}}
        items={[
          { id: 'delivery', title: 'Entrega', icon: <Icon icon={icons.delivery} size={20} /> },
          { id: 'pickup', title: 'Retirada', icon: <Icon icon={icons.pickup} size={20} /> }
        ]}
      />
      <SwipeActions
        open
        onOpenChange={() => {}}
        actions={[
          { id: 'save', label: 'Salvar', tone: 'primary', icon: <Icon icon={icons.save} />, onClick: () => {} },
          { id: 'delete', label: 'Excluir', icon: <Icon icon={icons.trash} />, onClick: () => {} }
        ]}
      >
        <CartItemCard
          name="Pizza"
          detail="Grande"
          price="R$ 35,00"
          stepper={(
            <QuantityStepper
              value={2}
              min={1}
              max={9}
              label="Quantidade de Pizza"
              incrementLabel="Aumentar quantidade"
              decrementLabel="Diminuir quantidade"
              onIncrement={() => {}}
              onDecrement={() => {}}
            />
          )}
        />
      </SwipeActions>
      <ActionInput label="Código de desconto" placeholder="Código" actionLabel="Aplicar" onAction={() => {}} />
      <PriceSummary rows={[{ label: 'Subtotal', value: 'R$ 70,00' }, { label: 'Envio', value: 'R$ 0,00' }]} total={{ label: 'Total', value: 'R$ 70,00' }} />
      <Checkbox label="Aceito compartilhar meus dados de contato" />
      <Checkbox label="Desabilitada" disabled checked readOnly />
    </div>
  ],
  [
    'MessageBubble',
    <div key="mb">
      <MessageBubble side="theirs" author="Milly" meta="14:30">Temos mesa às 20h.</MessageBubble>
      <MessageBubble side="mine" meta="14:31">Quero sim!</MessageBubble>
    </div>
  ],
  [
    'BottomSheet com título e alça rotulada',
    <BottomSheet key="bs1" open title="Cupom" handleLabel="Arraste para baixo para fechar" onClose={() => {}}>
      <Button>Fechar</Button>
    </BottomSheet>
  ],
  [
    'BottomSheet sem título, nomeado por aria-label',
    <BottomSheet key="bs2" open aria-label="Detalhes" onClose={() => {}}>
      <Button>Fechar</Button>
    </BottomSheet>
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
