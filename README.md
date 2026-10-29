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
import { brand, fontFamily, palette } from '@guiduchat/ui/tokens';
```

Sobre a cor principal (`brand.accent`, `#e1fb40`), o texto é sempre o escuro (`brand.onAccent`). Para texto, ícone e controle "da marca" sobre fundo claro, use `brand.accentStrong`: o limão sobre branco não tem contraste.

### Ícones

Os ícones das abas (Descubra, Locais, Conversas, Conta), voltar, sem conexão, aviso e informação são da [Phosphor Icons](https://phosphoricons.com) (MIT, `src/icons/LICENSE-phosphor`), copiados para o kit sem dependência.

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
