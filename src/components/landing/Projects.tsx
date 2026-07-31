import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  X,
} from "lucide-react";
import importsgtts from "@/assets/projeto-importsgtts.jpg";
import zenavra from "@/assets/projeto-zenavra.jpg";
import institucional from "@/assets/projeto-institucional.jpg";

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
    id: "importsgtts",
    title: "Ecommerce de Moda Masculina (ImportsGtts)",
    tag: "WordPress",
    date: "Dez 2023",
    cover: importsgtts,
    description:
      "Website moderno e totalmente responsivo em WooCommerce, voltado ao segmento de moda masculina, com abordagem mobile-first e foco em conversão.",
    highlights: [
      "Layout mobile-first e totalmente responsivo",
      "WooCommerce customizado com Elementor",
      "Integração com gateways de pagamento",
      "Banners estratégicos e otimização de conversão",
      "Alto desempenho de carregamento",
    ],
    technologies: ["WordPress", "WooCommerce", "Elementor", "CSS"],
    url: "https://importsgtts.com.br",
    gallery: [importsgtts, zenavra],
  },
  {
    id: "zenavra",
    title: "Ecommerce de Moda Feminina (Zenavra)",
    tag: "Shopify",
    date: "Mai 2026",
    cover: zenavra,
    description:
      "Loja virtual moderna e responsiva em Shopify, voltada para o segmento de beleza feminina, com navegação intuitiva e experiência de compra premium.",
    highlights: [
      "Design responsivo e mobile-first",
      "UI/UX moderna e carregamento otimizado",
      "Páginas de produtos personalizadas",
      "Variantes e amostras de cores (swatches)",
      "Formulários de contato e FAQs",
    ],
    technologies: ["Shopify", "Liquid", "CSS", "Apps"],
    url: "https://zenavra.com",
    gallery: [zenavra, importsgtts],
  },
  {
    id: "institucional",
    title: "Site Institucional Corporativo",
    tag: "React",
    date: "Fev 2026",
    cover: institucional,
    description:
      "Site institucional one-page desenvolvido em React e Tailwind CSS, com estrutura otimizada para SEO e captação de contatos via WhatsApp.",
    highlights: [
      "Desenvolvimento em React + TypeScript",
      "Estrutura semântica e SEO básico",
      "Animações suaves com motion",
      "Integração direta com WhatsApp",
      "Publicação e configuração de domínio",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    url: "https://example.com",
    gallery: [institucional],
  },
];

function GalleryModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const total = project.gallery.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl"
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

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-background/40">
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
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
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
            Projetos que já <span className="text-gradient-blue">entreguei</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Alguns dos trabalhos desenvolvidos com foco em performance, design e
            resultado real para o negócio do cliente.
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
                <span className="absolute left-3 top-3 rounded-md border border-primary/30 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {project.tag}
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
                  <Calendar className="h-3 w-3" />
                  {project.date}
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
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
        {active && (
          <GalleryModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}