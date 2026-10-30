import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MessageBubble } from '../MessageBubble';
import { Composer, type ComposerProps } from './Composer';

const setup = (extra: Partial<ComposerProps> = {}) => {
  const onSend = vi.fn();
  render(<Composer label="Mensagem" placeholder="Escreva" sendLabel="Enviar" onSend={onSend} {...extra} />);
  return {
    onSend,
    input: screen.getByRole('textbox', { name: 'Mensagem' }),
    send: screen.getByRole('button', { name: 'Enviar' })
  };
};

describe('Composer', () => {
  it('envia pelo botão com o texto limpo e esvazia o campo', () => {
    const { onSend, input, send } = setup();
    expect(send).toHaveProperty('disabled', true);
    fireEvent.change(input, { target: { value: '  Olá, tem mesa?  ' } });
    expect(send).toHaveProperty('disabled', false);
    fireEvent.click(send);
    expect(onSend).toHaveBeenCalledWith('Olá, tem mesa?');
    expect(input).toHaveProperty('value', '');
  });

  it('Enter envia e Shift+Enter não', () => {
    const { onSend, input } = setup();
    fireEvent.change(input, { target: { value: 'Oi' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Oi');
  });

  it('não envia só espaços', () => {
    const { onSend, input, send } = setup();
    fireEvent.change(input, { target: { value: '   ' } });
    expect(send).toHaveProperty('disabled', true);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('anexo, áudio e a chave de modos chamam o app', () => {
    const attach = vi.fn();
    const voice = vi.fn();
    const onChange = vi.fn();
    setup({
      attach: { label: 'Anexar', onClick: attach },
      voice: { label: 'Gravar áudio', onClick: voice },
      modes: {
        label: 'Com quem conversar',
        active: 'chat',
        onChange,
        items: [{ id: 'chat', title: 'chat' }, { id: 'guidu', title: 'guidu bot' }]
      }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Anexar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Gravar áudio' }));
    expect(screen.getByRole('tablist', { name: 'Com quem conversar' })).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'guidu bot' }));
    expect(attach).toHaveBeenCalledOnce();
    expect(voice).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('guidu');
  });
});

describe('MessageBubble', () => {
  it('mostra quem escreveu, o texto e a hora', () => {
    render(<MessageBubble side="theirs" author="Milly" meta="14:32">Temos mesa às 20h.</MessageBubble>);
    expect(screen.getByText('Milly')).toBeTruthy();
    expect(screen.getByText('Temos mesa às 20h.')).toBeTruthy();
    expect(screen.getByText('14:32')).toBeTruthy();
  });
});
