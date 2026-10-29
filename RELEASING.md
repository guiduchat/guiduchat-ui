# Como publicar uma versão do @guiduchat/ui

O kit é publicado no **GitHub Packages** como `@guiduchat/ui`, com versão semântica. Quem publica é o CI (`.github/workflows/publish.yml`), quando alguém cria uma tag `vX.Y.Z` na `main`. Ninguém publica da própria máquina.

## Passo a passo

1. **PR da versão:** numa branch, suba a `version` do `package.json` e escreva a seção da versão no `CHANGELOG.md` (o que entrou, o que mudou, o que quebra). Mudança que quebra ou mexe em tokens pede revisão da equipe console (`CODEOWNERS`).
2. **Merge na `main`** depois do CI verde.
3. **Tag:** na `main` atualizada, crie e envie a tag com a mesma versão:
   ```shell
   git tag v0.2.0
   git push origin v0.2.0
   ```
   Ou crie uma *release* no GitHub com a tag `v0.2.0`.
4. O workflow **Publish** confere que a tag é a versão do `package.json`, roda lint, typecheck, testes e build e publica. Acompanhe em Actions.

## Versão

- **Patch** (`0.2.1`): correção sem mudar a API nem o visual.
- **Minor** (`0.3.0`): componente ou prop nova; mudança de token sem quebrar. Antes da 1.0, mudança que quebra também sobe o minor, e o `CHANGELOG.md` diz o que ajustar.
- **Major**: depois da 1.0, só para mudança que quebra.

## Instalar no app

O token de leitura (só `read:packages`) fica na variável `GITHUB_PACKAGES_TOKEN` e no `~/.npmrc` de cada pessoa, nunca no repositório:

```
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

No `.npmrc` do app, só o registro: `@guiduchat:registry=https://npm.pkg.github.com`.
