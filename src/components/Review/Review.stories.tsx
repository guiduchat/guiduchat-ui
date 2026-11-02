import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { GuiduUI } from '../GuiduUI';
import { ReviewCard, ReviewRail, ReviewSummary } from './Review';

const meta = {
  title: 'Components/Review',
  parameters: {
    layout: 'fullscreen',
    // Cada bloco tem o seu GuiduUI (tema próprio); o do Storybook não entra.
    withMaxUiWrapper: false,
    docs: {
      description: {
        component: 'Resumo por provedor (logo, nota com a contagem e cinco `StarTile`) e cartão de avaliação (texto em até 2 linhas, avatar, estrelas e nome), no ator guidu. Estrelas cheias = nota arredondada. Textos e nomes acessíveis vêm do app.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Block = ({ scheme }: { scheme: 'light' | 'dark' }) => (
  <div style={{ width: 390, maxWidth: '100%' }}>
    <GuiduUI actor="guidu" colorScheme={scheme} platform="ios">
      <div style={{ padding: 12 }}>
        <ReviewRail label="Avaliações">
          <ReviewSummary provider="google" providerLabel="Google" score="4,5 (128)" rating={4.5} ratingLabel="Nota 4,5 de 5" />
          <ReviewSummary provider="tripadvisor" providerLabel="Tripadvisor" score="3,2 (45)" rating={3.2} ratingLabel="Nota 3,2 de 5" />
          <ReviewCard
            text="Neque porro quisquam est qui dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora."
            author="JoaquimJose235"
            rating={5}
            ratingLabel="Nota 5 de 5"
            avatar={<Avatar.Container size={36} form="circle"><Avatar.Text gradient="blue">J</Avatar.Text></Avatar.Container>}
          />
        </ReviewRail>
      </div>
    </GuiduUI>
  </div>
);

export const Avaliacoes: Story = {
  name: 'Resumo e cartão, claro e escuro',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>
      <Block scheme="light" />
      <Block scheme="dark" />
    </div>
  )
};
