import { motion } from "motion/react";
import { UserCheck, Code2, ListChecks, HeartHandshake } from "lucide-react";

const CARDS = [
  {
    icon: UserCheck,
    title: "Atendimento direto",
    description:
      "Você fala comigo diretamente, sem intermediários, do orçamento à entrega.",
  },
  {
    icon: Code2,
    title: "Tecnologia moderna",
    description:
      "React, TypeScript e Tailwind CSS, o mesmo padrão usado por grandes empresas de tecnologia.",
  },
  {
    icon: ListChecks,
    title: "Processo transparente",
    description:
      "Etapas claras, comunicação constante e prazos combinados desde o início.",
  },
  {
    icon: HeartHandshake,
    title: "Suporte incluso",
    description:
      "7 dias de suporte gratuito após a publicação do seu site.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      {/* subtle top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          {...fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
        >
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          Sobre o serviço
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
        >
          Desenvolvedor com olhar de{" "}
          <span className="text-gradient-blue">dono do negócio</span>
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Sou desenvolvedor Front-End especializado em React, TypeScript e
          Tailwind CSS, com experiência também em WordPress. Trato cada
          projeto como um produto completo — pensando em performance,
          design, usabilidade e resultado real para o negócio do cliente,
          não apenas em entregar um site bonito.
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-border/60 bg-card/40 p-5 text-left backdrop-blur transition-colors hover:border-primary/40 hover:bg-card/60"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25">
                  <card.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
