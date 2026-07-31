# Pixel Forge Studio

IDENTIDADE VISUAL DO SITE (aplicar em TODAS as seções, do início ao fim):

- Tema DARK como base de todo o site (fundo escuro, ex: tons de preto/cinza-azulado bem escuro, nunca branco como fundo principal)

- Paleta de cores: azul como cor de destaque/ação (para botões, ícones, links, bordas ativas), com tons complementares e variações do próprio azul (azul petróleo, azul acinzentado, ciano sutil) — evitar cores quentes ou saturadas que fujam da paleta azul/dark

- Tipografia: fonte elegante, séria e empresarial, transmitindo profissionalismo (evitar fontes descontraídas, arredondadas ou "startup casual"; pensar em algo no estilo de fontes usadas por consultorias, escritórios de advocacia ou empresas de tecnologia enterprise). Sugestões de referência: Inter, Manrope, Sora ou similar para o corpo do texto, com uma fonte de destaque mais refinada para títulos se fizer sentido

- Foto de rosto do desenvolvedor: usar em tamanho GRANDE e em destaque no Hero (não pequena/thumbnail), como elemento visual central, com tratamento profissional (pode ter leve efeito de glow azul sutil na borda, moldura discreta ou fundo com gradiente escuro atrás da foto para dar profundidade)

- Manter esse padrão de tema dark + azul + tipografia empresarial consistente em todas as seções seguintes (Sobre, Processo, O que está incluso, Formulário de orçamento, Contato) — nenhuma seção deve fugir dessa identidade visual

Prompt 1 — Base do projeto, Hero e estrutura geral
Quero criar uma LANDING PAGE de captação de clientes para meus serviços como Desenvolvedor Front-End Freelancer, baseada no estilo visual do meu portfólio atual (mesma paleta de cores, tipografia, espaçamentos, estilo de cards, animações suaves e sensação premium/profissional). Não é mais um portfólio pessoal — é uma página de VENDA de serviço com foco em conversão via WhatsApp.

STACK OBRIGATÓRIA (sem backend, 100% front-end):
- React + TypeScript
- Tailwind CSS
- lucide-react (ícones)
- motion (Framer Motion) para animações
- Código componentizado, tipado, clean code, arquitetura de pastas organizada
- Totalmente responsivo (mobile, tablet, desktop)
- Performance e SEO básico (meta tags, estrutura semântica, headings corretos)

INFORMAÇÕES DO PROFISSIONAL:
- Nome: Rafael Neves
- Cargo: Desenvolvedor Front-End Freelancer
- Localização: Rio de Janeiro, Brasil
- WhatsApp: +55 21 97707-2215
- Email: rafaelnevesrj12@gmail.com
- LinkedIn: linkedin.com/in/rafael-mattos-neves-97a180274
- GitHub: github.com/rafaelmneves12
- Foto de perfil: usar a mesma imagem de rosto do portfólio atual

SEÇÕES DA PÁGINA (nesta ordem, vamos construir uma por vez nos próximos prompts — por enquanto crie apenas a estrutura de navegação e o Header + Hero):

1. Header fixo/sticky com logo/nome e menu (Sobre, Processo, O que está incluso, Orçamento, Contato) + botão de destaque "Solicitar Orçamento" que leva até a seção de formulário.
2. Hero
3. Sobre / Por que me contratar
4. Processo de desenvolvimento
5. O que está incluso em todo projeto
6. Formulário de orçamento
7. Contato final / rodapé

Crie AGORA apenas o Header e o Hero:

HEADER:
- Sticky, com fundo translúcido com blur ao rolar a página
- Nome "Rafael Neves" à esquerda
- Menu com os links das seções
- Botão CTA "Solicitar Orçamento" que rola suavemente até a seção de formulário (ainda vamos criar)
- Menu responsivo (hambúrguer no mobile)

HERO:
- Manter a mesma composição visual do portfólio atual (imagem de rosto, badge "Disponível para novos projetos")
- Título principal com foco em VENDA, por exemplo variações de: "Sites profissionais que geram resultado para o seu negócio" ou similar — pode escrever um título forte e persuasivo nesse sentido
- Subtítulo explicando que sou Desenvolvedor Front-End especializado em criar sites institucionais, landing pages, one-page, cardápios digitais e catálogos digitais com React, TypeScript e Tailwind CSS, com foco em performance, design moderno e conversão
- Dois botões: "Peça seu orçamento agora" (rola até formulário, deve ter destaque visual forte) e "Ver o que está incluso" (rola até seção de qualidades)
- Manter os números de destaque tipo "2+ Anos de experiência", "3+ Projetos entregues", "2+ Clientes atendidos" (mesmos números do portfólio atual)
- Adicionar um pequeno selo/indicador de confiança visível no Hero, tipo ícone de escudo/cadeado com o texto "Atendimento direto, sem intermediários" ou "Contrato claro, sem letras miúdas" — algo que transmita segurança logo de cara
- Manter foto de rosto do profissional, com o mesmo tratamento visual (bordas, sombra, badge) do portfólio original

Use as mesmas animações de entrada (fade/slide) que existem no portfólio atual para manter consistência.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://webdevrj.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/17144555-38fe-4666-9b52-7c05b01c2e71).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
