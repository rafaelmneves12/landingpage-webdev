import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import rafaelPhoto from "@/assets/rafael-neves.jpg";

const STATS = [
  { value: "2+", label: "Anos de experiência" },
  { value: "3+", label: "Projetos entregues" },
  { value: "2+", label: "Clientes atendidos" },
];

function smoothTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 md:pt-36"
    >
      {/* Background glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-cyan/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Disponível para novos projetos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Sites profissionais que{" "}
            <span className="text-gradient-blue">geram resultado</span> para o seu negócio.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Sou <span className="text-foreground">Rafael Neves</span>, Desenvolvedor
            Front-End especializado em criar sites institucionais, landing pages,
            one-pages, cardápios digitais e catálogos digitais com{" "}
            <span className="text-foreground">React, TypeScript e Tailwind CSS</span>
            {" "}— com foco em performance, design moderno e conversão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => smoothTo("#orcamento")}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-[1.03] hover:brightness-110"
            >
              Peça seu orçamento agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => smoothTo("#incluso")}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:bg-card/70"
            >
              Ver o que está incluso
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Atendimento direto, sem intermediários — contrato claro, sem letras miúdas
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur"
              >
                <dt className="text-2xl font-bold text-foreground">{s.value}</dt>
                <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-card/60 p-1.5 glow-blue">
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <img
                src={rafaelPhoto}
                alt="Rafael Neves — Desenvolvedor Front-End Freelancer"
                width={1024}
                height={1280}
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0" />

              {/* Floating badge */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Front-End Freelancer
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur">
                <p className="text-sm font-semibold text-foreground">Rafael Neves</p>
                <p className="text-xs text-muted-foreground">
                  Rio de Janeiro · React · TypeScript · Tailwind
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}