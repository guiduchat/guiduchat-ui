import { clsx } from 'clsx';
import {
  type ComponentProps,
  type FocusEvent,
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { type InnerClassNamesProp, type MergeProps } from '../../types';
import styles from './SwipeActions.module.scss';

/** Deslocamento (px) a partir do qual o gesto escolhe o eixo (horizontal ou vertical). */
export const SWIPE_AXIS_THRESHOLD = 8;
/** Fração da largura das ações que o arrasto precisa percorrer para abrir ou fechar a linha ao soltar. */
export const SWIPE_OPEN_RATIO = 1 / 3;
/** Tempo (ms) em que o clique que encerra o arrasto fica suprimido; depois disso o próximo toque vale. */
const SUPPRESS_CLICK_MS = 300;

export type SwipeActionTone = 'primary' | 'neutral';
export type SwipeActionsElementKey = 'row' | 'actions' | 'action';

export interface SwipeActionItem {
  id: string
  /** Nome acessível do botão, traduzido pelo app (por exemplo "Salvar" e "Excluir"). */
  label: string
  /** Ícone do botão, por exemplo `<Icon icon={icons.trash} />`. */
  icon: ReactNode
  /** `primary` é a cor de destaque; `neutral` é cinza. */
  tone?: SwipeActionTone
  onClick: () => void
}

interface SwipeActionsOwnProps {
  /** A linha em si, que desliza para a esquerda. */
  children: ReactNode
  /** Botões revelados atrás da linha, da esquerda para a direita. */
  actions: SwipeActionItem[]
  /** Linha aberta (ações à mostra). O app controla: assim só uma linha fica aberta. */
  open: boolean
  onOpenChange: (open: boolean) => void
  innerClassNames?: InnerClassNamesProp<SwipeActionsElementKey>
}

export type SwipeActionsProps = MergeProps<ComponentProps<'div'>, SwipeActionsOwnProps>;

type Gesture = { id: number, x: number, y: number, base: number, axis: 'x' | 'y' | null };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Linha que desliza para a esquerda e revela ações atrás dela.
 *
 * Gesto: o eixo é decidido no começo do movimento. Vertical, o navegador
 * rola a página (`touch-action: pan-y`); horizontal, a linha acompanha o
 * dedo. As ações ficam sempre no DOM: ao receber foco por teclado a linha
 * abre, e fechada elas não recebem clique por engano.
 */
export const SwipeActions = forwardRef<HTMLDivElement, SwipeActionsProps>((props, ref) => {
  const { children, actions, open, onOpenChange, innerClassNames, className, onKeyDown, ...rest } = props;

  const actionsRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState<number | null>(null);

  const gestureRef = useRef<Gesture | null>(null);
  const offsetRef = useRef(0);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openRef = useRef(open);
  openRef.current = open;
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  useEffect(() => () => {
    clearTimeout(suppressTimerRef.current);
  }, []);

  useLayoutEffect(() => {
    const element = actionsRef.current;
    if (!element) {
      return undefined;
    }
    const measure = () => setWidth(element.offsetWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [actions.length]);

  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (width === 0 || gestureRef.current || event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }
    gestureRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      base: openRef.current ? -width : 0,
      axis: null
    };
    movedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId || gesture.axis === 'y') {
      return;
    }
    // Mouse sem botão apertado: o botão foi solto fora da linha; encerra sem abrir nem fechar.
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      endGesture(event, false);
      return;
    }
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (gesture.axis === null) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_AXIS_THRESHOLD) {
        return;
      }
      // O eixo é escolhido uma vez. Vertical: solta o gesto e deixa a página rolar.
      gesture.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (gesture.axis === 'y') {
        return;
      }
      // A captura só começa no arrasto horizontal; assim o clique de toque simples não é desviado.
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    movedRef.current = true;
    offsetRef.current = clamp(gesture.base + dx, -width, 0);
    setDragOffset(offsetRef.current);
  };

  const endGesture = (event: PointerEvent<HTMLDivElement>, commit: boolean) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) {
      return;
    }
    gestureRef.current = null;
    setDragOffset(null);
    if (gesture.axis !== 'x') {
      return;
    }
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (movedRef.current) {
      // O clique que encerra o arrasto não deve acionar nada dentro da linha.
      suppressClickRef.current = true;
      clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = setTimeout(() => {
        suppressClickRef.current = false;
      }, SUPPRESS_CLICK_MS);
    }
    if (!commit) {
      return;
    }
    const delta = offsetRef.current - gesture.base;
    const limit = width * SWIPE_OPEN_RATIO;
    const next = openRef.current ? !(delta > limit) : delta < -limit;
    if (next !== openRef.current) {
      onOpenChangeRef.current(next);
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // Foco por teclado ou leitor de tela nas ações abre a linha; sair do conjunto fecha.
  const handleActionsFocus = () => {
    if (!openRef.current) {
      onOpenChangeRef.current(true);
    }
  };
  const handleActionsBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (openRef.current && !(next && rootRef.current?.contains(next))) {
      onOpenChangeRef.current(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.key === 'Escape' && openRef.current) {
      // Foco numa ação escondida deixaria o Enter acionando-a: devolve o foco à linha visível.
      if (actionsRef.current?.contains(document.activeElement)) {
        rowRef.current?.focus();
      }
      onOpenChangeRef.current(false);
    }
  };

  const dragging = dragOffset !== null;
  const offset = dragging ? dragOffset : (open ? -width : 0);

  return (
    <div
      ref={setRefs}
      className={clsx(styles.SwipeActions, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        ref={actionsRef}
        className={clsx(styles.SwipeActions__actions, { [styles.SwipeActions__actions_open]: open, [styles.SwipeActions__actions_visible]: open || dragging }, innerClassNames?.actions)}
        onFocus={handleActionsFocus}
        onBlur={handleActionsBlur}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={clsx(
              styles.SwipeActions__action,
              styles[`SwipeActions__action_tone_${action.tone ?? 'neutral'}`],
              innerClassNames?.action
            )}
            aria-label={action.label}
            onClick={action.onClick}
          >
            {action.icon}
          </button>
        ))}
      </div>
      <div
        ref={rowRef}
        tabIndex={-1}
        className={clsx(styles.SwipeActions__row, { [styles.SwipeActions__row_dragging]: dragging }, innerClassNames?.row)}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => endGesture(event, true)}
        onPointerCancel={(event) => endGesture(event, false)}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {children}
      </div>
    </div>
  );
});

SwipeActions.displayName = 'SwipeActions';
