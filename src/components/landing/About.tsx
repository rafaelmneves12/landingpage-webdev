import { motion } from "motion/react";
import { Instagram, Mail, Zap } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { WhatsAppIcon } from "./WhatsAppIcon";
import rafaelPhoto from "@/assets/rafael-neves.png";

const SOCIALS = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/rafaelneves.devweb/",
    label: "Instagram",
  },
  {
    icon: WhatsAppIcon,
    href: "https://wa.me/5521977072215",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:rafaelneves.devweb@gmail.com",
    label: "Email",
  },
];

const TECHNOLOGY_ROWS = [
  [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "JavaScript",
    "Firebase",
    "Vite",
    "Framer Motion",
  ],
  ["Claude AI", "Codex", "Lovable", "Git", "GitHub", "Canva", "Vercel", "Hostinger"],
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function TechnologyRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden bg-background/85 py-1.5 backdrop-blur-md">
      <div
        className={`flex w-max will-change-transform ${
          reverse ? "about-tech-track-reverse" : "about-tech-track"
        }`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-1.5 pr-1.5">
            {items.map((technology) => (
              <span
                key={`${copy}-${technology}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[8px] font-semibold text-foreground sm:text-[9px]"
              >
                <Zap className="h-2.5 w-2.5 fill-primary/20 text-primary" />
                {technology}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="sobre"
      className="theme-dark relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="relative mx-auto w-full min-w-0 max-w-md lg:mx-0 lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rounded-[2rem] bg-primary/20 blur-2xl"
          />
          <div className="overflow-hidden rounded-[1.75rem] border border-primary/25 bg-card/60 p-1.5 glow-blue">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
              <img
                src={rafaelPhoto}
                alt="Rafael Neves — Desenvolvedor Front-End no Rio de Janeiro"
                width={1024}
                height={1280}
                className="h-full w-full scale-[1.06] object-cover object-top"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 overflow-hidden">
                <TechnologyRow items={TECHNOLOGY_ROWS[0]} />
                <TechnologyRow items={TECHNOLOGY_ROWS[1]} reverse />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="min-w-0 text-left">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              Sobre Mim
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-gradient-blue">Rafael Neves</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-7"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sou desenvolvedor Web e crio{" "}
              <strong className="font-semibold text-foreground">
                sites institucionais, landing pages, one-pages e blogs
              </strong>{" "}
              com{" "}
              
                React, TypeScript e Tailwind CSS
              
              , além de WordPress, unindo design profissional, usabilidade e código moderno.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cada projeto recebe{" "}
              <strong className="font-semibold text-foreground">
                atendimento direto e cuidadoso
              </strong>{" "}
              do planejamento à entrega, com foco em{" "}
              <strong className="font-semibold text-foreground">
                performance, responsividade e conversão
              </strong>
              .
            </p>

            <div className="mt-7">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Formação
              </p>
              <span className="mt-2.5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
                Sistemas de Informação
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AnimatedButton href="#contato" variant="dark">
                Fale Comigo
              </AnimatedButton>

              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
