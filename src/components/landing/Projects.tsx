import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Eye, X } from "lucide-react";
import importsgtts from "@/assets/importsgtts-thumbnail.png";
import importsgtts1 from "@/assets/importsgtts-picture-1.png";

import zenavra from "@/assets/zenavra-thumbnail.png";
import zenavra1 from "@/assets/zenavra-picture-1.png";
import zenavra2 from "@/assets/zenavra-picture-2.png";

import rayaneSocialMidia from "@/assets/portifolio-thumbnail.png";
import rayaneSocialMidia1 from "@/assets/portifolio-picture-1.png";

import saborEmCasaBlog from "@/assets/culinaria-thumbnail.png";
import saborEmCasaBlog1 from "@/assets/culinaria-picture-1.png";
import saborEmCasaBlog2 from "@/assets/culinaria-picture-2.png";
import saborEmCasaBlog3 from "@/assets/culinaria-picture-3.png";
import saborEmCasaBlog4 from "@/assets/culinaria-picture-4.png";
import saborEmCasaBlog5 from "@/assets/culinaria-picture-5.png";

import vaultCripto from "@/assets/vault-thumbnail.png";
import vaultCripto1 from "@/assets/vault-picture-1.png";
import vaultCripto2 from "@/assets/vault-picture-2.png";
import vaultCripto3 from "@/assets/vault-picture-3.png";
import vaultCripto4 from "@/assets/vault-picture-4.png";
import vaultCripto5 from "@/assets/vault-picture-5.png";
import vaultCripto6 from "@/assets/vault-picture-6.png";

import clinicaEstetica from "@/assets/clinica-estetica-thumbnail.png";
import clinicaEstetica1 from "@/assets/clinica-estetica-picture-1.png";

export type Project = {
  id: string;
  title: string;
  tag: string;
  date: string;
  cover: string;
  description: string;
  highlights: string[];
  technologies: string[];
  url: string;
  gallery: string[];
};

const PROJECTS: Project[] = [
  {
    id: "clinica-estetica",
    title: "Landing Page - Clinica de Estética",
    tag: "React",
    date: "Ago 2026",
    cover: clinicaEstetica,
    description:
      "Landing Page moderna e totalmente responsivo para clínica de estética, desenvolvido para fortalecer a presença digital da marca, apresentar os tratamentos de forma estratégica e proporcionar uma experiência sofisticada focada em conversão de novos clientes.",
    highlights: [
      "Design sofisticado com identidade visual elegante para a marca",
      "Apresentação completa da clínica, equipe, tratamentos e resultados",
      "Galeria de imagens e cards comparativos de antes e depois",
      "Sessão de avaliações reais para fortalecer a credibilidade da marca",
      "Cards detalhados com informações sobre cada procedimento",
      "Integração direta com WhatsApp para atendimento rápido",
      "FAQ e formulário de contato para geração de novos leads",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable", "Codex"],
    url: "https://aureaclinicprofessional.vercel.app/",
    gallery: [clinicaEstetica1],
  },
  {
    id: "sabor-em-casa-blog",
    title: "Site Institucional - Blog Culinário",
    tag: "React",
    date: "Ago 2026",
    cover: saborEmCasaBlog,
    description:
      "Blog culinário moderno e totalmente responsivo, desenvolvido para proporcionar uma navegação intuitiva entre receitas, categorias e conteúdos gastronômicos, oferecendo uma experiência agradável tanto para leitores quanto para apaixonados por culinária.",
    highlights: [
      "Sistema de categorias e filtros para facilitar a busca por receitas",
      "Receitas completas com ingredientes e modo de preparo detalhado",
      "Integração com vídeos do YouTube para acompanhamento do preparo",
      "Página institucional apresentando a história e propósito do blog",
      "Design leve, moderno e agradável com tema claro",
      "Carregamento rápido e navegação intuitiva",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable", "Codex"],
    url: "https://blogculinariaprofessional.vercel.app/",
    gallery: [
      saborEmCasaBlog1,
      saborEmCasaBlog2,
      saborEmCasaBlog3,
      saborEmCasaBlog4,
      saborEmCasaBlog5,
    ],
  },
  {
    id: "rayane-social-media",
    title: "Landing Page - Social Media",
    tag: "React",
    date: "Jul 2026",
    cover: rayaneSocialMidia,
    description:
      "Landing page moderna e totalmente responsiva para Social Media, desenvolvida com foco em captação de clientes, experiência do usuário e alta conversão.",
    highlights: [
      "Design moderno com tema claro e paleta de cores personalizada",
      "Apresentação profissional com sessão Sobre Mim, foto e descrição",
      "Galeria dos trabalhos mais recentes para demonstrar experiência",
      "Exibição de insights e resultados reais obtidos em projetos",
      "Sessão de avaliações autênticas para fortalecer a credibilidade",
      "Área dedicada às ferramentas e plataformas utilizadas no dia a dia",
      "Integração direta com WhatsApp para atendimento imediato",
      "Chamada para ação (CTA) estratégica para geração de novos clientes",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable", "Codex"],
    url: "https://portifolio-premium-social-media.vercel.app/",
    gallery: [rayaneSocialMidia1],
  },
  {
    id: "vault-cripto",
    title: "Sistema Personalizado - Carteira de Criptomoedas",
    tag: "React",
    date: "Jul 2026",
    cover: vaultCripto,
    description:
      "Plataforma multipáginas desenvolvida para investidores de criptomoedas, oferecendo monitoramento em tempo real do mercado, gerenciamento de portfólio e análise de ativos através de consumo de API REST, com foco em desempenho, segurança e experiência do usuário.",
    highlights: [
      "Consumo de API REST para atualização em tempo real do mercado",
      "Sistema completo de autenticação com Login e Registro",
      "Dashboard privado para gerenciamento dos investimentos",
      "Portfólio personalizado com controle de ativos, valores investidos e patrimônio",
      "Watchlist para acompanhamento das criptomoedas favoritas",
      "Análise de volatilidade e desempenho do mercado em tempo real",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable", "Codex"],
    url: "https://vaultcriptoprofessional.vercel.app/",
    gallery: [vaultCripto1, vaultCripto2, vaultCripto3, vaultCripto4, vaultCripto5, vaultCripto6],
  },
  {
    id: "importsgtts",
    title: "Vendas & Conversão - Ecommerce Moda Masculina",
    tag: "WordPress",
    date: "Dez 2023",
    cover: importsgtts,
    description:
      "Website moderno e totalmente responsivo em WooCommerce, voltado ao segmento de moda masculina, com abordagem mobile-first e foco em conversão.",
    highlights: [
      "WooCommerce customizado com Elementor",
      "Integração com gateways de pagamento",
      "Banners estratégicos e otimização de conversão",
      "Alto desempenho de carregamento",
    ],
    technologies: ["WordPress", "WooCommerce", "Elementor", "CSS"],
    url: "nada",
    gallery: [importsgtts1],
  },
  {
    id: "zenavra",
    title: "Vendas & Conversão - Ecommerce Moda Feminina",
    tag: "Shopify",
    date: "Mai 2026",
    cover: zenavra,
    description:
      "Loja virtual moderna e responsiva em Shopify, voltada para o segmento de beleza feminina, com navegação intuitiva e experiência de compra premium.",
    highlights: [
      "UI/UX moderna e carregamento otimizado",
      "Páginas de produtos personalizadas",
      "Variantes e amostras de cores (swatches)",
      "Formulários de contato e FAQs",
    ],
    technologies: ["Shopify", "Liquid", "CSS", "Apps"],
    url: "nada",
    gallery: [zenavra1, zenavra2],
  },
];

function GalleryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const total = project.gallery.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, next, prev]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      scrollContainerRef.current?.scrollTo({ top: 0 });
    }
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-background/85 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[88dvh] max-h-[44rem] w-full max-w-6xl cursor-default flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl sm:h-full sm:max-h-[92vh]"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-6">
          <h3 className="min-w-0 truncate font-display text-sm font-semibold text-foreground sm:text-base">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Fechar galeria"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain bg-background/40 [-webkit-overflow-scrolling:touch]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={project.gallery[index]}
              alt={`${project.title} — imagem ${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              loading="lazy"
              className="block w-full"
            />
          </AnimatePresence>
        </div>

        {total > 1 && (
          <div className="flex shrink-0 items-center justify-center gap-4 border-t border-border/60 px-4 py-3">
            <button
              onClick={prev}
              aria-label="Imagem anterior"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {index + 1}/{total}
            </span>
            <button
              onClick={next}
              aria-label="Próxima imagem"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projetos"
      className="theme-dark relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
            Portfólio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Meus projetos <span className="text-gradient-blue">recentes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Alguns dos meus trabalhos desenvolvidos ao decorrer da minha carreira.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur transition-colors hover:border-primary/40 hover:bg-card/60"
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                aria-label={`Visualizar galeria de ${project.title}`}
                className="relative block w-full overflow-hidden"
              >
                <img
                  src={project.cover}
                  alt={`Capa do projeto ${project.title}`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Acessar
                  </a>
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    <Eye className="h-4 w-4" />
                    Visualizar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <GalleryModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
