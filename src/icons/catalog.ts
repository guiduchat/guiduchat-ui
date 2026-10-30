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
import AppleIcon from '@hugeicons/core-free-icons/AppleIcon';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import ArrowRight02Icon from '@hugeicons/core-free-icons/ArrowRight02Icon';
import Attachment01Icon from '@hugeicons/core-free-icons/Attachment01Icon';
import Baby01Icon from '@hugeicons/core-free-icons/Baby01Icon';
import Bookmark01Icon from '@hugeicons/core-free-icons/Bookmark01Icon';
import BookmarkCheck01Icon from '@hugeicons/core-free-icons/BookmarkCheck01Icon';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import CancelCircleIcon from '@hugeicons/core-free-icons/CancelCircleIcon';
import Chat01Icon from '@hugeicons/core-free-icons/Chat01Icon';
import Clock01Icon from '@hugeicons/core-free-icons/Clock01Icon';
import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import DiscoverSquareIcon from '@hugeicons/core-free-icons/DiscoverSquareIcon';
import Dish01Icon from '@hugeicons/core-free-icons/Dish01Icon';
import DrinkIcon from '@hugeicons/core-free-icons/DrinkIcon';
import EyeIcon from '@hugeicons/core-free-icons/EyeIcon';
import EyeOffIcon from '@hugeicons/core-free-icons/EyeOffIcon';
import Facebook01Icon from '@hugeicons/core-free-icons/Facebook01Icon';
import FilterHorizontalIcon from '@hugeicons/core-free-icons/FilterHorizontalIcon';
import Globe02Icon from '@hugeicons/core-free-icons/Globe02Icon';
import GoogleIcon from '@hugeicons/core-free-icons/GoogleIcon';
import Image01Icon from '@hugeicons/core-free-icons/Image01Icon';
import InformationCircleIcon from '@hugeicons/core-free-icons/InformationCircleIcon';
import InstagramIcon from '@hugeicons/core-free-icons/InstagramIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import MapsIcon from '@hugeicons/core-free-icons/MapsIcon';
import Medal01Icon from '@hugeicons/core-free-icons/Medal01Icon';
import Menu01Icon from '@hugeicons/core-free-icons/Menu01Icon';
import Mic01Icon from '@hugeicons/core-free-icons/Mic01Icon';
import MoreHorizontalIcon from '@hugeicons/core-free-icons/MoreHorizontalIcon';
import NfcIcon from '@hugeicons/core-free-icons/NfcIcon';
import ParkingAreaCircleIcon from '@hugeicons/core-free-icons/ParkingAreaCircleIcon';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import SentIcon from '@hugeicons/core-free-icons/SentIcon';
import Share01Icon from '@hugeicons/core-free-icons/Share01Icon';
import ShoppingCart01Icon from '@hugeicons/core-free-icons/ShoppingCart01Icon';
import StarIcon from '@hugeicons/core-free-icons/StarIcon';
import Store01Icon from '@hugeicons/core-free-icons/Store01Icon';
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import ThumbsUpIcon from '@hugeicons/core-free-icons/ThumbsUpIcon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import TiktokIcon from '@hugeicons/core-free-icons/TiktokIcon';
import User02Icon from '@hugeicons/core-free-icons/User02Icon';
import WhatsappIcon from '@hugeicons/core-free-icons/WhatsappIcon';
import WheelchairIcon from '@hugeicons/core-free-icons/WheelchairIcon';
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
  // Chat (Composer e cabeçalho)
  attach: Attachment01Icon,
  mic: Mic01Icon,
  send: SentIcon,
  menu: Menu01Icon,
  // Perfil da loja
  call: CallIcon,
  mail: Mail01Icon,
  more: MoreHorizontalIcon,
  share: Share01Icon,
  map: MapsIcon,
  location: Location01Icon,
  website: Globe02Icon,
  clock: Clock01Icon,
  image: Image01Icon,
  arrowForward: ArrowRight02Icon,
  thumbsUp: ThumbsUpIcon,
  thumbsDown: ThumbsDownIcon,
  priceLevel: Medal01Icon,
  star: StarIcon,
  // Redes e provedores de avaliação
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  facebook: Facebook01Icon,
  tiktok: TiktokIcon,
  google: GoogleIcon,
  // Informações úteis da loja
  accessible: WheelchairIcon,
  parking: ParkingAreaCircleIcon,
  kids: Baby01Icon,
  card: CreditCardIcon,
  contactless: NfcIcon,
  food: Dish01Icon,
  drink: DrinkIcon,
  // Entrada e cadastro
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  apple: AppleIcon,
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
