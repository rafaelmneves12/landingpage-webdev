import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const ITEMS = [
  "Desenvolvimento personalizado do website",
  "Design responsivo (celular, tablet e computador)",
  "SEO básico (estrutura otimizada para o Google)",
  "Otimização de velocidade e desempenho",
  "Configuração inicial do domínio e hospedagem",
  "Certificado SSL (HTTPS)",
  "Integração com WhatsApp",
  "Produção e organização dos textos",
  "Otimização de imagens",
  "Testes em diferentes navegadores e dispositivos",
  "Publicação do site",
  "Suporte após entrega de 7 dias",
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Incluso() {
  return (
    <section
      id="incluso"
      className="theme-light relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* Subtle top border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />O que está
            incluso
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Tudo isso já está <span className="text-gradient-blue">incluso no seu projeto</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Transparência total: veja exatamente o que você recebe ao fechar comigo.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item}
              {...fadeInUp}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: "easeOut",
              }}
            >
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition-colors hover:border-primary/40 hover:bg-card/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reinforcement + CTA */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 text-center sm:px-10 sm:py-10"
        >
          <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Sem surpresas no meio do caminho — tudo isso já está no valor combinado.
          </p>
          <AnimatedButton href="#orcamento" variant="primary">
            Solicitar meu orçamento
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
