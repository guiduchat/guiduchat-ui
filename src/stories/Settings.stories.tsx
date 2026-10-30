import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, CellHeader, CellList, CellSimple, Icon, icons, ShortcutCard, Switch } from '../index';

const meta = {
  title: 'Telas/Configurações',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Settings: Story = {
  name: 'Configurações',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 390, maxWidth: '100%', padding: 12, boxSizing: 'border-box' }}>
      <CellList mode="island">
        <CellSimple
          showChevron
          title="Milly Allock"
          subtitle="+55 21 99998-7896"
          before={<Avatar.Container size={48} form="squircle"><Avatar.Text gradient="blue">MA</Avatar.Text></Avatar.Container>}
        />
      </CellList>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ShortcutCard badge="Novo" text="Ofertas especiais para você." icon={<Icon icon={icons.arrowUpRight} />} />
        <ShortcutCard title="Pedidos recentes" text="Acompanhe seus últimos pedidos." icon={<Icon icon={icons.orders} />} />
      </div>
      <CellList mode="island" header={<CellHeader titleStyle="normal">Geral</CellHeader>}>
        <CellSimple as="label" title="Notificações" after={<Switch defaultChecked />} />
        <CellSimple as="label" title="Modo escuro" after={<Switch />} />
        <CellSimple showChevron before={<Icon icon={icons.heart} />} title="Favoritos" />
      </CellList>
    </div>
  )
};
