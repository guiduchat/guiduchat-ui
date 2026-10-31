import clsx from 'clsx';
import {CSSProperties, type ReactNode, type TransitionEvent, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';

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
  'a[href]', 'area[href]', 'button', 'input:not([type="hidden"])', 'select', 'textarea',
  'summary', '[contenteditable]:not([contenteditable="false"])', '[tabindex]'
].join(',');

const isDisabled = (el: HTMLElement) => {
  if (el.matches(':disabled')) {
    return true;
  }
  // Campo dentro de fieldset desativado (exceto dentro do primeiro legend).
  if (/^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
    const fieldset = el.closest('fieldset[disabled]');
    if (fieldset) {
      const legend = Array.from(fieldset.children).find((c) => c.tagName === 'LEGEND');
      return !(legend && legend.contains(el));
    }
  }
  return false;
};

const isHidden = (el: HTMLElement) => {
  if (typeof el.checkVisibility === 'function') {
    return !el.checkVisibility({ visibilityProperty: true, checkVisibilityCSS: true });
  }
  // Alternativa (jsdom): sobe pelos ancestrais procurando hidden e display.
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    if (node.hidden || window.getComputedStyle(node).display === 'none') {
      return true;
    }
  }
  return window.getComputedStyle(el).visibility === 'hidden';
};

const tabbableItems = (root: HTMLElement) => {
  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    const tabindex = el.getAttribute('tabindex');
    if (tabindex !== null && Number.parseInt(tabindex, 10) < 0) {
      return false;
    }
    return !isDisabled(el) && !isHidden(el) && el.closest('[aria-hidden="true"], [inert]') === null;
  });
  // Grupo de rádio: só o marcado entra no Tab (ou o primeiro, se nenhum está marcado).
  return items.filter((el) => {
    if (!(el instanceof HTMLInputElement) || el.type !== 'radio' || !el.name) {
      return true;
    }
    const group = items.filter((other): other is HTMLInputElement =>
      other instanceof HTMLInputElement && other.type === 'radio' && other.name === el.name && other.form === el.form);
    return (group.find((r) => r.checked) ?? group[0]) === el;
  });
};

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

  // Tab preso na folha. Fica no document (como o Esc) porque, com o foco em body
  // ou no fundo, o onKeyDown da folha não roda. Só com a folha aberta: em
  // 'exiting' o app move o foco ao gatilho e a captura o roubaria de volta.
  useEffect(() => {
    if (status !== 'open') {
      return;
    }
    const handleTab = (event: KeyboardEvent) => {
      const sheet = sheetRef.current;
      if (event.key !== 'Tab' || !sheet) {
        return;
      }
      const active = document.activeElement;
      const anchor = active instanceof HTMLElement && sheet.contains(active) ? active : null;
      const items = tabbableItems(sheet);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        event.preventDefault();
        if (!anchor) {
          sheet.focus({ preventScroll: true });
        }
        return;
      }
      if (!anchor) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      // Decide pela posição: o foco pode estar num elemento tabIndex={-1} fora da
      // lista, e comparar só com first/last deixaria o Tab escapar da folha.
      const has = (flag: number) =>
        items.some((item) => item !== anchor && (anchor.compareDocumentPosition(item) & flag) !== 0);
      if (event.shiftKey) {
        if (!has(Node.DOCUMENT_POSITION_PRECEDING)) {
          event.preventDefault();
          last.focus();
        }
      } else if (!has(Node.DOCUMENT_POSITION_FOLLOWING)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [status]);

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
