# Relatório de Auditoria de Segurança

**Projeto:** `webdevrj` / landing page Rafael Neves  
**Data da auditoria:** 10 de agosto de 2026  
**Escopo:** análise somente leitura do código, configurações, dependências instaladas e histórico Git local. Nenhuma correção, instalação ou reconfiguração foi aplicada.

## Resumo executivo

O projeto é uma landing page React renderizada com TanStack Start; portanto, não é estritamente uma SPA estática, pois gera um worker SSR com Nitro para Cloudflare. O formulário de orçamento valida dados no navegador e abre o WhatsApp, sem gravá-los em backend próprio. Não foram encontrados tokens, chaves ou credenciais no código atual nem na varredura simples de todos os commits. Os principais riscos são a ausência de cabeçalhos HTTP defensivos documentados, dois pacotes transitivos com vulnerabilidade alta e regras incompletas para ignorar arquivos de ambiente/credenciais. Também há dois gerenciadores de pacotes/lockfiles ativos, o que pode produzir builds diferentes. O componente genérico de gráficos contém uso latente de `dangerouslySetInnerHTML`, embora não seja importado pela landing page atual. Não há evidência de sourcemaps publicados, scripts externos, analytics ou armazenamento de dados sensíveis no navegador. Questões sobre segurança do domínio, TLS, WAF, acessos e rollback precisam ser confirmadas fora do repositório.

## Stack e tecnologias confirmadas

### Visão geral

| Item                      | Evidência e versão confirmada                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework de UI           | React `19.2.8` instalado (`^19.2.0` declarado)                                                                                                                         |
| Framework full-stack/SSR  | TanStack Start `1.168.34`; roteamento por arquivos e worker SSR                                                                                                        |
| Linguagem                 | TypeScript `5.9.3` instalado (`^5.8.3` declarado), modo `strict`, alvo ES2022                                                                                          |
| Estilos                   | Tailwind CSS `4.3.3` via `@tailwindcss/vite`; não há `tailwind.config.*` separado                                                                                      |
| Bundler                   | Vite `8.2.0`                                                                                                                                                           |
| Runtime de servidor/build | Nitro `3.0.260603-beta`, preset Cloudflare fornecido por `@lovable.dev/vite-tanstack-config`                                                                           |
| Node esperado             | Não fixado pelo projeto (`engines`, `.nvmrc` e `.node-version` ausentes). Vite 8 exige `^20.19.0                                                                       |     | >=22.12.0`. Ambiente auditado: Node `22.14.0`, npm `10.9.2` |
| Gerenciador de pacotes    | Ambíguo: npm (`package-lock.json`) e Bun (`bun.lock` + `bunfig.toml`) estão commitados; README orienta npm                                                             |
| Formulários               | React Hook Form `7.83.0`, resolvers `5.5.7`, Zod `3.25.76`                                                                                                             |
| Animações/ícones          | Motion `12.43.0`, Lucide React `0.575.0`                                                                                                                               |
| Backend próprio           | Não há API de negócio, banco, server functions ou persistência. Há infraestrutura SSR (`src/server.ts`, `src/start.ts`) e middleware CSRF para futuras `serverFn`      |
| Hospedagem                | README aponta `https://webdevrj.lovable.app`; build gera worker compatível com Cloudflare. O mecanismo exato de publicação/conta não está definido em workflow no repo |
| Configuração Vite         | Centralizada em `@lovable.dev/vite-tanstack-config`; `vite.config.ts` seleciona `src/server.ts` como entrada SSR                                                       |
| PostCSS                   | Usado transitivamente pelo toolchain; não há `postcss.config.*` próprio                                                                                                |
| Sourcemaps                | `build.sourcemap` não está habilitado explicitamente e nenhum `.map` foi encontrado no build atual                                                                     |

### Dependências de produção

As versões “declarada” vêm de `package.json`; as versões “resolvida” foram lidas de `node_modules`/lockfile durante a auditoria.

| Pacote                            |   Declarada |  Resolvida |
| --------------------------------- | ----------: | ---------: |
| `@hookform/resolvers`             |    `^5.2.2` |    `5.5.7` |
| `@radix-ui/react-accordion`       |   `^1.2.12` |   `1.2.20` |
| `@radix-ui/react-alert-dialog`    |   `^1.1.15` |   `1.1.23` |
| `@radix-ui/react-aspect-ratio`    |    `^1.1.8` |   `1.1.15` |
| `@radix-ui/react-avatar`          |   `^1.1.11` |    `1.2.6` |
| `@radix-ui/react-checkbox`        |    `^1.3.3` |   `1.3.11` |
| `@radix-ui/react-collapsible`     |   `^1.1.12` |   `1.1.20` |
| `@radix-ui/react-context-menu`    |   `^2.2.16` |    `2.3.7` |
| `@radix-ui/react-dialog`          |   `^1.1.15` |   `1.1.23` |
| `@radix-ui/react-dropdown-menu`   |   `^2.1.16` |   `2.1.24` |
| `@radix-ui/react-hover-card`      |   `^1.1.15` |   `1.1.23` |
| `@radix-ui/react-label`           |    `^2.1.8` |   `2.1.15` |
| `@radix-ui/react-menubar`         |   `^1.1.16` |   `1.1.24` |
| `@radix-ui/react-navigation-menu` |   `^1.2.14` |   `1.2.22` |
| `@radix-ui/react-popover`         |   `^1.1.15` |   `1.1.23` |
| `@radix-ui/react-progress`        |    `^1.1.8` |   `1.1.16` |
| `@radix-ui/react-radio-group`     |    `^1.3.8` |    `1.4.7` |
| `@radix-ui/react-scroll-area`     |   `^1.2.10` |   `1.2.18` |
| `@radix-ui/react-select`          |    `^2.2.6` |    `2.3.7` |
| `@radix-ui/react-separator`       |    `^1.1.8` |   `1.1.15` |
| `@radix-ui/react-slider`          |    `^1.3.6` |    `1.4.7` |
| `@radix-ui/react-slot`            |    `^1.2.4` |    `1.3.3` |
| `@radix-ui/react-switch`          |    `^1.2.6` |    `1.3.7` |
| `@radix-ui/react-tabs`            |   `^1.1.13` |   `1.1.21` |
| `@radix-ui/react-toggle`          |   `^1.1.10` |   `1.1.18` |
| `@radix-ui/react-toggle-group`    |   `^1.1.11` |   `1.1.19` |
| `@radix-ui/react-tooltip`         |    `^1.2.8` |   `1.2.16` |
| `@tailwindcss/vite`               |    `^4.2.1` |    `4.3.3` |
| `@tanstack/react-query`           |  `^5.101.1` |  `5.101.4` |
| `@tanstack/react-router`          | `^1.170.16` | `1.170.18` |
| `@tanstack/react-start`           | `^1.168.26` | `1.168.34` |
| `@tanstack/router-plugin`         | `^1.168.18` | `1.168.23` |
| `class-variance-authority`        |    `^0.7.1` |    `0.7.1` |
| `clsx`                            |    `^2.1.1` |    `2.1.1` |
| `cmdk`                            |    `^1.1.1` |    `1.1.1` |
| `date-fns`                        |    `^4.1.0` |    `4.4.0` |
| `embla-carousel-react`            |    `^8.6.0` |    `8.6.0` |
| `input-otp`                       |    `^1.4.2` |    `1.4.2` |
| `lenis`                           |   `^1.3.26` |   `1.3.26` |
| `lucide-react`                    |  `^0.575.0` |  `0.575.0` |
| `motion`                          |  `^12.43.0` |  `12.43.0` |
| `react`                           |   `^19.2.0` |   `19.2.8` |
| `react-day-picker`                |   `^9.14.0` |   `9.14.0` |
| `react-dom`                       |   `^19.2.0` |   `19.2.8` |
| `react-hook-form`                 |   `^7.71.2` |   `7.83.0` |
| `react-resizable-panels`          |    `^4.6.5` |   `4.12.2` |
| `recharts`                        |   `^2.15.4` |   `2.15.4` |
| `sonner`                          |    `^2.0.7` |    `2.0.7` |
| `tailwind-merge`                  |    `^3.5.0` |    `3.6.0` |
| `tailwindcss`                     |    `^4.2.1` |    `4.3.3` |
| `tw-animate-css`                  |    `^1.3.4` |    `1.4.0` |
| `vaul`                            |    `^1.1.2` |    `1.1.2` |
| `vite-tsconfig-paths`             |    `^6.0.2` |    `6.1.1` |
| `zod`                             |   `^3.24.2` |  `3.25.76` |

### Dependências de desenvolvimento

| Pacote                              |         Declarada |         Resolvida |
| ----------------------------------- | ----------------: | ----------------: |
| `@eslint/js`                        |         `^9.32.0` |          `9.39.5` |
| `@lovable.dev/vite-tanstack-config` |          `^2.8.0` |           `2.8.3` |
| `@types/node`                       |        `^22.16.5` |         `22.20.1` |
| `@types/react`                      |         `^19.2.0` |         `19.2.18` |
| `@types/react-dom`                  |         `^19.2.0` |          `19.2.4` |
| `@vitejs/plugin-react`              |          `^5.2.0` |           `5.2.0` |
| `eslint`                            |         `^9.32.0` |          `9.39.5` |
| `eslint-config-prettier`            |         `^10.1.1` |          `10.1.8` |
| `eslint-plugin-prettier`            |          `^5.2.6` |           `5.5.6` |
| `eslint-plugin-react-hooks`         |          `^5.2.0` |           `5.2.0` |
| `eslint-plugin-react-refresh`       |         `^0.4.20` |          `0.4.26` |
| `globals`                           |        `^15.15.0` |         `15.15.0` |
| `nitro`                             | `3.0.260603-beta` | `3.0.260603-beta` |
| `prettier`                          |          `^3.7.3` |           `3.9.6` |
| `typescript`                        |          `^5.8.3` |           `5.9.3` |
| `typescript-eslint`                 |         `^8.56.1` |          `8.65.0` |
| `vite`                              |          `^8.1.5` |           `8.2.0` |

### Atualizações relevantes encontradas

`npm outdated` encontrou atualizações dentro da faixa atual para TanStack Start/Router, Vite, Lovable config, React Hook Form, Sonner e TypeScript ESLint. Também há novas versões principais de ESLint, plugin React, Motion, Recharts, Zod, React Day Picker e outras; versões principais exigem teste de migração e não devem ser atualizadas automaticamente. O status “desatualizado” por si só não significa vulnerabilidade. As duas correções de segurança confirmadas estão na seção específica abaixo.

### Scripts de instalação e integridade

- O `package.json` raiz não contém `preinstall`, `install` ou `postinstall`.
- Nenhum pacote direto instalado declarou `preinstall`, `install` ou `postinstall` na inspeção realizada. Isso não elimina scripts em dependências transitivas.
- `package-lock.json` e `bun.lock` estão commitados e contêm hashes de integridade, mas manter os dois cria ambiguidade sobre qual árvore é a fonte oficial.
- `bunfig.toml` habilita uma proteção positiva de supply chain: versões publicadas há menos de 24 horas são bloqueadas, com exceções Lovable explícitas.

## Estrutura do projeto

```text
webdevrj/
├── .git/                         # histórico e metadados Git locais
├── .lovable/
│   └── project.json              # identificação do template Lovable
├── public/
│   ├── favicon.ico               # ícone público
│   └── robots.txt                # diretivas para crawlers
├── src/
│   ├── assets/                   # fotos e imagens locais dos projetos
│   ├── components/
│   │   ├── landing/              # seções e componentes específicos da landing page
│   │   ├── ui/                   # biblioteca genérica de componentes de interface
│   │   └── AnimatedButton.tsx    # CTA animado compartilhado
│   ├── hooks/                    # hooks de viewport/mobile e rolagem Lenis
│   ├── lib/                      # utilitários e captura/tratamento de erros
│   ├── routes/
│   │   ├── __root.tsx            # shell HTML, metadados, fontes e boundaries
│   │   └── index.tsx             # rota `/`, JSON-LD e composição da landing page
│   ├── router.tsx                # criação do TanStack Router/QueryClient
│   ├── routeTree.gen.ts          # árvore de rotas gerada
│   ├── start.ts                  # middleware global e CSRF para server functions
│   ├── server.ts                 # entrada SSR/worker e normalização de erros 500
│   └── styles.css                # Tailwind 4, tokens, utilitários e animações globais
├── .gitignore                    # exclusões do Git
├── bun.lock                      # lockfile Bun
├── bunfig.toml                   # política de instalação Bun
├── package-lock.json             # lockfile npm
├── package.json                  # scripts e dependências
├── tsconfig.json                 # TypeScript estrito/ES2022
└── vite.config.ts                # integração Lovable + TanStack Start/Nitro
```

### Pontos de entrada

- `vite.config.ts`: entrada do toolchain e configuração da entrada SSR.
- `src/server.ts`: handler `fetch` do worker SSR.
- `src/start.ts`: configuração da instância TanStack Start e middlewares.
- `src/router.tsx`: fábrica do roteador da aplicação.
- `src/routes/__root.tsx`: documento HTML, `<head>`, scripts do framework e layout raiz.
- `src/routes/index.tsx`: rota pública `/` e composição da página.
- Não existem `index.html` ou `main.tsx` próprios; TanStack Start/Vite geram as entradas cliente/servidor.

### Arquivos sensíveis e `.gitignore`

- Não foram encontrados `.env`, `.env.*`, certificados, chaves privadas ou arquivos de credenciais no workspace auditado.
- A varredura simples do HEAD e de todos os commits, por `API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `sk-`, `AKIA`, tokens GitHub/Slack e blocos de chave privada, não encontrou segredo provável fora de lockfiles.
- `node_modules`, `dist`, `.output`, `.wrangler` e `.dev.vars` estão ignorados.
- `.env.local` é coberto indiretamente por `*.local`, mas `.env`, `.env.production`, `.env.development` e nomes genéricos de credenciais **não** estão ignorados.
- `dist` está ignorado, porém um diretório chamado literalmente `build` não está.
- O histórico não contém nomes de arquivos sensíveis detectáveis pelos padrões usados.
- Esta é uma varredura simples por padrões, não substitui Gitleaks/TruffleHog com verificação de entropia e provedores.

## Resultado do checklist de segurança

| Item                                            | Status            |           Risco | Justificativa                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------- | ----------------- | --------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dangerouslySetInnerHTML` / DOM sem sanitização | **VULNERÁVEL**    | Médio (latente) | `src/components/ui/chart.tsx` monta CSS a partir de `id` e `config` e injeta com `dangerouslySetInnerHTML`. O componente não é importado pela landing atual, reduzindo a exposição, mas valores futuros não confiáveis poderiam criar injeção. Não há outras manipulações diretas de HTML encontradas.                           |
| Segredos em variáveis `VITE_*`                  | **OK**            |           Baixo | Não foram encontrados `VITE_*` nem `import.meta.env` no código do projeto. A configuração Lovable suporta injeção `VITE_*`; qualquer uso futuro deve conter apenas dados públicos.                                                                                                                                               |
| Chaves/tokens hardcoded em TS/TSX/JS            | **OK**            |           Baixo | Nenhuma credencial provável foi encontrada. Telefones, e-mails e URLs públicos não são segredos.                                                                                                                                                                                                                                 |
| Scripts externos de terceiros e SRI             | **NÃO SE APLICA** |           Baixo | Não há `<script src="...">` externo, analytics, pixels ou widgets. O JSON-LD inline é conteúdo próprio.                                                                                                                                                                                                                          |
| Fontes/CDNs externos                            | **VULNERÁVEL**    |           Baixo | CSS e fontes são carregados de `fonts.googleapis.com`/`fonts.gstatic.com`, origem conhecida, mas sem SRI e com requisição a terceiro. SRI em CSS dinâmico do Google Fonts é operacionalmente difícil; auto-hospedagem reduz privacidade e supply chain.                                                                          |
| CSP                                             | **VULNERÁVEL**    |            Alto | Nenhuma CSP foi encontrada em meta tag, fonte de configuração ou `_headers` gerado. O uso de estilos/scripts do framework e Google Fonts exigirá uma política testada.                                                                                                                                                           |
| `X-Frame-Options` / proteção contra framing     | **VULNERÁVEL**    |           Médio | Não há `X-Frame-Options` nem `frame-ancestors` em CSP no repositório.                                                                                                                                                                                                                                                            |
| `X-Content-Type-Options`                        | **VULNERÁVEL**    |           Médio | Não foi encontrado `X-Content-Type-Options: nosniff`.                                                                                                                                                                                                                                                                            |
| `Referrer-Policy`                               | **VULNERÁVEL**    |           Médio | Não há política explícita; o comportamento fica a cargo do navegador/provedor.                                                                                                                                                                                                                                                   |
| HSTS                                            | **VULNERÁVEL**    |           Médio | Não há `Strict-Transport-Security` configurado no repositório. É necessário confirmar HTTPS e política no host antes de habilitar.                                                                                                                                                                                               |
| Sourcemaps de produção                          | **OK**            |           Baixo | `build.sourcemap` não está habilitado e nenhum `.map` foi encontrado em `.output`.                                                                                                                                                                                                                                               |
| Validação do formulário                         | **OK**            |           Baixo | Zod valida tipo, obrigatoriedade, trim e limites no cliente. Os dados são codificados com `encodeURIComponent` e abrem `wa.me`; não são renderizados como HTML.                                                                                                                                                                  |
| Validação server-side / sanitização             | **NÃO SE APLICA** |           Baixo | Não existe endpoint próprio recebendo o formulário. O WhatsApp é aberto pelo navegador; portanto não há servidor local onde repetir validação. Se surgir backend, validação client-side não poderá ser reutilizada como controle de segurança suficiente.                                                                        |
| Anti-spam, CAPTCHA, honeypot e rate limit       | **NÃO SE APLICA** |           Baixo | Não há endpoint de envio que possa ser automatizado contra a infraestrutura do projeto. A experiência leva o usuário ao WhatsApp. Abuso do número/WhatsApp deve ser tratado na plataforma e operação.                                                                                                                            |
| Downloads e path traversal                      | **NÃO SE APLICA** |           Baixo | Não existem endpoints ou links de download dinâmico. Assets são imports estáticos.                                                                                                                                                                                                                                               |
| CORS                                            | **NÃO SE APLICA** |           Baixo | Não há API própria nem chamada `fetch` de negócio. O `fetch` de `src/server.ts` é a interface do worker, não uma política CORS.                                                                                                                                                                                                  |
| CSRF                                            | **OK**            |           Baixo | `src/start.ts` reinstala explicitamente `createCsrfMiddleware` para handlers `serverFn`. Não há `serverFn` de negócio atualmente.                                                                                                                                                                                                |
| Cookies/localStorage/sessionStorage             | **NÃO SE APLICA** |           Baixo | A landing não usa armazenamento sensível. Um componente genérico `sidebar.tsx`, atualmente não usado, grava cookie de preferência sem `Secure`/`SameSite`; ele não contém dados sensíveis, mas deve ser revisto se passar a ser usado.                                                                                           |
| Dependências abandonadas/fontes não oficiais    | **OK**            |           Médio | Pacotes diretos vêm do npm e são bibliotecas conhecidas; nenhuma URL Git/tarball direta foi encontrada. Há, contudo, duas vulnerabilidades transitivas e uso de Nitro beta.                                                                                                                                                      |
| Exposição de `.git`/intermediários no deploy    | **NÃO SE APLICA** |   Indeterminado | `.output`, `.wrangler`, `.nitro` e artefatos são ignorados; o build Cloudflare publica assets/worker. A resposta do ambiente ao vivo e a configuração real do host não foram auditadas.                                                                                                                                          |
| LGPD e transparência                            | **VULNERÁVEL**    |           Médio | O formulário coleta nome e informações comerciais e as encaminha ao WhatsApp. Há nota de não armazenamento no servidor, mas não foi encontrada política/aviso completo com controlador, finalidade, base legal, retenção no WhatsApp, compartilhamento e direitos do titular. Não há analytics/cookies de marketing encontrados. |
| Backup, CI/CD e rollback                        | **VULNERÁVEL**    |           Médio | Git remoto e sincronização Lovable fornecem histórico, mas não há `.github/workflows`, tags/releases, política de branches ou configuração versionada de rollback/deploy. O mecanismo do painel Lovable precisa ser confirmado.                                                                                                  |
| Integridade/reprodutibilidade do build          | **VULNERÁVEL**    |           Médio | Dois lockfiles (`package-lock.json` e `bun.lock`) permitem árvores divergentes e não há `packageManager` fixado. A versão de Node também não está fixada pelo projeto.                                                                                                                                                           |
| Segredos no histórico Git                       | **OK**            |           Médio | A varredura simples de todos os commits não retornou padrões de credenciais. O resultado deve ser complementado por scanner dedicado antes de tornar o repositório público ou após incidentes.                                                                                                                                   |
| Error handling/logs                             | **OK**            |           Baixo | Erros SSR são normalizados e detalhes não são devolvidos em JSON ao visitante. Stacks são enviados a logs/integração Lovable; é necessário garantir fora do repo que logs não recebam dados pessoais no futuro.                                                                                                                  |

## Vulnerabilidades de dependências

Resultado de `npm audit --json`: **0 críticas, 2 altas, 0 moderadas, 0 baixas** em 491 dependências contabilizadas.

| Pacote    | Severidade | Versão atual |     Versão corrigida | Caminho/observação                                                                                                                                      |
| --------- | ---------: | -----------: | -------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `js-yaml` |       Alta |      `4.3.0` |  `4.3.1` ou superior | GHSA-5p4m-2wfm-xmqj, consumo quadrático de CPU em resolução `!!omap`. Transitiva por ESLint e também `xmlbuilder2`/TanStack Start; correção disponível. |
| `nanoid`  |       Alta |     `3.3.16` | `3.3.17` ou superior | GHSA-2v37-7h3g-55p8, geradores customizados podem entrar em loop com tamanho zero. Transitiva por `postcss@8.5.25` via Vite; correção disponível.       |

As duas dependências aparecem principalmente na cadeia de ferramentas/build. Isso reduz a exposição direta no navegador, mas não elimina risco em CI, máquinas de desenvolvimento ou processamento futuro de entrada não confiável.

## Roadmap de correção priorizado

### 🔴 Crítico — corrigir antes de qualquer outra coisa

Nenhum segredo exposto ou vulnerabilidade crítica foi identificado nesta auditoria. Se a configuração publicada estiver expondo `.git`, servindo por HTTP ou contendo credenciais fora do repo, esses fatos mudariam imediatamente a prioridade para crítica.

### 🟠 Alto

| Ação                                                                                                                                  | Por que importa                                                                                                                             |     Esforço |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------: |
| Corrigir `js-yaml` e `nanoid` por atualização controlada do lockfile/dependências ancestrais                                          | Elimina duas vulnerabilidades altas confirmadas na cadeia de desenvolvimento/build.                                                         | Baixo/Médio |
| Definir cabeçalhos no host/worker, começando por CSP em modo `Report-Only`, `nosniff`, política de referrer e proteção contra framing | Reduz impacto de XSS, clickjacking, MIME sniffing e vazamento de origem. CSP deve considerar scripts gerados pelo framework e Google Fonts. |       Médio |
| Verificar HTTPS real e então configurar HSTS com rollout seguro                                                                       | Impede downgrade para HTTP; configuração incorreta antes de validar subdomínios pode causar indisponibilidade.                              | Baixo/Médio |

### 🟡 Médio

| Ação                                                                                                                     | Por que importa                                                                                 |     Esforço |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ----------: |
| Ampliar `.gitignore` para `.env`, `.env.*` com exceção de exemplos, credenciais/chaves comuns e `build/`                 | Evita inclusão acidental de segredos e artefatos em commits futuros.                            |       Baixo |
| Escolher npm ou Bun, remover a ambiguidade entre lockfiles e declarar `packageManager`                                   | Garante que desenvolvimento, Lovable e deploy reproduzam a mesma árvore auditada.               | Baixo/Médio |
| Fixar versão de Node (`engines` e arquivo de versão)                                                                     | Evita builds diferentes ou incompatíveis; Vite 8 exige Node moderno.                            |       Baixo |
| Eliminar ou encapsular o `dangerouslySetInnerHTML` de `chart.tsx`; restringir `id`, chaves e cores a formatos permitidos | Previne que um componente atualmente inativo se torne um sink de injeção quando reutilizado.    |       Médio |
| Criar aviso/política de privacidade compatível com o fluxo do WhatsApp                                                   | Informa finalidade, controlador, retenção/terceiro e direitos do titular conforme LGPD.         |       Médio |
| Documentar CI/CD, branch protegida, responsáveis e procedimento testado de rollback                                      | O histórico Git existe, mas recuperação operacional e gates de segurança não estão comprovados. |       Médio |
| Executar scanner dedicado de segredos no histórico e no CI                                                               | A busca por regex não detecta todos os formatos/segredos de alta entropia.                      |       Baixo |

### 🟢 Baixo / melhoria contínua

| Ação                                                                         | Por que importa                                                            | Esforço |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------: |
| Avaliar auto-hospedagem das fontes                                           | Reduz dependência externa, requisições de terceiros e complexidade da CSP. |   Baixo |
| Remover componentes/dependências UI não utilizados após confirmar uso futuro | Diminui superfície de supply chain e código latente como chart/sidebar.    |   Médio |
| Adotar atualização automatizada com revisão, testes e `npm audit` recorrente | Mantém correções de segurança sem atualizações principais cegas.           |   Baixo |
| Revisar o uso de Nitro beta e estabelecer janela de atualização              | Betas podem mudar rapidamente e exigem disciplina operacional maior.       |   Médio |
| Adicionar inventário/SBOM e registrar versão efetivamente implantada         | Facilita resposta a CVEs e rastreabilidade entre commit e produção.        |   Médio |

## Perguntas para o dono do site

1. A URL `webdevrj.lovable.app` é o único ambiente publicado? Existe domínio próprio ou outros ambientes de teste/produção?
2. O deploy é executado integralmente pelo Lovable? Cloudflare Workers/Pages é usado por baixo, e quem possui acesso ao painel correspondente?
3. Quem gerencia DNS e certificados TLS/SSL? HTTPS é forçado em todos os domínios e subdomínios?
4. Há cabeçalhos de segurança configurados diretamente no Lovable, Cloudflare ou outro painel que não aparecem no repositório?
5. Existe WAF, proteção DDoS/bot, regras de firewall ou monitoramento de borda ativo?
6. Quais pessoas e integrações têm acesso ao GitHub, Lovable, domínio, Cloudflare e demais painéis? MFA é obrigatório?
7. Existem chaves de API, webhooks, analytics, pixels, mapas ou outros serviços externos configurados somente no painel/ambiente e ausentes do repo?
8. Existe backend, banco de dados, CRM ou automação ligada ao WhatsApp que não está neste repositório?
9. Qual gerenciador é oficialmente usado no build: npm ou Bun? Qual lockfile o Lovable/deploy respeita?
10. Há política de privacidade, base legal definida e prazo de retenção para conversas e dados recebidos no WhatsApp?
11. Como são feitos backup e rollback? É possível restaurar rapidamente um commit anterior pelo painel, e esse procedimento já foi testado?
12. Logs do worker/Lovable são retidos por quanto tempo, quem pode acessá-los e existe filtragem de dados pessoais/segredos?
13. O repositório é público ou privado? Há proteção de branch, revisão obrigatória e scanner de dependências/segredos habilitado no GitHub?
14. O ambiente publicado foi configurado para impedir acesso a `.git`, sourcemaps, arquivos `.env`, manifests internos e artefatos intermediários?
