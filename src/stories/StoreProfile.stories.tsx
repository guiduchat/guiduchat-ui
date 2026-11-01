import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  ActionTile,
  Avatar,
  BentoGrid,
  BentoImage,
  Button,
  Icon,
  icons,
  InfoCard,
  InfoRow,
  OpeningHours,
  ProfileStat,
  ProfileStats,
  QuickAction,
  QuickActions,
  RatingStars,
  RecommendationCard,
  ReviewCard,
  ReviewRail,
  ReviewSummary,
  ScoreBadge,
  StatStrip,
  StatStripItem,
  StoreHero
} from '../index';

const meta = {
  title: 'Telas/Perfil da loja',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Peças da página do local (modelo do Marcelo, 30/10/2026). Textos, números e ações vêm do app.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const week = [
  { day: 'Segunda', hours: ['Fechado'] },
  { day: 'Terça', hours: ['11:30 – 14:30', '18:00 – 22:00'], today: true },
  { day: 'Quarta', hours: ['11:30 – 14:30', '18:00 – 22:00'] },
  { day: 'Quinta', hours: ['11:30 – 14:30', '18:00 – 22:00'] },
  { day: 'Sexta', hours: ['11:30 – 23:00'] },
  { day: 'Sábado', hours: ['11:30 – 23:00'] },
  { day: 'Domingo', hours: ['11:30 – 17:00'] }
];

const StoreProfileDemo = () => {
  const [saved, setSaved] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 390, maxWidth: '100%', padding: 12, boxSizing: 'border-box' }}>
      <StoreHero
        accent="#c2410c"
        avatar={(
          <Avatar.Container size={96} form="squircle">
            <Avatar.Text gradient="orange">RB</Avatar.Text>
          </Avatar.Container>
        )}
        title="Restaurante Buzin"
        subtitle="Frutos do mar"
        action={<Button size="xsmall" variant="primary">Seguir</Button>}
        stats={(
          <ProfileStats>
            <ProfileStat value="152" label="Seguidores" />
            <ProfileStat value="25" label="Seguindo" />
            <ProfileStat value="213" label="Indicações" />
          </ProfileStats>
        )}
        save={{ label: 'Salvar', pressed: saved, onPressedChange: setSaved }}
        badge={<ScoreBadge value="4,6" logo={<Icon icon={icons.google} size={20} />} label="Nota 4,6 no Google" />}
      />
      <QuickActions aria-label="Ações da loja">
        <QuickAction asChild icon={<Icon icon={icons.call} />} label="Ligar"><a href="tel:+5522999998884" /></QuickAction>
        <QuickAction icon={<Icon icon={icons.chats} />} label="Conversar" />
        <QuickAction disabled icon={<Icon icon={icons.mail} />} label="E-mail" />
        <QuickAction icon={<Icon icon={icons.more} />} label="Mais" />
      </QuickActions>
      <StatStrip footer={<a href="https://buzin.com.br">www.buzin.com.br</a>}>
        <StatStripItem
          label="Avaliações"
          onClick={() => {}}
          value={(
            <>
              <Icon icon={icons.thumbsUp} size={20} />
              {' '}
              92%
            </>
          )}
        />
        <StatStripItem
          label="Preço"
          value={(
            <>
              <Icon icon={icons.priceLevel} size={20} />
              <Icon icon={icons.priceLevel} size={20} />
            </>
          )}
        />
        <StatStripItem label="Obter rota" onClick={() => {}} value={<Icon icon={icons.map} />} />
      </StatStrip>
      <BentoGrid tall={<BentoImage />} wide={<BentoImage />}>
        <ActionTile title="Horário" />
        <ActionTile title="Social" />
      </BentoGrid>
      <InfoCard title="Contato">
        <InfoRow icon={<Icon icon={icons.call} />} label="Telefone" value="+55 22 99999-8884" />
        <InfoRow icon={<Icon icon={icons.location} />} label="Endereço" value={'Rua das Pedras, 262\nBúzios - RJ'} />
        <InfoRow icon={<Icon icon={icons.instagram} />} label="Instagram" value="@restaurantebuzin" />
      </InfoCard>
      <ReviewRail label="Avaliações">
        <ReviewSummary logo={<Icon icon={icons.google} />} count="48 avaliações" rating={<RatingStars value={4.6} label="Nota 4,6 de 5" />} />
        <ReviewSummary logo="Tripadvisor" count="12 avaliações" rating={<RatingStars value={5} label="Nota 5 de 5" />} />
        <ReviewCard
          text="Moqueca maravilhosa, atendimento atencioso e vista linda para a rua."
          author="JoaquimJose235"
          source="Google"
          rating={<RatingStars value={4} label="Nota 4 de 5" />}
          avatar={<Avatar.Container size={32} form="circle"><Avatar.Text gradient="blue">J</Avatar.Text></Avatar.Container>}
        />
      </ReviewRail>
      <RecommendationCard
        title="Indicações Locais"
        seeAll={<a href="#todas">Ver todas</a>}
        category="Restaurantes & Bares"
        name="Padaria Flor de Geribá"
        address="Av. Geribá, 345"
        rating={(
          <>
            <Icon icon={icons.star} size={16} fill="currentColor" color="var(--icon-themed)" />
            4,8 (235)
          </>
        )}
        action={{ label: 'Abrir Padaria Flor de Geribá', onClick: () => {} }}
        avatars={['B', 'M', 'C'].map((t) => (
          <Avatar.Container key={t} size={28} form="circle"><Avatar.Text gradient="blue">{t}</Avatar.Text></Avatar.Container>
        ))}
        note={(
          <>
            Indicado por
            {' '}
            <strong>Buzin</strong>
            {', '}
            <strong>Maria Maria Café</strong>
            {' '}
            e mais 36 empresas locais.
          </>
        )}
      />
      <InfoCard title="Informações úteis">
        <InfoRow icon={<Icon icon={icons.contactless} />} value="Aceita pagamento por aproximação" />
        <InfoRow icon={<Icon icon={icons.accessible} />} value="Rampas e portas acessíveis" />
        <InfoRow icon={<Icon icon={icons.kids} />} value="Bom para crianças" />
      </InfoCard>
      <OpeningHours
        title="Horário de funcionamento"
        todayLabel="Horários de hoje"
        todayHours={['11:30 – 14:30', '18:00 – 22:00']}
        status="Fechará em breve"
        statusTone="attention"
        expandLabel="Ver a semana"
        week={week}
      />
      <Button variant="secondary" stretched>Reivindicar este estabelecimento</Button>
    </div>
  );
};

export const StoreProfile: Story = {
  name: 'Perfil da loja',
  render: () => <StoreProfileDemo />
};
