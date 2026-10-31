import clsx from 'clsx';
import {CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type TransitionEvent, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';

import { useDrag } from '../../hooks';
import {InnerClassNamesProp} from "../../types";
import { Typography } from '../Typography';
import styles from './BottomSheet.module.scss';

export type BottomSheetProps = {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
  /**
   * Минимальная высота шторки
   */
  minHeight?: CSSProperties['minHeight'];
  innerClassNames?: InnerClassNamesProp<'overlay' | 'sheet' | 'handle' | 'header'>
  enableDrag?: boolean
  /**
   * Nome do diálogo quando não há `title`. Com `title`, o nome vem dele.
   */
  'aria-label'?: string
  /**
   * Rótulo da alça de arrastar (texto traduzido pelo app). Sem ele, a alça fica
   * só para o toque e o mouse e não aparece para o leitor de tela nem no Tab;
   * o teclado fecha com Esc.
   */
  handleLabel?: string
}

type Status = 'closed' | 'open' | 'exiting';

/** Folga sobre os 0,25 s da animação de saída antes de forçar o desmonte. */
const EXIT_TIMEOUT_MS = 300;

const FOCUSABLE = [
  'a[href]', 'area[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])', 'textarea:not([disabled])', 'summary', '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const BottomSheet = ({
  open, title, onClose, children, minHeight = 'auto', innerClassNames, enableDrag = true,
  'aria-label': ariaLabel, handleLabel
}: BottomSheetProps) => {
  const [status, setStatus] = useState<Status>(open ? 'open' : 'closed');
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  openRef.current = open;

  // O gatilho é quem tinha o foco quando a folha foi pedida, antes de qualquer
  // filho montar e mover o foco por conta própria.
  useLayoutEffect(() => {
    if (open && typeof document !== 'undefined') {
      const active = document.activeElement;
      triggerRef.current = active instanceof HTMLElement && active !== document.body ? active : null;
    }
  }, [open]);

  useEffect(() => {
    setStatus((prev) => {
      if (open) {
        return 'open';
      }
      return prev === 'closed' ? 'closed' : 'exiting';
    });
  }, [open]);

  // A saída não pode depender só de transitionend: fechar durante a animação de
  // entrada gera animationcancel e nenhum transitionend. Um tempo limite
  // garante o desmonte; com movimento reduzido não há animação a esperar.
  useEffect(() => {
    if (status !== 'exiting') {
      return;
    }
    const finish = () => setStatus((prev) => (prev === 'exiting' ? (openRef.current ? 'open' : 'closed') : prev));
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    const timer = setTimeout(finish, EXIT_TIMEOUT_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }
    // По завершении transition выхода размонтируем шторку.
    setStatus((prev) => (prev === 'exiting' ? (openRef.current ? 'open' : 'closed') : prev));
  };

  // Блокируем прокрутку фона, пока шторка в DOM.
  useEffect(() => {
    if (status === 'closed') {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [status]);

  // Foco: entra na folha ao abrir (se o filho já não o moveu) e volta ao gatilho
  // ao sair. O efeito do pai roda depois dos efeitos dos filhos.
  const visible = status !== 'closed';
  useEffect(() => {
    if (!visible) {
      return;
    }
    const sheet = sheetRef.current;
    if (sheet && !sheet.contains(document.activeElement)) {
      sheet.focus({ preventScroll: true });
    }
    return () => {
      const active = document.activeElement;
      const trigger = triggerRef.current;
      if ((!active || active === document.body || sheet?.contains(active)) && trigger?.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [visible]);

  const handleSheetKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }
    const sheet = event.currentTarget;
    const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
    if (items.length === 0) {
      event.preventDefault();
      sheet.focus({ preventScroll: true });
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === sheet || !sheet.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !sheet.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (status === 'closed') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, onClose]);

  const {
    dragging,
    dragOffset,
    suppressClickRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useDrag({
    enabled: enableDrag && status === 'open',
    onClose: () => {
      setStatus('exiting');
      onClose();
    }
  });

  const handleOverlayClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onClose();
  };

  if (status === 'closed') {
    return null;
  }

  const exiting = status === 'exiting';
  const transform = dragging
    ? `translateY(${dragOffset}px)`
    : `translateY(${exiting ? 100 : 0}%)`;

  return (
    <div
      className={clsx(styles.overlay, { [styles.overlayClosing]: exiting }, innerClassNames?.overlay)}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          styles.sheet,
          innerClassNames?.sheet,
          { [styles.sheet_dragging]: dragging, [styles.sheet_exiting]: exiting }
        )}
        style={{
          minHeight,
          transform,
        }}
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        onClick={event => {
          event.stopPropagation();
          // O clique do fim de um arrasto curto para aqui; não deixe a
          // supressão engolir o próximo toque na película.
          suppressClickRef.current = false;
        }}
        onKeyDown={handleSheetKeyDown}
        onTransitionEnd={handleTransitionEnd}
      >
        {enableDrag && (
          <div
            className={clsx(styles.handle, innerClassNames?.handle)}
            {...(handleLabel
              ? { role: 'button', tabIndex: 0, 'aria-label': handleLabel }
              : { 'aria-hidden': true })}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClose();
              }
            }}
          />
        )}
        {title && (
          <div className={clsx(styles.header, innerClassNames?.header)}>
            <Typography.Title id={titleId} variant="medium-strong">
              {title}
            </Typography.Title>
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
