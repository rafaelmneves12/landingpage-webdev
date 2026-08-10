import { motion } from "motion/react";
import { ClipboardList, Code2, SearchCheck, Rocket, HeartHandshake } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Briefing",
    description: "Levantamento das necessidades do projeto.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Desenvolvimento",
    description: "Implementação das funcionalidades e do layout.",
  },
  {
    number: "03",
    icon: SearchCheck,
    title: "Homologação",
    description: "Validação completa junto ao cliente.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Publicação",
    description: "Publicação do projeto em produção.",
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Suporte Inicial",
    description: "7 dias de suporte gratuito.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Process() {
  return (
    <section
      id="processo"
      className="theme-light relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            Processo de desenvolvimento
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Como funciona o <span className="text-gradient-blue">processo</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Um passo a passo claro e transparente, do primeiro contato até a publicação do seu site.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 lg:mt-20">
          {/* Desktop horizontal connecting line */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[4.25rem] left-[10%] right-[10%] hidden h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block"
          />

          {/* Mobile vertical connecting line */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 left-[2.25rem] w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent lg:hidden"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                {...fadeInUp}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="group flex items-start gap-5 lg:flex-col lg:items-center lg:text-center">
                  {/* Icon + number bubble */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur transition-all duration-300 group-hover:border-primary/70 group-hover:bg-primary/15 group-hover:shadow-primary/20">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    {/* Mobile dot on line */}
                    <div className="absolute top-1/2 -left-[2.125rem] h-2 w-2 -translate-y-1/2 rounded-full bg-primary lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 lg:pt-0">
                    <span className="text-xs font-semibold tracking-wider text-primary/70">
                      ETAPA {step.number}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
