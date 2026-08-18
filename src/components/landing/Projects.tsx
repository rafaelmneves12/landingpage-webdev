import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Eye, LockKeyhole, X } from "lucide-react";

import rayaneSocialMidia from "@/assets/portifolio-thumbnail.png";
import rayaneSocialMidia1 from "@/assets/portifolio-picture-1.png";

import saborEmCasaBlog from "@/assets/culinaria-thumbnail.png";
import saborEmCasaBlog1 from "@/assets/culinaria-picture-1.png";
import saborEmCasaBlog2 from "@/assets/culinaria-picture-2.png";
import saborEmCasaBlog3 from "@/assets/culinaria-picture-3.png";
import saborEmCasaBlog4 from "@/assets/culinaria-picture-4.png";
import saborEmCasaBlog5 from "@/assets/culinaria-picture-5.png";

import clinicEsteticaLanding from "@/assets/clinica-estetica-landing-thumbnail.png";
import clinicEsteticaLanding1 from "@/assets/clinica-estetica-landing-picture-1.png";

import advogado from "@/assets/advogado-thumbnail.png";
import advogado1 from "@/assets/advogado-picture-1.png";

import vaultCripto from "@/assets/vault-thumbnail.png";
import vaultCripto1 from "@/assets/vault-picture-1.png";
import vaultCripto2 from "@/assets/vault-picture-2.png";
import vaultCripto3 from "@/assets/vault-picture-3.png";
import vaultCripto4 from "@/assets/vault-picture-4.png";
import vaultCripto5 from "@/assets/vault-picture-5.png";
import vaultCripto6 from "@/assets/vault-picture-6.png";

import clinicaEstetica from "@/assets/clinica-estetica-thumbnail.png";
import clinicaEstetica1 from "@/assets/clinica-estetica-picture-1.png";

type Project = {
  id: string;
  title: string;
  cover: string;
  url: string;
  gallery: string[];
};

const PROJECTS: Project[] = [
  {
    id: "clinica-estetica",
    title: "Site Institucional - Clinica de Estética",
    cover: clinicaEstetica,
    url: "https://aureaclinicestetica.vercel.app/",
    gallery: [clinicaEstetica1],
  },
  {
    id: "sabor-em-casa-blog",
    title: "Site Institucional - Blog Culinário",
    cover: saborEmCasaBlog,
    url: "https://saboremcasablog.vercel.app/",
    gallery: [
      saborEmCasaBlog1, saborEmCasaBlog2, saborEmCasaBlog3, saborEmCasaBlog4, saborEmCasaBlog5,
    ],
  },
  {
    id: "landing-page-clinica-estetica",
    title: "Landing Page - Clinica Estética",
    cover: clinicEsteticaLanding,
    url: "https://essenciaestetica.vercel.app/",
    gallery: [clinicEsteticaLanding1],
  },
  {
    id: "landing-page-advogado",
    title: "Landing Page - Escritório de Advocacia",
    cover: advogado,
    url: "https://advogadosmattoseassociados.vercel.app/",
    gallery: [advogado1],
  },
  {
    id: "rayane-social-media",
    title: "Landing Page - Social Media",
    cover: rayaneSocialMidia,
    url: "https://rayanesalessocialmedia.vercel.app/",
    gallery: [rayaneSocialMidia1],
  },
  {
    id: "vault-cripto",
    title: "Sistema Personalizado - Carteira de Criptomoedas",
    cover: vaultCripto,
    url: "https://vaultcryptowallet.vercel.app/",
    gallery: [vaultCripto1, vaultCripto2, vaultCripto3, vaultCripto4, vaultCripto5, vaultCripto6],
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
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [onClose, next, prev]);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [index, project.id]);

  useEffect(() => {
    setIndex(0);
  }, [project.id]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-background/85 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
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
          data-lenis-prevent
          className="relative flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-contain bg-background/40 [-webkit-overflow-scrolling:touch]"
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
              className="my-auto block w-full shrink-0"
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
    </motion.div>,
    document.body,
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
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl shadow-black/20 transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 items-center gap-3 border-b border-slate-300/70 bg-slate-100 px-3 shadow-sm sm:px-4">
                <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-300/80 bg-white/90 px-3 py-1.5 text-slate-500 shadow-inner">
                  <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate text-[11px] font-medium sm:text-xs">
                    {project.title}
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  aria-label={`Visualizar galeria de ${project.title}`}
                  className="block w-full overflow-hidden"
                >
                  <img
                    src={project.cover}
                    alt={`Capa do projeto ${project.title}`}
                    width={1280}
                    height={800}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  initial={false}
                  className="absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-background/85 px-3 py-2.5 opacity-100 shadow-lg backdrop-blur-md transition-[opacity,transform] duration-300 ease-out sm:pointer-events-none sm:translate-y-2 sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:pointer-events-auto sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Acessar
                  </a>
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    <Eye className="h-4 w-4" />
                    Visualizar
                  </button>
                </motion.div>
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
