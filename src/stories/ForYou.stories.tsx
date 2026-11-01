import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Avatar,
  Button,
  Carousel,
  Icon,
  icons,
  InfoCard,
  OfferCard,
  OrderProgressCard,
  SocialLinkCard,
  Steps,
  StoreOfferCard,
  StorePhotoCard
} from '../index';

const meta = {
  title: 'Telas/Para Você',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cartões novos da página Para Você (modelos do Marcelo, 01/11/2026): o cartão de fora é o `InfoCard` parado; só o `Carousel` por dentro se move. Textos e links vêm do app.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const pagerLabel = (page: number, total: number) => `Cartão ${page} de ${total}`;

const avatar = (
  <Avatar.Container size={44} form="circle">
    <Avatar.Text gradient="green">RB</Avatar.Text>
  </Avatar.Container>
);

const rating = (
  <>
    <Icon icon={icons.star} size={16} fill="currentColor" color="var(--icon-themed)" />
    4,8 (235)
  </>
);

const seeAll = (href: string) => <a href={href}>Ver todas</a>;

const Page = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 390, margin: '0 auto', padding: 12, boxSizing: 'border-box' }}>
    <InfoCard title="Pedidos em andamento" seeAll={seeAll('#pedidos')} plain>
      <Carousel aria-label="Pedidos em andamento" pagerLabel={pagerLabel} pagerTone="accent">
        {[1, 2, 3].map((n) => (
          <OrderProgressCard
            key={n}
            status="Aguardando pagamento"
            code={`Pedido ID: #12345${n}`}
            items={`${n} itens`}
            updatedAt="Atualizado em 01/11/26 - 12:00h"
            steps={<Steps count={4} progress={n} role="img" aria-label={`Passo ${n} de 4`} />}
            avatar={avatar}
            store="Restaurante Buzin"
            category="Restaurantes & Cafés"
            action={<Button asChild size="small"><a href="#pedido">Ver mais</a></Button>}
          />
        ))}
      </Carousel>
    </InfoCard>

    <SocialLinkCard asChild icon={<Icon icon={icons.instagram} />} text="Siga o Guidu no Instagram">
      <a href="#instagram" />
    </SocialLinkCard>
    <SocialLinkCard asChild icon={<Icon icon={icons.facebook} />} text="Siga o Guidu no Facebook">
      <a href="#facebook" />
    </SocialLinkCard>

    <InfoCard title="Ofertas Imperdíveis" seeAll={seeAll('#ofertas')} plain>
      <Carousel aria-label="Ofertas Imperdíveis" pagerLabel={pagerLabel} pagerTone="accent">
        {[1, 2, 3].map((n) => (
          <OfferCard
            key={n}
            appearance="spotlight"
            avatar={avatar}
            title="20% de desc Picanha 2 pessoas"
            notice="Verifique as regras da promoção."
            meta="Válido até 12/11/2026"
            subtitle="Restaurante Buzin"
            category="Restaurantes & Cafés"
            topAction={{ asChild: true, children: <a href="#oferta" /> }}
            primaryAction={{ label: 'Resgatar', onClick: () => {} }}
          />
        ))}
      </Carousel>
    </InfoCard>

    <InfoCard title="Favoritos" seeAll={seeAll('#favoritos')} plain>
      <Carousel aria-label="Favoritos" pagerLabel={pagerLabel} pagerTone="accent">
        {[1, 2, 3].map((n) => (
          <StoreOfferCard
            key={n}
            category="Restaurantes & Bares"
            name="Padaria Flor de Geribá"
            address="Av. Geribá, 345"
            rating={rating}
            action={{ label: 'Abrir Padaria Flor de Geribá', asChild: true, children: <a href="#loja" /> }}
            promo="20% de desconto nos produtos da linha artesanal"
          />
        ))}
      </Carousel>
    </InfoCard>

    <InfoCard title="Mais Recomendados" seeAll={seeAll('#recomendados')} plain>
      <Carousel aria-label="Mais Recomendados" pagerLabel={pagerLabel} pagerTone="accent" peek>
        {[1, 2, 3].map((n) => (
          <StorePhotoCard
            key={n}
            category="Restaurantes & Bares"
            name="Padaria Flor de Geribá"
            address="Av. Geribá, 345"
            rating={rating}
            action={{ label: 'Abrir Padaria Flor de Geribá', asChild: true, children: <a href="#loja" /> }}
          />
        ))}
      </Carousel>
    </InfoCard>
  </div>
);

export const ParaVoce: Story = { render: () => <Page /> };
