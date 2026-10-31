import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useMemo } from 'react';
import { encode } from 'uqr';

import { type MergeProps } from '../../types';
import styles from './QrCode.module.scss';

/** Margem de silêncio exigida pela norma do QR, em módulos. */
const QUIET_ZONE = 4;

interface QrCodeOwnProps {
  /**
   * Conteúdo do código. É gerado no aparelho: não sai dele, não vai para log nem para atributo `data-*`.
   * Limite: 2.331 bytes em UTF-8 (versão 40 do QR, correção M). Acima disso o gerador lança "Data too long"
   * na renderização; o app deve mandar um código curto ou um link, não o dado inteiro.
   */
  value: string
  /** Nome para o leitor de tela, traduzido pelo app. Obrigatório. */
  'aria-label': string
  /** Lado do quadrado em px (margem de silêncio incluída). Sem ele, ocupa a largura do pai. */
  size?: number
}

export type QrCodeProps = MergeProps<Omit<ComponentProps<'svg'>, 'children' | 'viewBox' | 'role'>, QrCodeOwnProps>;

/** Traços do SVG: um retângulo horizontal por sequência de módulos escuros, já com a margem. */
export const matrixToPath = (matrix: boolean[][]) => {
  const commands: string[] = [];
  matrix.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (!row[x]) {
        x += 1;
        continue;
      }
      const start = x;
      while (x < row.length && row[x]) {
        x += 1;
      }
      commands.push(`M${start + QUIET_ZONE} ${y + QUIET_ZONE}h${x - start}v1h-${x - start}z`);
    }
  });
  return commands.join('');
};

/**
 * QR code em SVG. Sempre módulos escuros sobre fundo branco, nos dois temas:
 * o leitor de QR precisa desse contraste e da margem clara em volta, então este
 * é o único componente do kit que NÃO segue o tema (cores fixas de propósito).
 * Correção de erro média (M).
 */
export const QrCode = forwardRef<SVGSVGElement, QrCodeProps>((props, ref) => {
  const { value, size, className, ...rest } = props;
  const { path, total } = useMemo(() => {
    const matrix = encode(value, { ecc: 'M', border: 0 }).data;
    return { path: matrixToPath(matrix), total: matrix.length + QUIET_ZONE * 2 };
  }, [value]);

  return (
    <svg
      ref={ref}
      role="img"
      viewBox={`0 0 ${total} ${total}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={clsx(styles.QrCode, className)}
      {...rest}
    >
      <rect width={total} height={total} fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
  );
});

QrCode.displayName = 'QrCode';
