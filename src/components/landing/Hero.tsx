import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AnimatedButton } from "@/components/AnimatedButton";

const NICHES = [
  "Advogados",
  "Clínicas de Estética",
  "Nutricionistas",
  "Salões de Beleza",
  "Odontologistas",
  "Personal Trainers",
];

function smoothTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useTypewriter() {
  const [nicheIndex, setNicheIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const niche = NICHES[nicheIndex];
    const complete = characterCount === niche.length;
    const empty = characterCount === 0;
    const delay = complete && !deleting ? 1500 : deleting ? 45 : 85;

    const timeout = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true);
        return;
      }

      if (empty && deleting) {
        setDeleting(false);
        setNicheIndex((current) => (current + 1) % NICHES.length);
        return;
      }

      setCharacterCount((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterCount, deleting, nicheIndex]);

  return NICHES[nicheIndex].slice(0, characterCount);
}

function GlowColumn({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute top-1/2 hidden -translate-y-1/2 flex-col gap-3 opacity-60 sm:flex ${
        side === "left" ? "-left-5 lg:left-3" : "-right-5 lg:right-3"
      }`}
    >
      {[0.3, 0.5, 0.75, 1, 0.75, 0.5, 0.3].map((opacity, index) => (
        <span
          key={index}
          className="block h-12 w-3 rounded-sm bg-primary shadow-[0_0_18px_oklch(0.68_0.16_245/0.7)] lg:h-14 lg:w-4"
          style={{ opacity }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const typedNiche = useTypewriter();

  return (
    <section
      id="top"
      className="stacked-section theme-dark z-0 flex items-center overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[130px]"
      />
      <GlowColumn side="left" />
      <GlowColumn side="right" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex min-h-9 max-w-full flex-wrap items-center justify-center gap-x-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-foreground shadow-lg shadow-black/10 backdrop-blur sm:text-xs"
        >
          <span>CRIAÇÃO DE SITE PROFISSIONAL PARA</span>
          <span className="text-primary">
            {typedNiche}
            <span className="typewriter-cursor ml-0.5">|</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mx-auto mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl"
        >
          <span className="block">Sites profissionais que geram</span>
          <span className="mt-2 block font-semibold text-muted-foreground">
            resultado para o seu negócio
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Sou <span className="font-medium text-foreground">Rafael Neves</span>, Desenvolvedor
          Front-End especializado em criar sites institucionais, landing pages, one-pages, blogs com
          React, TypeScript e Tailwind CSS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <AnimatedButton onClick={() => smoothTo("#orcamento")} variant="primary">
            Solicitar Orçamento
          </AnimatedButton>
          <AnimatedButton
            onClick={() => smoothTo("#projetos")}
            variant="dark"
            className="bg-white/5 backdrop-blur"
          >
            Ver Portfólio
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
