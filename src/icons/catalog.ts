// Catálogo dos ícones do guidu.chat: Hugeicons, versão gratuita (MIT,
// THIRD_PARTY_LICENSES.md). Dados puros, sem DOM: serve ao web (Icon do kit,
// @hugeicons/react) e ao app nativo (@hugeicons/react-native), pela entrada
// @guiduchat/ui/icons.
//
// Regras:
// - Um import por ícone, pelo caminho do ícone. Nunca do índice do pacote
//   ('@hugeicons/core-free-icons'), que puxa os 6.000 ícones (o lint proíbe).
// - Nomes por função, não pelo desenho: trocar de ícone, de coleção ou para a
//   Hugeicons Pro muda só este arquivo.
import Alert02Icon from '@hugeicons/core-free-icons/Alert02Icon';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import Bookmark01Icon from '@hugeicons/core-free-icons/Bookmark01Icon';
import BookmarkCheck01Icon from '@hugeicons/core-free-icons/BookmarkCheck01Icon';
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import CancelCircleIcon from '@hugeicons/core-free-icons/CancelCircleIcon';
import Chat01Icon from '@hugeicons/core-free-icons/Chat01Icon';
import DiscoverSquareIcon from '@hugeicons/core-free-icons/DiscoverSquareIcon';
import FilterHorizontalIcon from '@hugeicons/core-free-icons/FilterHorizontalIcon';
import InformationCircleIcon from '@hugeicons/core-free-icons/InformationCircleIcon';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import ShoppingCart01Icon from '@hugeicons/core-free-icons/ShoppingCart01Icon';
import Store01Icon from '@hugeicons/core-free-icons/Store01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import User02Icon from '@hugeicons/core-free-icons/User02Icon';
import WifiOff01Icon from '@hugeicons/core-free-icons/WifiOff01Icon';

/** Um ícone: a lista de traços do SVG (formato da Hugeicons). */
export type IconData = readonly (readonly [string, { readonly [key: string]: string | number }])[];

export const icons = {
  // Rodapé (TabBar), escolhidos pelo Marcelo em 30/10/2026
  discover: DiscoverSquareIcon,
  places: Store01Icon,
  chats: Chat01Icon,
  account: User02Icon,
  // Cabeçalho e ações
  back: ArrowLeft02Icon,
  cart: ShoppingCart01Icon,
  search: Search01Icon,
  filter: FilterHorizontalIcon,
  add: PlusSignIcon,
  save: Bookmark01Icon,
  saved: BookmarkCheck01Icon,
  // Avisos
  offline: WifiOff01Icon,
  warning: Alert02Icon,
  info: InformationCircleIcon,
  // Controles
  close: Cancel01Icon,
  closeCircle: CancelCircleIcon,
  check: Tick02Icon,
  chevronRight: ArrowRight01Icon,
  chevronDown: ArrowDown01Icon
} satisfies Record<string, IconData>;

export type IconName = keyof typeof icons;
