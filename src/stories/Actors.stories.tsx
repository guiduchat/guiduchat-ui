import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  type ActorType,
  Avatar,
  Button,
  Carousel,
  type ColorSchemeType,
  GuiduUI,
  InfoCard,
  OrderProgressCard,
  Steps
} from '../index';

const meta = {
  title: 'Telas/Atores',
  parameters: {
    layout: 'fullscreen',
    // Cada coluna tem o seu GuiduUI (tema e ator próprios); o do Storybook não entra.
    withMaxUiWrapper: false,
    docs: {
      description: {
        component:
          'Camadas dos cartões por ator (Marcelo, 01/11/2026). `guidu` (loja e guidu): cartão de fora mais claro e o de dentro mais escuro. `hub` (padrão, a área da pessoa): o contrário. Vale nos dois temas. O ator vem da prop `actor` do `GuiduUI` ou de um `data-actor` em qualquer elemento.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const pagerLabel = (page: number, total: number) => `Cartão ${page} de ${total}`;

const Sample = ({ name }: { name: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, boxSizing: 'border-box' }}>
    <InfoCard title={name}>
      <Carousel aria-label={name} pagerLabel={pagerLabel}>
        {[1, 2, 3].map((n) => (
          <OrderProgressCard
            key={n}
            status="Aguardando pagamento"
            code={`Pedido ID: #12345${n}`}
            items={`${n} itens`}
            updatedAt="Atualizado em 01/11/26 - 12:00h"
            steps={<Steps count={4} progress={n} role="img" aria-label={`Passo ${n} de 4`} />}
            avatar={<Avatar.Container size={44} form="circle"><Avatar.Text gradient="green">RB</Avatar.Text></Avatar.Container>}
            store="Restaurante Buzin"
            category="Restaurantes & Cafés"
            action={<Button size="small">Ver mais</Button>}
          />
        ))}
      </Carousel>
    </InfoCard>
  </div>
);

const Column = ({ actor, colorScheme }: { actor: ActorType, colorScheme: ColorSchemeType }) => (
  <div style={{ width: 390, maxWidth: '100%' }}>
    <GuiduUI actor={actor} colorScheme={colorScheme} platform="ios">
      <Sample name={`${actor === 'guidu' ? 'guidu' : 'Cliente Hub'} · ${colorScheme === 'light' ? 'claro' : 'escuro'}`} />
    </GuiduUI>
  </div>
);

const Comparison = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>
    {(['light', 'dark'] as const).map((scheme) =>
      (['guidu', 'hub'] as const).map((actor) => <Column key={`${actor}-${scheme}`} actor={actor} colorScheme={scheme} />)
    )}
  </div>
);

export const Atores: Story = { name: 'Guidu e Cliente Hub, claro e escuro', render: () => <Comparison /> };
