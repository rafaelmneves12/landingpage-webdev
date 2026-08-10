# Segurança do projeto

## Correções aplicadas em 10 de agosto de 2026

1. **Dependências:** `js-yaml` foi fixado em `>=4.3.1` e `nanoid` em `>=3.3.17` por `overrides` do npm. O lockfile foi atualizado e `npm audit` passou a reportar zero vulnerabilidades.
2. **Toolchain:** npm `10.9.2` foi definido como gerenciador oficial; `bun.lock` e `bunfig.toml` foram removidos. O projeto agora declara Node `>=22.12.0` e inclui `.nvmrc` com Node `22.14.0`.
3. **Arquivos sensíveis:** o `.gitignore` passou a cobrir arquivos `.env`, chaves/certificados, `credentials.json` e `build/`. Nenhum arquivo correspondente já estava rastreado no Git.
4. **Headers HTTP:** respostas SSR/Worker recebem headers defensivos em `src/server.ts`; a mesma política foi adicionada a `public/_headers` para Cloudflare Pages. A CSP está inicialmente em `Report-Only`.
5. **Injeção de CSS:** IDs, chaves e cores interpolados pelo componente de gráficos agora usam allowlists estritas antes de chegar a `dangerouslySetInnerHTML`.
6. **Cookie de preferência:** o cookie do componente Sidebar agora inclui `Secure`, `SameSite=Lax` e `Path=/`.
7. **LGPD:** foi criado um rascunho em `/privacidade`, com links no formulário e rodapé. Os dados do controlador continuam marcados como `[PREENCHER]` e o texto exige revisão jurídica.

## Política de headers implementada

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy-Report-Only`, limitada ao próprio site e às origens Google Fonts já usadas, com `frame-ancestors 'none'`

> **Não habilitar HSTS até confirmação de HTTPS forçado em todos os domínios.** Isso inclui todos os domínios e subdomínios de produção. Uma ativação prematura pode tornar um host inacessível.

## Validação local desta execução

- O build de produção compilou a landing e a rota `/privacidade` com sucesso.
- O arquivo `.output/public/_headers` gerado contém a política configurada em `public/_headers`, e o bundle SSR contém o wrapper de headers do worker.
- A CSP permanece em `Report-Only`; portanto, ela relata violações sem bloquear fontes, estilos ou scripts.
- O comando `npm run preview` não iniciou a aplicação: o plugin de preview procurou `dist/server/server.js`, mas o preset Nitro/Cloudflare gera `.output`. O modo dev também não abriu uma porta acessível nesta sessão.
- A inspeção visual automatizada ficou pendente porque nenhum navegador estava conectado ao ambiente de execução. Antes do deploy, abrir a landing e `/privacidade` em um navegador, conferir o console da CSP e repetir o envio do formulário até a abertura do WhatsApp.

## Pendências que exigem o dono do site ou acesso externo

### Domínio, TLS e headers

- Confirmar todos os domínios e subdomínios publicados, incluindo ambientes alternativos à URL Lovable.
- Confirmar quem gerencia DNS e certificados TLS e se HTTPS é forçado em todos os hosts.
- Somente depois dessa confirmação, planejar a ativação gradual de HSTS.
- Confirmar em produção qual mecanismo está efetivamente ativo: o wrapper de `src/server.ts`, o arquivo `public/_headers`, ou ambos.
- Observar relatórios/console da CSP `Report-Only`, ajustar violações legítimas e só então avaliar migração para CSP bloqueante.

### Plataforma e proteção de borda

- Confirmar se o deploy usa Cloudflare Workers/SSR, Cloudflare Pages/estático ou outra combinação gerenciada pelo Lovable.
- Confirmar se WAF, mitigação DDoS/bots, firewall e alertas estão ativos no provedor.
- Confirmar se o ambiente publicado impede acesso a `.git`, `.env`, sourcemaps e artefatos intermediários.

### Acessos e credenciais

- Inventariar usuários e integrações com acesso a GitHub, Lovable, Cloudflare, registrador e DNS.
- Exigir MFA nos painéis e remover acessos sem necessidade atual.
- Confirmar se existem chaves, webhooks, analytics, pixels, mapas, CRM, banco ou automações configurados apenas nos painéis externos.
- Definir retenção e acesso aos logs do worker/Lovable, evitando dados pessoais e segredos.

### Privacidade e operação

- Preencher no aviso de privacidade: responsável/controlador, CNPJ ou CPF e e-mail para direitos do titular.
- Submeter o rascunho a revisão jurídica antes de considerá-lo definitivo.
- Definir base legal, retenção das conversas no WhatsApp e procedimento para solicitações de titulares.

### Continuidade e manutenção

- Documentar e testar backup/rollback a partir de um commit conhecido.
- Confirmar proteção da branch, revisão obrigatória e scanners de dependências/segredos no GitHub.
- Decidir uma política para acompanhar o Nitro beta sem alterar sua versão principal de forma automática.
- Programar `npm audit`, atualização controlada e scanner dedicado de segredos no CI.

## Relato de vulnerabilidades

Até que um canal específico seja definido, vulnerabilidades não devem ser publicadas em issues abertas. O dono do projeto deve preencher e divulgar um contato privado de segurança antes de tornar este documento uma política pública definitiva: **[PREENCHER E-MAIL DE SEGURANÇA]**.
