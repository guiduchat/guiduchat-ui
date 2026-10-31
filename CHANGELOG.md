# Changelog do @guiduchat/ui

## 0.13.1 (BottomSheet: saída garantida e diálogo acessível)

Correção, sem mudar a API existente nem o visual. Atende Ofertas, `orders/[id]` e `places`.

- **Trava da saída:** fechar durante a animação de entrada gerava `animationcancel` e nenhum `transitionend`, e a folha ficava em `exiting` para sempre (película invisível de tela cheia e `body` com `overflow: hidden`). Agora um tempo limite de 300 ms desmonta a folha e tudo é limpo no unmount. Com `prefers-reduced-motion`, fecha na hora, e as animações são desligadas por CSS nesse caso. Se o app não fechar (`open` continua `true`) depois de um arrasto, a folha volta a `open` em vez de sumir.
- **Diálogo:** `role="dialog"`, `aria-modal="true"`, nome pelo título (`aria-labelledby`) ou pela prop nova `aria-label` quando não há título. O foco entra na folha ao abrir (se um filho já o moveu para dentro, não é tirado), o Tab fica preso nela e o foco volta ao gatilho ao fechar.
- **Textos:** o `aria-label` fixo em russo da alça saiu. Prop nova opcional `handleLabel` (texto traduzido pelo app); sem ela a alça fica oculta ao leitor de tela e fora do Tab (o teclado fecha com Esc). A região do `Snackbar` também tinha texto fixo em russo: prop nova opcional `regionLabel` no `SnackbarProvider` (`(placement) => string`); sem ela a região fica sem nome e sem `role="region"`. O kit não tem mais texto próprio em russo.
- **Arrasto curto:** abaixo de 80 px, a supressão do clique (`suppressClickRef`) ficava ligada e engolia o próximo toque na película. Agora ela é zerada no clique da folha e expira em 300 ms.
- **App:** passe `handleLabel` (e `aria-label` nas folhas sem título) e, se usar `Snackbar`, `regionLabel`. Nenhuma é obrigatória.

## 0.13.0 (ofertas)

Componentes da página de Ofertas, a partir do desenho do Marcelo de 31/10/2026. Só apresentação: textos, validade e ações vêm do app.

- **OfferCard** (novo): cupom com `appearance="ticket"` ou `"featured"` (foto de pelo menos 240 px com o cupom sobreposto), os dois com recortes laterais por máscara na altura da linha (no `featured` a foto aparece pelo buraco), linha tracejada de 2 px (traço de 10 px, vão de 6 px) e dois botões de largura igual, com hover e pressionado. Aceita `tag` para "Usado" e "Vencido". Sem botões, a linha e o rodapé somem; com um só, ele ocupa a largura toda.
- **Carousel** (novo): rolagem lateral com `scroll-snap`, sem barra, marcador de páginas em barrinhas (some com um item só), setas do teclado (sem tecla modificadora) e `prefers-reduced-motion` respeitado. `pagerLabel` é obrigatória. Os filhos são achatados e `null`, `undefined` e booleanos são descartados; um fragmento conta como uma página; sem filhos válidos nada é renderizado. `className`, `style`, `id`, `ref` e o resto vão para a raiz; `aria-label`, `aria-labelledby` e `onKeyDown` ficam na área de rolagem.
- **Tokens novos** nos dois temas: `--background-coupon` (#c4d4ca), `--background-coupon-photo` (#e9f2ed), `--states-background-coupon-hovered` (rgb(6 7 8 / 0.12)), `--states-background-coupon-pressed` (rgb(6 7 8 / 0.2)) e `--states-text-coupon-disabled` (#4a5651), iguais nos dois temas. Texto e ícone sobre o cupom usam `--text-primary-static` e `--icon-primary-static`. `coupon` também sai de `@guiduchat/ui/tokens`.
- **Ícones** no catálogo: `fashion`, `travel`, `health` e `otherCategory` (`food` já existia).
- **Teto do catálogo de ícones** (`check:icons`) de 50 para 56 KB: o catálogo passou a ter 68 ícones (51,4 KB).

## 0.12.0 (detalhes do pedido)

Componentes da página do pedido, a partir do modelo do Marcelo de 30/10/2026. Só apresentação: textos, valores e situação vêm do app.

- **OrderStatusCard**: código, situação e previsão.
- **ContactCard**: logo, nome, endereço e botões de contato.
- **ExpandablePanel**: quadro interno que abre com a seta.
- **PaymentPanel**: forma de pagamento, valor e orientação.
- **AddressPanel**: endereço com observação.
- **PersonRow**: pessoa com botões de contato.
- **OrderTimeline**: passos do pedido, com o atual marcado para o leitor de tela.
- **IconTile**: quadrado com ícone, comum aos quadros internos.
- **InfoCard**: `plain` tira o quadro interno, para o cartão receber vários quadros.
- **Ícones** no catálogo: `basket`, `wallet`, `navigation`, `note`, `timer` e `smartphone`.

## 0.11.1

- **Token novo** `--background-nested`: fundo do cartão interno. No tema escuro, InfoCard, OpeningHours, StatStrip e OrderSummaryCard mostravam o quadro interno da mesma cor do cartão externo; agora ele aparece mais claro.

## 0.11.0 (medidas dos cartões e pedidos)

Medidas definidas pelo Marcelo em 30/10/2026: cartão externo com raio de 24 px e margem interna de 12 px; cartão interno com raio de 20 px.

- **Token novo** `--size-border-radius-semantic-border-radius-surface` (24 px), usado por todos os cartões externos.
- **InfoCard, OpeningHours e StatStrip:** raio de 28 para 24 px e margem interna de 8 para 12 px.
- **HeaderCard:** margem interna de 20 para 12 px.
- **StoreHero:** capa com raio de 28 para 24 px. **PlaceCard:** raio de 20 para 24 px.
- **OrderSummaryCard** (novo): resumo de um pedido, com quadro interno, linha tracejada, total e botões do app.

## 0.10.0

- **Ícones** no catálogo: `home`, `forYou` e `coupon`, para o rodapé de quem tem conta e os cartões de Conta.

## 0.9.0 (configurações)

- **ShortcutCard** (novo): cartão de atalho com pílula ou título, texto e botão redondo; com `asChild`, vira o link do app.
- **Ícones** no catálogo: `arrowUpRight`, `orders` e `heart`.
- **CellSimple e demais componentes com `Tappable`:** a limpeza de estilo do `Tappable` apagava a margem interna e o fundo definidos pelo componente. As linhas de lista passam a ter a margem prevista.
- História "Configurações".

## 0.8.0 (entrada e cadastro)

Componentes de login, cadastro, código e recuperação de senha, a partir do modelo aprovado pelo Marcelo em 30/10/2026. Textos e ações vêm do app.

- **FormField**: rótulo, campo, ajuda e erro, ligados para o leitor de tela.
- **PhoneInput**: telefone com seletor de país e busca; a lista de países vem do app.
- **PasswordInput**: campo de senha com o olho.
- **OtpInput**: código por dígito. É um campo só por cima dos quadrados, para colar, apagar e o preenchimento automático funcionarem.
- **SocialButton**: Continuar com Google e com Apple.
- **TextDivider**: linha com "ou".
- **Ícones** no catálogo: `eye`, `eyeOff` e `apple`.

## 0.7.0 (perfil da loja)

Componentes da página do local, a partir do modelo do Marcelo de 30/10/2026. Só apresentação: textos, números e ações vêm do app.

- **StoreHero** e **ScoreBadge**: capa, logo sobreposta, nome, categoria, salvar e o selo da nota.
- **QuickActions** e **QuickAction**: fileira de ações com ícone e rótulo; com `asChild`, viram links `tel:` e `mailto:`.
- **StatStrip** e **StatStripItem**: quadro de colunas com rodapé opcional.
- **BentoGrid**, **BentoImage** e **ActionTile**: mosaico de fotos e blocos com seta.
- **InfoCard** e **InfoRow**: superfície com linhas de ícone, rótulo e valor (contato, redes sociais, informações úteis).
- **OpeningHours**: hoje e, ao expandir, a semana inteira.
- **RatingStars**: cinco estrelas com fração. A Hugeicons gratuita só tem traço, então o preenchimento vem do CSS.
- **ReviewSummary**, **ReviewCard** e **ReviewRail**: avaliações por provedor, com a marca por prop.
- **Ícones** no catálogo: `call`, `mail`, `more`, `share`, `map`, `location`, `website`, `clock`, `image`, `arrowForward`, `thumbsUp`, `thumbsDown`, `priceLevel`, `star`, `whatsapp`, `instagram`, `facebook`, `tiktok`, `google`, `accessible`, `parking`, `kids`, `card`, `contactless`, `food` e `drink`.

## 0.6.0 (chat)

- **Composer** (novo): caixa de mensagem no estilo dos chats de IA, pedida pelo Marcelo em 30/10/2026. Texto em cima (cresce até cerca de cinco linhas) e, embaixo, anexo, chave de modos (`chat | guidu bot`), áudio e enviar. Enter envia, Shift+Enter quebra a linha; o enviar fica desligado com o campo vazio. Textos e ações vêm do app.
- **MessageBubble** (novo): balões em pílula; os da pessoa na cor da marca, à direita, e os da loja e do guidu em cinza, à esquerda, com quem escreveu e a hora.
- **NavBarPill**: `subtitle`, segunda linha menor (quem fala em cima, a loja embaixo), dentro dos 40 px.
- **Ícones** no catálogo: `attach`, `mic`, `send` e `menu`.

## 0.5.2

- **Ícones do rodapé** (escolha do Marcelo, 30/10/2026): `discover` → `DiscoverSquareIcon`, `chats` → `Chat01Icon`, `account` → `User02Icon`. Mesmos nomes no catálogo; quem usa o kit não muda nada.

## 0.5.1

- **Tipos de `icons` e `Icon` na entrada principal:** na 0.5.0 o pacote tinha `dist/icons.js` e a pasta `dist/icons/` com o mesmo nome, e o TypeScript resolvia `./icons` para o `.js`, sem tipos: `import { icons } from '@guiduchat/ui'` não compilava. As entradas `icons` e `tokens` passam a ficar dentro das pastas (`dist/icons/index.js`, `dist/tokens/index.js`), ao lado dos tipos. O `pnpm check:icons` passa a barrar esse conflito de nomes.
- Os arquivos de teste deixam de gerar tipos no `dist`.

## 0.5.0 (Hugeicons)

Os ícones passam a ser da **Hugeicons, versão gratuita** (MIT), decisão do Marcelo em 30/10/2026.

- **Novo `Icon`**: `<Icon icon={icons.search} />`, 24 px, traço 1,5, cor do texto em volta; decorativo por padrão, `label` para ter nome.
- **Novo catálogo `icons`** com nomes por função: `discover`, `places`, `chats`, `account`, `back`, `cart`, `search`, `filter`, `add`, `save`, `saved`, `offline`, `warning`, `info`, `close`, `closeCircle`, `check`, `chevronRight`, `chevronDown`.
- **Nova entrada `@guiduchat/ui/icons`**: o catálogo em dados puros, sem DOM nem `'use client'`, para o app nativo (`@hugeicons/react-native`) e o servidor.
- Todos os componentes usam o catálogo; o salvar marcado do `PlaceCard` passa a ser o marcador com check (`saved`), porque a versão gratuita não tem o preenchido.
- **Quebra:** saem os `Icon16*`, `Icon20*` e `Icon24*` e os ícones da Phosphor. Troca: `Icon24CompassOutline` → `<Icon icon={icons.discover} />`, `Icon24StorefrontOutline` → `icons.places`, `Icon24ChatOutline` → `icons.chats`, `Icon24UserOutline` → `icons.account`, `Icon20WifiSlash` → `<Icon icon={icons.offline} size={20} />`, `Icon24Cart` → `icons.cart`, `Icon24ArrowLeft` → `icons.back`. Os `*Filled` não têm par na versão gratuita: a aba ativa usa o mesmo traço (`activeIcon` continua para a Pro).
- **Lint**: ícone só pelo catálogo; o índice `@hugeicons/core-free-icons` é proibido. **`pnpm check:icons`** confere que o pacote traz só os ícones do catálogo e que `dist/icons.js` fica abaixo de 30 KB.
- O build deixa de usar o `@svgr/rollup`. Pacote: `dist/index.js` 135 KB (era 152 KB) e `dist/icons.js` 12 KB.

## 0.4.2

- **HeaderCard:** ícone de filtros com 20 px (era 16).
- **HeaderCard** e **PlaceCard** (`minimal`): borda na mesma cor do fundo da busca (`--background-tertiary`), no lugar de `--divider-secondary`.

## 0.4.1

- **Ícones cortados:** o build tirava o `viewBox` dos ícones de 24 px (SVGO), e o ícone desenhado em outro tamanho saía cortado, como o filtro de 16 px do `HeaderCard`. O build mantém o `viewBox`, e o CI confere o pacote (`pnpm check:icons`).

## 0.4.0

- **HeaderCard** (ajustes do Marcelo, 30/10/2026): cantos de 24 px; pílula da busca com 48 px de altura e 4 px de espaçamento interno; botão de filtros com fundo redondo de 40 px e ícone de 16 px.
- **NavBar** (padrão do Marcelo, 30/10/2026): 60 px de altura, título sempre centralizado (iOS e Android); `center` para pôr outra coisa no lugar do título.
- **NavBarButton** (novo): botão redondo de 40 px com fundo, variantes `neutral` (voltar, menu) e `accent` (cor da marca, ex.: carrinho); `asChild` para link. **NavBarBackButton** passa a ser um `NavBarButton` com a seta.
- **NavBarPill** (novo): pílula do chat com o avatar e o nome do estabelecimento, no lugar do título.
- **Ícones** `Icon24ArrowLeft` e `Icon24Cart` (Phosphor, MIT).
- **NavBar**: no Android o título não fica mais à esquerda. **Muda o padrão.**
- **HeaderCard**: o título passa a ser `h2` por padrão (o `h1` da página fica no `NavBar`), com `titleAs` para trocar. **Muda o padrão:** quem dependia do `h1` passa `titleAs="h1"`.

## 0.3.0 (componentes do shell)

Os componentes que destravam o shell do guidu.chat (etapa 3) e a lista de Locais.

- **TabBar** e **TabBarItem**: rodapé com ícone em contorno na aba inativa e preenchido na ativa, rótulo embaixo e contador da marca. A aba ativa recebe `aria-current="page"`; o contador tem texto para leitor de tela (`countLabel`). Com `asChild`, cada aba vira o `<Link>` do app. Alvo de toque de 56 px.
- **NavBar** e **NavBarBackButton**: título (`h1`), voltar e ação; título no centro no iOS e à esquerda no Android. Voltar com 44 px e `asChild`.
- **Skeleton**: retângulo, círculo e linhas de texto; só visual, sem animação com movimento reduzido.
- **EmptyState**: ícone, título, explicação e ação (vazio e erro com "Tentar de novo").
- **Notice**: faixa de aviso (info, atenção, perigo) com `role="status"` e ação.
- **HeaderCard** e **MenuTabs** (PR #21): topo da página Locais, com saudação, busca, filtros e as abas Favoritos, Todos e Recomendados.
- **Ícones** (Phosphor, MIT): Descubra, Locais, Conversas e Conta em contorno e preenchido, voltar, sem conexão, aviso e informação.
- Testes de comportamento e de acessibilidade (axe) dos cinco nos dois temas; histórias no Storybook.

## 0.2.0 (UI0)

Primeira versão publicada, no GitHub Packages como `@guiduchat/ui`.

- **Nome e registro:** `@guiduchat/ui` (antes `@guidu/ui`, privado), publicado por tag pelo CI.
- **Marca guidu.chat:** cor principal `#e1fb40` com texto escuro (`#0b0c0d`) por cima; `#566600` para texto, ícone e controle da marca no tema claro; fonte Outfit. Saem as cores do MAX.
- **Novo token** `--text-on-accent`: texto do botão principal e do contador, escuro sobre a cor da marca.
- **`@guiduchat/ui/tokens`:** cores da marca, fonte e tokens de tema em TypeScript puro.
- **Next.js:** pacote principal com `'use client'`; `GuiduUI` renderiza no servidor e, com `colorScheme` e `platform` por prop, não consulta o navegador.
- **Peer dependencies:** `react` e `react-dom` `^19.2.0`.
- **Ferramentas:** pnpm 12, Node 24, versões exatas publicadas há 14 dias ou mais, CI com lint, typecheck, testes de componente e de acessibilidade (axe) e build; Storybook no GitHub Pages.

---

> Histórico herdado do `@maxhub/max-ui` até a versão 0.7.0, base deste projeto. As versões do Guidu UI recomeçam em 0.1.0.

# Changelog

Все заметные изменения этого проекта задокументированы в этом файле.
Формат основан на [Conventional Commits](https://conventionalcommits.org).

## [0.7.0](https://github.com/max-messenger/max-ui/compare/v0.6.0...v0.7.0) (2026-10-14)

### ✨ Новые возможности

* Компонент BottomSheet ([fd0cd1f](https://github.com/max-messenger/max-ui/commit/fd0cd1fa452f1f62b4db246cc54f32dd85b3a584))
* Компонент StatusBadge ([0d075c7](https://github.com/max-messenger/max-ui/commit/0d075c70cb6cde646caaf9603472edcce773bd07))
* Компонент Steps ([d7c368a](https://github.com/max-messenger/max-ui/commit/d7c368a0d3f55808683286fc122a5216c917bfb1))
* Реализовано закрытие BottomSheet с помощью drag&drop ([0e97fa0](https://github.com/max-messenger/max-ui/commit/0e97fa031ba694357ca095e960f6e25ed9a9cd92))
* Реализовано закрытие BottomSheet с помощью drag&drop ([bb7d773](https://github.com/max-messenger/max-ui/commit/bb7d773480b5a5660cbc41de869e7d586c90f2c7))

### 🐛 Исправления

* Исправлен импорт в компоненте BottomSheet ([019f115](https://github.com/max-messenger/max-ui/commit/019f115adc8a205d0790b9f1939c649f52558458))

### 🛠 Прочее

* Изменен рендер сторей Docs ([b387028](https://github.com/max-messenger/max-ui/commit/b38702830e1abcda89eccf23abbbbe8d0a2971f7))

## [0.6.0](https://github.com/max-messenger/max-ui/compare/v0.5.0...v0.6.0) (2026-10-05)

### ✨ Новые возможности

* Возможность прокидывать html props, изменен цвет снекбара ([83529fb](https://github.com/max-messenger/max-ui/commit/83529fb3678361056d09057dd6eab29051da9d68))
* Добавлен Snackbar ([bfc305e](https://github.com/max-messenger/max-ui/commit/bfc305eb5447d601cf089b39c3cabe0382212c3a))
* Компонент Segmented ([88144dc](https://github.com/max-messenger/max-ui/commit/88144dc4b1fba579edd4bc29b68f2683bc0a2739))
* Компонент Tabs ([87f1ca7](https://github.com/max-messenger/max-ui/commit/87f1ca7326fedd008e4fd9943abd7c49c2be9314))

### 🐛 Исправления

* fix deploy ([1df07bd](https://github.com/max-messenger/max-ui/commit/1df07bd7c740374cd40612c07654c3fade7c2e9f))
* fix deploy ([d9700b6](https://github.com/max-messenger/max-ui/commit/d9700b695a6da0d00665a2136adbfd7bea0dc867))
* fix deploy ([b16467c](https://github.com/max-messenger/max-ui/commit/b16467cfb733e69d74e5c4b41faafdf03db5c3d9))

## [0.5.0](https://github.com/max-messenger/max-ui/compare/v0.4.0...v0.5.0) (2026-09-15)

### ✨ Новые возможности

* Добавлен island режим для Cell компонетнов ([8719bcf](https://github.com/max-messenger/max-ui/commit/8719bcf3a24d29e12526088d9d16009f003bba6e))
* Добавлена радио кнопка ([e25ea1f](https://github.com/max-messenger/max-ui/commit/e25ea1f55342ca476c89b94a5b6679fb47cd3306))

### 🐛 Исправления

* **storybook:** исправлен оверлей для Docs ([bb98763](https://github.com/max-messenger/max-ui/commit/bb98763fc7ae089cebf18ef784bb6447898e66e0))

### 🛠 Прочее

* **deps-dev:** bump @eslint/js from 9.39.5 to 10.0.1 ([106c4ba](https://github.com/max-messenger/max-ui/commit/106c4ba33a04aab35cf4960e66a79e75aac34173))
* **deps-dev:** bump rollup from 4.62.3 to 4.63.1 ([35f8f4d](https://github.com/max-messenger/max-ui/commit/35f8f4d8e15fb717d3395bedcc64484b0cc5dc8a))
* **deps:** bump svgo ([3c83657](https://github.com/max-messenger/max-ui/commit/3c836573ecb85eb915ef57dc4369adc0d5636e73))
* Обновление линта и связанных с ним плагинов ([375e87f](https://github.com/max-messenger/max-ui/commit/375e87fbff2a5ec0332fcf9f037b7630ea4cc10b))

## [0.4.0](https://github.com/max-messenger/max-ui/compare/v0.3.2...v0.4.0) (2026-09-02)

### ✨ Новые возможности

* Актуализированы цветовые токены и привязки компонентов ([e5523cf](https://github.com/max-messenger/max-ui/commit/e5523cfba01dedcfe1faaf3e4238422b022dc8e9))
* **storybook:** добавлены матрицы компонентов и унифицированы controls ([4ca8926](https://github.com/max-messenger/max-ui/commit/4ca8926f0e8c387dc80fd9aa00f32f3c1143e86a))
* синхронизированы основы и компоненты с дизайн-системой ([28de836](https://github.com/max-messenger/max-ui/commit/28de836fffc4d4818be27ed429b8ef8e7388ecc1))

### 🐛 Исправления

* **storybook:** синхронизировано состояние очистки Input ([6d3edf9](https://github.com/max-messenger/max-ui/commit/6d3edf9fcf9961e45613e64c690637e4b2fc52b1))
* структура написания стиля приведена к общей ([09885fe](https://github.com/max-messenger/max-ui/commit/09885fe93a57a8c2200a067150bee7c3d067bf3a))
* добавлены настройка отступа body и настройка экспорты пакета ([ccc9f99](https://github.com/max-messenger/max-ui/commit/ccc9f99574510695fbf957c4f0bdf1ef748f953f))
* **storybook:** добавлены настройки Avatar и исправлены значения по умолчанию CellSimple ([52eb6d6](https://github.com/max-messenger/max-ui/commit/52eb6d6c723d445a64f31d819e5ac5dd7ca4cb0e))
* обновлено поведение компонентов и стили ([6fe8a94](https://github.com/max-messenger/max-ui/commit/6fe8a9419370dac16964b497af4eee27e9eaa8db))
* устранены расхождения компонентов после дизайн-аудита ([a6a3769](https://github.com/max-messenger/max-ui/commit/a6a3769dab0eadcd0cb9f03bd7147aa2655ec437))

### 🛠 Прочее

* **deps-dev:** bump @chromatic-com/storybook from 5.2.1 to 5.3.0 ([85eafd8](https://github.com/max-messenger/max-ui/commit/85eafd8ead204ad8c2a5d0c9b4870830b8c203de))
* **deps-dev:** bump @eslint/js from 9.39.5 to 10.0.1 ([e0026e4](https://github.com/max-messenger/max-ui/commit/e0026e4e3db0104bdc0ef0d6c15edb3525921205))
* **deps-dev:** bump @storybook/addon-docs from 10.5.5 to 10.5.10 ([16e0db8](https://github.com/max-messenger/max-ui/commit/16e0db8ee7059d894c8e6653c2a01b59bf5b6bc0))
* **deps-dev:** bump @storybook/addon-onboarding from 10.5.5 to 10.5.10 ([101df47](https://github.com/max-messenger/max-ui/commit/101df473c260890b429a456e13871f4d5d7eb331))
* **deps-dev:** bump @storybook/react-vite from 10.5.5 to 10.5.10 ([f97d198](https://github.com/max-messenger/max-ui/commit/f97d198a0bec8bbdcb35b8395b9dca656b2ce1eb))
* **deps-dev:** bump @types/node from 26.1.2 to 26.2.0 ([8c7a061](https://github.com/max-messenger/max-ui/commit/8c7a061fe3e3188a31db7054b94cfdbace442c9f))
* **deps-dev:** bump @typescript-eslint/parser from 8.65.0 to 8.67.0 ([9b014b3](https://github.com/max-messenger/max-ui/commit/9b014b3d06252255be8c816f096eadf10a36c50e))
* **deps:** bump actions/setup-node from 6 to 7 ([49f55bb](https://github.com/max-messenger/max-ui/commit/49f55bb19c14a6ed9183ff3bc3edba398eba03f9))
* **deps:** bump bitovi/github-actions-storybook-to-github-pages ([5139844](https://github.com/max-messenger/max-ui/commit/5139844eaf852797e268a5b02ece160e3d113a6e))
* **deps-dev:** bump release-it from 21.0.0 to 21.0.2 ([056257d](https://github.com/max-messenger/max-ui/commit/056257ddbbcd8db3bb4c88702bb3470af0d371fe))
* **deps-dev:** bump sass from 1.102.0 to 1.103.1 ([bbe4257](https://github.com/max-messenger/max-ui/commit/bbe4257bc6e3ab0a27fa4b33f4b24102de4beeee))
* **deps-dev:** bump typescript from 6.0.3 to 7.0.2 ([49591de](https://github.com/max-messenger/max-ui/commit/49591de4c8918abd59c36e1c0d12e80ad91291bb))
* обновить зависимости для устранения уязвимостей ([d7a21db](https://github.com/max-messenger/max-ui/commit/d7a21db4298926f3e9b8b7469e0c3fc903f6a749))
* обновление библиотек ([2c03a2b](https://github.com/max-messenger/max-ui/commit/2c03a2b8b50d4572859bb6202a8090097b19bcf0))
* обновление библиотек ([bf38b45](https://github.com/max-messenger/max-ui/commit/bf38b458c31a85244d8d4a07ff6b59bc57fa287a))

## [0.3.2](https://github.com/max-messenger/max-ui/compare/v0.3.1...v0.3.2) (2026-08-21)

### 🛠 Прочее

* обновлена сборка ([18dc4fc](https://github.com/max-messenger/max-ui/commit/18dc4fc519f68bd9f331d1eccc37e83a15f13b13))

## [0.3.1](https://github.com/max-messenger/max-ui/compare/v0.3.0...v0.3.1) (2026-08-21)

### 🛠 Прочее

* добавлен реекспорт internal компонентов ([e2899cf](https://github.com/max-messenger/max-ui/commit/e2899cf574cd3b314ad6ca1ccbe9239d77923d4c))

## [0.3.0](https://github.com/max-messenger/max-ui/compare/v0.2.1...v0.3.0) (2026-08-21)

### ✨ Новые возможности

* Актуализированы цветовые токены и привязки компонентов ([c37c7b6](https://github.com/max-messenger/max-ui/commit/c37c7b696fc8bdefd7a0b1dbf1c1ce6236f2274f))

### 🐛 Исправления

* Обновлены стили и состояния компонентов ([c3418a6](https://github.com/max-messenger/max-ui/commit/c3418a6bc5366c342c6f0b24e4f4eab8b6df0d48))

### ♻️ Рефакторинг

* Удалены устаревшие компоненты и пропсы ([1183a9c](https://github.com/max-messenger/max-ui/commit/1183a9c490e80e044cd4597b6aea914172471506))

### 📚 Документация

* Добавлен файл Figma ([d23cd83](https://github.com/max-messenger/max-ui/commit/d23cd83f6d79d21c2576622beb5d1f0f5c09273c))
* Добавлена информация про создание токена ([9d1a96f](https://github.com/max-messenger/max-ui/commit/9d1a96f9786b6b2a733078a155a8797753aa29f3))
* Обновлен readme.md ([b8d4a93](https://github.com/max-messenger/max-ui/commit/b8d4a93bd39b22286bf670a90454c6d78aebbd13))

### 🛠 Прочее

* синхронизирована версия package-lock ([6129eec](https://github.com/max-messenger/max-ui/commit/6129eecc1f0b0ddcd2b5c5a1a075918b4e458eec))

## [0.2.1](https://github.com/max-messenger/max-ui/compare/v0.2.0...v0.2.1) (2026-07-30)

### 📚 Документация

* Исправлена генерация CHANGELOG.md ([dd4f5f9](https://github.com/max-messenger/max-ui/commit/dd4f5f9e9a2d94bacc68fca3513660f1dbc80c49))

## 0.2.0 (2026-07-21)
### ✨ Новые возможности
* **AvatarText:** add dynamic font-size based on container size ([37bf410](https://github.com/max-messenger/max-ui/commit/37bf410e4de1aa093bc5bfad042c1a4fc0a716fe))
* **Input:** add withClearButton prop ([7618aaf](https://github.com/max-messenger/max-ui/commit/7618aaff4fdc23d781fa617b526630caf5a2e9b8))
* bump storybook ([a91329a](https://github.com/max-messenger/max-ui/commit/a91329a8cc9a08e1d78c43eddca9efa8e77b295d))
* export @radix-ui/react-slot components ([dce739a](https://github.com/max-messenger/max-ui/commit/dce739a8536ec7e63927d03d5053a37b745f16d6))
* name ([1cf3bc0](https://github.com/max-messenger/max-ui/commit/1cf3bc0553618ec843813b856be173190f9be599))
* **Button:** reduce CSS specificity by using :where() selector ([9bc28bf](https://github.com/max-messenger/max-ui/commit/9bc28bfc791d515944c07ea6e16f14b7c2022292))
* **Grid, Flex:** rename justify value 'between' to 'space-between' ([949a661](https://github.com/max-messenger/max-ui/commit/949a661cfa04458ec26deef154a83dc08c10f6e2))
* **components:** rename MaxUi to MaxUI ([9255ef3](https://github.com/max-messenger/max-ui/commit/9255ef3d7ff1d516680c546f2635850253bf25be))
* **Button, resetClickable:** set transparent tap-highlight-color ([56a5dda](https://github.com/max-messenger/max-ui/commit/56a5ddac06f9c388e10819bfa90474f5c44a9382))
* **Button, IconButton:** use switch-case instead of if-else for build objs ([0afd8b6](https://github.com/max-messenger/max-ui/commit/0afd8b6c5a7dc41a738183e0d527b3fe30a416e2))
* В Cell добавлены link, separator ([0c8c125](https://github.com/max-messenger/max-ui/commit/0c8c125dd826ad908eecba1c0418d501c3988d3a))
* Добавлен hint ([f0fe188](https://github.com/max-messenger/max-ui/commit/f0fe1883c1f2094f4441dee8e483ff871035ea05))
* Добавлена документация и инструменты для сборки релиза ([4109c8e](https://github.com/max-messenger/max-ui/commit/4109c8e0b1a91ecc7e907e9e9b1b17507637d039))
* изменение layout ([3e4748b](https://github.com/max-messenger/max-ui/commit/3e4748b187a779b7fe6869a2930e2a29078b4cfd))
* исправлен overlay ([6d0365b](https://github.com/max-messenger/max-ui/commit/6d0365bb56a7fcb5e9ab4276b30b7f56e29e3b26))
* исправлен overlay ([4701520](https://github.com/max-messenger/max-ui/commit/4701520adde1503b2c639b77d0a8d3bf472a3a42))
* Исправлено отображение статуса, ограничен размер ([644226e](https://github.com/max-messenger/max-ui/commit/644226edb4c07600a6279049eee20fcc9d439e58))
* Переписан AndroidSpinner без svg ([a1c7649](https://github.com/max-messenger/max-ui/commit/a1c7649abad86f4cdbd1e8940e4c2f6d750c6e65))
* Пересобран Input ([43a17e3](https://github.com/max-messenger/max-ui/commit/43a17e35a319a052f1acc40bb360866d24ad365f))
* Пересобран спиннер с разделением на платформы ([27ecd42](https://github.com/max-messenger/max-ui/commit/27ecd4275987ef46ea43fbba316458d26f0556fe))
* Реструктуризация библиотеки компонентов в соответствии с макетом ([ba2570c](https://github.com/max-messenger/max-ui/commit/ba2570c07eb22ef1b6a03289cee5f6934e599a11))
* Создана сторя для просмотра иконок ([fa00aa2](https://github.com/max-messenger/max-ui/commit/fa00aa2bc777887b9b7f5c3ee6be1512d0fd9d40))
* Создана сторя для просмотра палитры ([a3c3831](https://github.com/max-messenger/max-ui/commit/a3c38316e50e668c50b0d4948088588bb5bcd3eb))
* убран лишний аргумент, исправлена сторя для кнопки с каунтером ([0b82976](https://github.com/max-messenger/max-ui/commit/0b82976585c4a3a1135bc9bf81ffc0cd4137fdf3))
* Условный рендер hint-а ([97eaaa0](https://github.com/max-messenger/max-ui/commit/97eaaa09f000d2c8b58a9972e41e196fba537f58))
* Экспорт иконок ([3850804](https://github.com/max-messenger/max-ui/commit/38508042bc9f7f2f033b26405cce9db1c2f7ab69))
### 🐛 Исправления
* **IconButton:** add color fallback on :active state ([e0fbf7a](https://github.com/max-messenger/max-ui/commit/e0fbf7af16c0e8d50e0760408753df2721a0b0ec))
* **reset-clickable mixin:** add font-family: inherit ([1ed8ab6](https://github.com/max-messenger/max-ui/commit/1ed8ab693f4e9b20d99d1b04219b70ebed5b0d80))
* **Button, SearchInput, SvgButton, Tappable:** remove :hover on touchscreen ([56c115c](https://github.com/max-messenger/max-ui/commit/56c115cb045d4d8945ebc55a29473353510fbcab))
* typos fixes ([3b3cbc1](https://github.com/max-messenger/max-ui/commit/3b3cbc1d23cdbf5f2c8b1cf4463ad354710854d5))
* **AvatarIcon:** up-to-date background ([4f7c967](https://github.com/max-messenger/max-ui/commit/4f7c9676b99bfd3602d053205f1691102e37c612))
* **Input:** up-to-date background ([0b66334](https://github.com/max-messenger/max-ui/commit/0b6633402eb56d6dbadc790992f2c270ce529e19))
* **Spinner:** use inline-flex to fix rotate issue ([f5ecae2](https://github.com/max-messenger/max-ui/commit/f5ecae206834273b6100f8ab36dc4baff2656084))
### 🛠 Прочее
* **README:** add storybook shield ([c04299f](https://github.com/max-messenger/max-ui/commit/c04299f42b130eb9a9f745bc7584602d77884e53))
* **deps-dev:** bump @storybook/react from 8.5.8 to 9.1.10 ([1ef70f8](https://github.com/max-messenger/max-ui/commit/1ef70f8ff3cffd388646924a5a7678c2fdffb9ba))
* **deps-dev:** bump @types/react from 18.3.18 to 19.2.2 ([94f2441](https://github.com/max-messenger/max-ui/commit/94f24417d4127e11f9213bf161b24e6139895b60))
* **deps-dev:** bump storybook from 8.5.8 to 9.1.10 ([77d4860](https://github.com/max-messenger/max-ui/commit/77d4860dec14eecd0379f9446bdc30a13024b5e3))
* **package.json:** bump version to 0.1.6 ([ae6e3a3](https://github.com/max-messenger/max-ui/commit/ae6e3a3248db729b48608463507e1a1a8539b53b))
* **package.json:** bump version to 0.1.8 ([b6e1b63](https://github.com/max-messenger/max-ui/commit/b6e1b63a0ead05f3b3b3a203063d1f5222d65503))
* **package.json:** bump version ([283aed3](https://github.com/max-messenger/max-ui/commit/283aed395ca60e004536ddff578aee1854926535))
* **deps:** bump vite from 6.1.1 to 6.3.2 ([bce146c](https://github.com/max-messenger/max-ui/commit/bce146c9d4b993576fb30ecaaa02d509803807e4))
* **deps:** bump vite from 6.3.2 to 6.4.0 ([a934c9c](https://github.com/max-messenger/max-ui/commit/a934c9ce76dcec37f8d78ac07ac922ae8613d1a2))
* nothing ([1b70162](https://github.com/max-messenger/max-ui/commit/1b701620fcd6b099b2402d5d52f80f645f96d8db))
* trigger gh actions ([1ab5f91](https://github.com/max-messenger/max-ui/commit/1ab5f91240576cc3dc6451512bf3dc60f8b38fc8))
* **ProfileComposition:** update text ([a2811de](https://github.com/max-messenger/max-ui/commit/a2811dee9e6aacab3321763df11de15a7366d6bf))
* **package.json:** updated GitHub links ([0123bb5](https://github.com/max-messenger/max-ui/commit/0123bb5406787bb22e3ecf0a76c573649460ff1a))
