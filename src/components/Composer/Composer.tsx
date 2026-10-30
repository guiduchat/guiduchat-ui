import { clsx } from 'clsx';
import {
  type ChangeEvent,
  type FormEvent,
  forwardRef,
  type KeyboardEvent,
  type MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { mergeRefs } from '../../helpers';
import { icons } from '../../icons/catalog';
import { Icon } from '../Icon';
import { Segmented, type SegmentedItem } from '../Segmented';
import styles from './Composer.module.scss';

export interface ComposerAction {
  /** Nome para o leitor de tela, traduzido pelo app. */
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export interface ComposerModes {
  items: SegmentedItem[]
  active: string
  onChange: (id: string) => void
  /** Nome do grupo, por exemplo "Com quem conversar". */
  label: string
}

export interface ComposerProps {
  /** Nome do campo para o leitor de tela. */
  label: string
  placeholder?: string
  /** Nome do botão de enviar. */
  sendLabel: string
  /** Chamado com o texto (sem espaços nas pontas) ao enviar; o campo é limpo. */
  onSend: (text: string) => void
  /** Botão de anexo à esquerda. */
  attach?: ComposerAction
  /** Botão de áudio, ao lado do enviar. */
  voice?: ComposerAction
  /** Chave de modos na barra, por exemplo "chat | guidu bot". */
  modes?: ComposerModes
  disabled?: boolean
  className?: string
}

const MAX_HEIGHT = 140;

/**
 * Caixa de mensagem no estilo dos chats de IA: o texto em cima e, embaixo,
 * anexo, modos, áudio e enviar. Enter envia; Shift+Enter quebra a linha.
 * Os textos vêm do app.
 */
export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>((props, ref) => {
  const { label, placeholder, sendLabel, onSend, attach, voice, modes, disabled = false, className } = props;
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = !disabled && text.trim().length > 0;

  // O campo cresce com o texto até MAX_HEIGHT e depois rola.
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;
  }, [text]);

  const send = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    send();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send();
    }
  };

  return (
    <form className={clsx(styles.Composer, className)} onSubmit={handleSubmit}>
      <textarea
        ref={mergeRefs(textareaRef, ref)}
        className={styles.Composer__input}
        aria-label={label}
        placeholder={placeholder}
        value={text}
        rows={1}
        enterKeyHint="send"
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.Composer__bar}>
        {attach && (
          <button type="button" className={styles.Composer__button} aria-label={attach.label} onClick={attach.onClick}>
            <Icon icon={icons.attach} size={20} />
          </button>
        )}
        {modes && (
          <Segmented
            items={modes.items}
            activeItem={modes.active}
            onClick={modes.onChange}
            aria-label={modes.label}
            innerClassNames={{ list: styles.Composer__modes, item: styles.Composer__mode }}
          />
        )}
        <span className={styles.Composer__spacer} />
        {voice && (
          <button type="button" className={styles.Composer__button} aria-label={voice.label} onClick={voice.onClick}>
            <Icon icon={icons.mic} size={20} />
          </button>
        )}
        <button
          type="submit"
          className={clsx(styles.Composer__button, styles.Composer__send)}
          aria-label={sendLabel}
          disabled={!canSend}
        >
          <Icon icon={icons.send} size={20} />
        </button>
      </div>
    </form>
  );
});

Composer.displayName = 'Composer';
