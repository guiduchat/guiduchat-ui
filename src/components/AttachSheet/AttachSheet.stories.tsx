import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { icons } from '../../icons/catalog';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { AttachSheet } from './AttachSheet';

const meta = {
  title: 'Components/AttachSheet',
  component: AttachSheet,
  parameters: {
    docs: {
      description: {
        component: 'Folha de anexos do chat: BottomSheet com X no canto e a grade de Câmera, Foto e Documento. Fundo pelo token --attach-sheet-background (#2d2d2d no escuro).'
      }
    }
  }
} satisfies Meta<typeof AttachSheet>;

export default meta;
type Story = StoryObj<typeof AttachSheet>;

const Demo = () => {
  const [open, setOpen] = useState(false);
  const pick = () => setOpen(false);
  return (
    <div style={{ padding: 24 }}>
      <Button variant="secondary" size="small" onClick={() => setOpen(true)}>Abrir folha de anexos</Button>
      <AttachSheet
        open={open}
        onClose={() => setOpen(false)}
        label="Anexar"
        closeLabel="Fechar"
        handleLabel="Arraste para baixo para fechar"
        items={[
          { id: 'camera', label: 'Câmera', icon: <Icon icon={icons.camera} />, onClick: pick },
          { id: 'photo', label: 'Foto', icon: <Icon icon={icons.image} />, onClick: pick },
          { id: 'document', label: 'Documento', icon: <Icon icon={icons.document} />, onClick: pick }
        ]}
      />
    </div>
  );
};

export const Default: Story = {
  args: { open: false, onClose: () => {}, label: 'Anexar', closeLabel: 'Fechar', items: [] },
  render: () => <Demo />
};
