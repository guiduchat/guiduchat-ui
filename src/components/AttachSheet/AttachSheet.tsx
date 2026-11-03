import { ActionGrid, type ActionGridItem } from '../ActionGrid';
import { BottomSheet } from '../BottomSheet';
import styles from './AttachSheet.module.scss';

export interface AttachSheetProps {
  open: boolean
  onClose: () => void
  /** Nome da folha para o leitor de tela (ex.: "Anexar"), traduzido pelo app. */
  label: string
  /** Rótulo do X de fechar, traduzido pelo app. */
  closeLabel: string
  /** Rótulo da alça de arrastar, traduzido pelo app. */
  handleLabel?: string
  /** Os quadros (Câmera, Foto, Documento...). */
  items: ActionGridItem[]
}

/** Folha de anexos do chat: `BottomSheet` com X e a grade de ações. */
export const AttachSheet = ({ open, onClose, label, closeLabel, handleLabel, items }: AttachSheetProps) => (
  <BottomSheet
    open={open}
    onClose={onClose}
    aria-label={label}
    closeLabel={closeLabel}
    handleLabel={handleLabel}
    innerClassNames={{ sheet: styles.AttachSheet }}
  >
    {/* Sem nome no grupo: o diálogo já tem o mesmo nome e o leitor de tela falaria duas vezes. */}
    <div className={styles.AttachSheet__grid}>
      <ActionGrid items={items} />
    </div>
  </BottomSheet>
);
