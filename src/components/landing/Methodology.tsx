import { motion } from "motion/react";
import { MessageCircle, Rocket, Sparkles, Target } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Estratégia",
    description:
      "Entender o negócio, o público e o objetivo do projeto para criar uma solução que realmente resolva um problema.",
  },
  {
    icon: Sparkles,
    title: "Qualidade",
    description:
      "Entregar um projeto visualmente profissional, rápido, responsivo, funcional e pensado para proporcionar uma boa experiência ao usuário.",
  },
  {
    icon: MessageCircle,
    title: "Comunicação",
    description:
      "Manter o cliente informado, alinhar expectativas e conduzir o projeto com transparência, organização e profissionalismo.",
  },
  {
    icon: Rocket,
    title: "Pós-venda",
    description:
      "Continuar oferecendo suporte e atenção após a entrega, criando confiança, novas oportunidades e um relacionamento de longo prazo.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Methodology() {
  return (
    <section className="stacked-section theme-dark z-10 overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Metodologia
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Um processo baseado em <span className="text-gradient-blue">4 pilares</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Uma metodologia pensada para criar sites que não apenas parecem bonitos, mas carregam
            rápido, orientam o usuário e geram resultados reais.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: "easeOut" }}
              className="group rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25">
                <pillar.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
