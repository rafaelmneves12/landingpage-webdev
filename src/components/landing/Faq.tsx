import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const QUESTIONS = [
  {
    question: "Como funciona o processo de criação?",
    answer:
      "O projeto passa por cinco etapas: briefing, desenvolvimento, homologação, publicação e suporte inicial. Você fala diretamente comigo do primeiro alinhamento até os 7 dias de suporte após a publicação.",
  },
  {
    question: "Você atende qualquer cidade ou só presencial?",
    answer:
      "Atendo 100% remotamente em todo o Brasil. Briefing, alinhamentos, revisões e entrega são realizados online, de forma simples e organizada.",
  },
  {
    question: "O site é meu? Fico com o código e o domínio?",
    answer:
      "Sim. O projeto pertence a você, incluindo o código e o domínio contratado. Você não fica preso a uma plataforma fechada e mantém liberdade para evoluir o site no futuro.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "O prazo depende do formato e do volume de conteúdo. Landing pages e one-pages costumam ser mais rápidas; sites institucionais e blogs exigem mais tempo conforme a quantidade de páginas e funcionalidades.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "O pagamento é feito via Pix: 50% no início do projeto para reservar e começar o trabalho, e os outros 50% na entrega.",
  },
  {
    question: "E depois da entrega, tem suporte?",
    answer:
      "Sim. Todo projeto inclui 7 dias de suporte gratuito após a publicação para ajustes e orientações iniciais.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Faq() {
  return (
    <section
      id="faq"
      className="theme-dark relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            FAQ
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Tire suas dúvidas <span className="text-gradient-blue">antes de começar</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Respostas diretas sobre o processo, prazos, pagamento e o que acontece depois da
            entrega.
          </motion.p>
        </div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-12"
        >
          <Accordion.Root type="single" collapsible className="space-y-3">
            {QUESTIONS.map((item, index) => (
              <Accordion.Item
                key={item.question}
                value={`question-${index}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/45 px-5 backdrop-blur transition-colors data-[state=open]:border-primary/35 data-[state=open]:bg-card/70 sm:px-6"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground sm:text-lg">
                    {item.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="faq-accordion-content overflow-hidden text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <div className="max-w-3xl pb-5 pr-8">{item.answer}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
