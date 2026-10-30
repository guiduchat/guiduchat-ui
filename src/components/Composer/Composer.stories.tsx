import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { icons } from '../../icons';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { MessageBubble, type MessageBubbleSide } from '../MessageBubble';
import { NavBar, NavBarBackButton, NavBarButton, NavBarPill } from '../NavBar';
import { Composer } from './Composer';

const meta = {
  title: 'Components/Composer',
  parameters: {
    docs: {
      description: {
        component: 'Caixa de mensagem no estilo dos chats de IA: texto em cima; anexo, modos, áudio e enviar embaixo. Enter envia, Shift+Enter quebra a linha.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const modeItems = [{ id: 'chat', title: 'chat' }, { id: 'guidu', title: 'guidu bot' }];

const PlaygroundComposer = () => {
  const [mode, setMode] = useState('chat');
  return (
    <div style={{ width: 380, maxWidth: '100%' }}>
      <Composer
        label="Mensagem"
        placeholder="Escreva sua mensagem"
        sendLabel="Enviar"
        onSend={() => {}}
        attach={{ label: 'Anexar', onClick: () => {} }}
        voice={{ label: 'Gravar áudio', onClick: () => {} }}
        modes={{ label: 'Com quem conversar', active: mode, onChange: setMode, items: modeItems }}
      />
    </div>
  );
};

export const Playground: Story = {
  render: () => <PlaygroundComposer />
};

interface DemoMessage {
  side: MessageBubbleSide
  author?: string
  text: string
  at: string
}

const ChatScreenDemo = () => {
  const [messages, setMessages] = useState<DemoMessage[]>([
    { side: 'theirs', author: 'Milly', text: 'Olá! Temos mesa para quatro às 20h. Quer que eu reserve?', at: '14:30' },
    { side: 'mine', text: 'Quero sim, obrigado!', at: '14:31' }
  ]);
  return (
    <div style={{ width: 390, maxWidth: '100%', height: 640, display: 'flex', flexDirection: 'column' }}>
      <NavBar
        before={<NavBarBackButton label="Voltar" />}
        center={(
          <NavBarPill
            subtitle="Restaurante Buzin"
            avatar={(
              <Avatar.Container size={32} form="circle">
                <Avatar.Text gradient="orange">M</Avatar.Text>
              </Avatar.Container>
            )}
          >
            Milly
          </NavBarPill>
        )}
        after={<NavBarButton label="Carrinho" variant="accent" icon={<Icon icon={icons.cart} />} />}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 16, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <MessageBubble key={index} side={message.side} author={message.author} meta={message.at}>
            {message.text}
          </MessageBubble>
        ))}
      </div>
      <div style={{ padding: 12 }}>
        <Composer
          label="Mensagem"
          placeholder="Escreva sua mensagem"
          sendLabel="Enviar"
          onSend={(text) => setMessages((list) => [...list, { side: 'mine', text, at: 'agora' }])}
          attach={{ label: 'Anexar', onClick: () => {} }}
          voice={{ label: 'Gravar áudio', onClick: () => {} }}
          modes={{ label: 'Com quem conversar', active: 'chat', onChange: () => {}, items: modeItems }}
        />
      </div>
    </div>
  );
};

export const ChatScreen: Story = {
  name: 'Tela de chat',
  parameters: { layout: 'fullscreen' },
  render: () => <ChatScreenDemo />
};
