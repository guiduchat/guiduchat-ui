import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { icons } from '../../icons/catalog';
import { ActionGrid } from '../ActionGrid';
import { BottomSheet } from '../BottomSheet';
import { Icon } from '../Icon';
import { AttachSheet } from './AttachSheet';

const makeItems = (onPick: (id: string) => void) => [
  { id: 'camera', label: 'Câmera', icon: <Icon icon={icons.camera} />, onClick: () => onPick('camera') },
  { id: 'photo', label: 'Foto', icon: <Icon icon={icons.image} />, onClick: () => onPick('photo') },
  { id: 'document', label: 'Documento', icon: <Icon icon={icons.document} />, onClick: () => onPick('document') }
];

describe('ActionGrid', () => {
  it('mostra um botão por item, com o rótulo, e chama o clique do item', () => {
    const onPick = vi.fn();
    render(<ActionGrid aria-label="Anexar" items={makeItems(onPick)} />);
    const group = screen.getByRole('group', { name: 'Anexar' });
    expect(group.querySelectorAll('button')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Foto' }));
    expect(onPick).toHaveBeenCalledExactlyOnceWith('photo');
  });
});

describe('BottomSheet closeLabel', () => {
  it('sem closeLabel não há X', () => {
    render(<BottomSheet open aria-label="Folha" onClose={() => {}}><p>oi</p></BottomSheet>);
    expect(screen.queryByRole('button', { name: 'Fechar' })).toBeNull();
  });

  it('com closeLabel e sem título, o conteúdo ganha recuo para começar abaixo do X', () => {
    render(<BottomSheet open aria-label="Folha" closeLabel="Fechar" onClose={() => {}}><p data-testid="c">oi</p></BottomSheet>);
    expect(screen.getByTestId('c').parentElement?.className).toMatch(/content_belowClose/);
  });

  it('sem closeLabel, ou com título, o conteúdo não ganha recuo', () => {
    const { rerender } = render(<BottomSheet open aria-label="Folha" onClose={() => {}}><p data-testid="c">oi</p></BottomSheet>);
    expect(screen.getByTestId('c').parentElement?.className).not.toMatch(/belowClose/);
    rerender(<BottomSheet open title="T" closeLabel="Fechar" onClose={() => {}}><p data-testid="c">oi</p></BottomSheet>);
    expect(screen.getByTestId('c').parentElement?.className).not.toMatch(/belowClose/);
  });

  it('com closeLabel o X chama onClose', () => {
    const onClose = vi.fn();
    render(<BottomSheet open aria-label="Folha" closeLabel="Fechar" onClose={onClose}><p>oi</p></BottomSheet>);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('AttachSheet', () => {
  const Harness = ({ onPick }: { onPick: (id: string) => void }) => {
    const [open, setOpen] = useState(true);
    const items = makeItems(onPick).map((item) => ({
      ...item,
      onClick: () => {
        setOpen(false);
        item.onClick();
      }
    }));
    return <AttachSheet open={open} onClose={() => setOpen(false)} label="Anexar" closeLabel="Fechar" items={items} />;
  };

  it('abre como diálogo nomeado, com o X e os três quadros', () => {
    render(<Harness onPick={() => {}} />);
    expect(screen.getByRole('dialog', { name: 'Anexar' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeTruthy();
    expect(screen.getAllByRole('button').filter((b) => ['Câmera', 'Foto', 'Documento'].includes(b.textContent ?? ''))).toHaveLength(3);
  });

  it('o clique no quadro chama a ação (o app fecha a folha)', () => {
    const onPick = vi.fn();
    render(<Harness onPick={onPick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Câmera' }));
    expect(onPick).toHaveBeenCalledWith('camera');
  });

  it('o grupo da grade não repete o nome do diálogo', () => {
    render(<Harness onPick={() => {}} />);
    const group = screen.getByRole('group');
    expect(group.getAttribute('aria-label')).toBeNull();
    expect(screen.getAllByLabelText('Anexar')).toHaveLength(1);
  });

  it('o X fecha a folha', () => {
    const onClose = vi.fn();
    render(<AttachSheet open onClose={onClose} label="Anexar" closeLabel="Fechar" items={makeItems(() => {})} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('o foco entra na folha ao abrir', () => {
    render(<Harness onPick={() => {}} />);
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
  });
});
