# Guidu UI

Kit de componentes React do **guidu.chat** e dos **mini-apps Guidu**. Os componentes se adaptam
à plataforma (iOS, Android, desktop) e ao tema claro ou escuro.

> Baseado no [`@maxhub/max-ui`](https://github.com/max-messenger/max-ui) 0.7.0, de Vadim Tregubenko
> e colaboradores, sob licença MIT. Veja [LICENSE](LICENSE). Este projeto não tem relação com o MAX
> Messenger e não usa a marca dele.

## Onde é usado

- **guidu.chat** (PWA e app nativo): a interface do consumidor.
- **Mini-apps** servidos pelo console (`console.guidu.co`) e abertos dentro do guidu.chat.

O console (dashboard do comerciante) usa shadcn/ui. As cores de marca dos dois devem ficar alinhadas.

## Uso

```shell
pnpm add @guiduchat/ui
```

O pacote está no GitHub Packages: o `.npmrc` do app aponta `@guiduchat:registry=https://npm.pkg.github.com` e o token fica no `~/.npmrc` (veja [RELEASING.md](RELEASING.md)).

```tsx
import '@guiduchat/ui/styles.css';
import { GuiduUI, Button } from '@guiduchat/ui';

export const App = () => (
  <GuiduUI colorScheme="light" platform="ios">
    <Button>Olá</Button>
  </GuiduUI>
);
```

`GuiduUI` é o provedor raiz: define `platform` (`ios` | `android`) e `colorScheme` (`light` | `dark`) para toda a árvore. Sem as props, detecta pelo navegador.

### Next.js

O pacote principal já vem marcado com `'use client'`. Passe `colorScheme` e `platform` vindos do servidor (cabeçalho `Sec-CH-Prefers-Color-Scheme`, `User-Agent` e cookie de preferência): com as props, o `GuiduUI` não consulta o navegador, renderiza no servidor e a tela não pisca.

### Fonte

A fonte da marca é a **Outfit** (licença SIL OFL). O kit só declara a família; o app carrega a fonte. No Next.js, `next/font/google` com `Outfit`; no app Expo, `expo-font`.

### Tokens

`@guiduchat/ui/tokens` exporta as cores da marca, a fonte e os tokens de tema que dependem da marca em TypeScript puro, sem DOM e sem `'use client'`: serve ao app Expo e ao servidor.

```ts
import { brand, coupon, fontFamily, palette } from '@guiduchat/ui/tokens';
```

Sobre a cor principal (`brand.accent`, `#e1fb40`), o texto é sempre o escuro (`brand.onAccent`). Para texto, ícone e controle "da marca" sobre fundo claro, use `brand.accentStrong`: o limão sobre branco não tem contraste. `coupon` traz o verde do cupom das ofertas (`ticket` e `photo`), igual nos dois temas, com texto escuro por cima.

### Atores

O visual dos cartões tem dois atores (decisão do Marcelo, 01/11/2026). `hub` (padrão, a área da pessoa, Cliente Hub): cartão de fora mais escuro e o de dentro mais claro. `guidu` (telas da loja e do guidu): o contrário. Vale nos dois temas.

- **Como o app escolhe:** pela prop `actor` do `GuiduUI` (`<GuiduUI actor="guidu">`), que vira `data-actor` na raiz; ou por um `data-actor="guidu"` (ou `"hub"`) em qualquer elemento de dentro, que troca o ator só daquela parte. O mais próximo vale. Sem nada, é `hub`.
- **Tokens semânticos** (use estes nos componentes): `--surface-outer` (cartão de fora), `--surface-inner` (cartão de dentro), `--surface-band` (faixa ou quadro dentro do cartão de dentro), `--pager-inactive` e `--pager-active` (barrinhas do `Carousel`) e `--page-background` (fundo da página, igual nos dois atores). Os conjuntos por ator (`--surface-outer-guidu`, `--surface-outer-hub` etc.) vêm da paleta do tema; os valores estão em `surfaces` de `@guiduchat/ui/tokens`.
- `--background-secondary`, `--background-nested` e `--icon-mute` continuam como eram, para as outras peças.

### Ícones

Os ícones são da **Hugeicons, versão gratuita** (MIT, `THIRD_PARTY_LICENSES.md`), estilo de traço arredondado. O kit tem **um catálogo só** (`src/icons/catalog.ts`), com nomes por função (`search`, `cart`, `back`, `discover`...), que serve ao web e ao app nativo.

```tsx
import { Icon, icons } from '@guiduchat/ui';

<Icon icon={icons.search} />                 // 24 px, traço 1,5, cor do texto em volta
<Icon icon={icons.cart} label="Carrinho" />  // com nome para o leitor de tela
```

No app nativo, o catálogo vem da entrada `@guiduchat/ui/icons` (dados puros, sem DOM) e quem desenha é o `@hugeicons/react-native`.

**Acrescentar um ícone:** ache o nome na [Hugeicons](https://hugeicons.com) (filtro *Free*), importe **pelo caminho do ícone** em `catalog.ts` (`import X from '@hugeicons/core-free-icons/X'`) e dê um nome pela função. Nunca importe do índice `@hugeicons/core-free-icons`: ele traz os 6.000 ícones (o lint proíbe, e o `pnpm check:icons` confere o pacote). A versão Pro (estilos preenchidos) é uma decisão futura; trocar para ela muda só o catálogo.

## Desenvolvimento

```shell
pnpm install
pnpm storybook   # catálogo de componentes em http://localhost:6006
pnpm build       # gera dist/
pnpm lint
pnpm typecheck
pnpm test      # componentes e acessibilidade (axe) nos dois temas
```

Versões exatas e publicadas há pelo menos 14 dias (`pnpm-workspace.yaml`). Como publicar: [RELEASING.md](RELEASING.md).

## Pendências

- Traduzir os comentários do código e o `docs/MIGRATION.md` (não bloqueia).
- Equipes no `CODEOWNERS` quando a organização `guiduchat` tiver times.
- Paleta final quando o design entregar a identidade completa (só tokens).
- Hugeicons Pro (estilos preenchidos, como o ícone da aba ativa), se o Marcelo assinar.
