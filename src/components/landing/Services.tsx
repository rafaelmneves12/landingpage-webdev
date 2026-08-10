import { motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, PanelsTopLeft, ShoppingCart, Wrench } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Landing Page",
    description: "Página única voltada para conversão. Ideal para campanhas e lançamentos.",
    features: [
      "Integração com Whatsapp, E-mail e Redes Sociais",
      "Página Desenvolvida com intenção de conversão",
      "Estudo do seu processo antes do desenvolvimento",
      "Estudo de mercado antes do projeto",
      "Suporte 7 dias após a entrega do projeto",
    ],
    deadline: "5 a 10 dias",
  },
  {
    icon: PanelsTopLeft,
    title: "Site Institucional",
    description: "Website para posicionar sua marca e ampliar sua presença na Web.",
    features: [
      "Até 6 páginas",
      "SEO por página",
      "Estrutura personalizada para o seu negócio",
      "Estudo do seu processo antes do desenvolvimento",
      "Estudo de mercado antes do projeto",
      "Suporte 7 dias após a entrega do projeto",
    ],
    deadline: "10 a 20 dias",
  },
  {
    icon: ShoppingCart,
    title: "Vendas & Conversão",
    description: "Estrutura completa para apresentar e vender seus produtos pela internet.",
    features: [
      "E-commerce, Catálogo de produtos, Cardápio Digital", 
      "Desenvolvimento de funcionalidades personalizado para cada projeto",
      "Estudo do seu processo antes do desenvolvimento",
      "Estudo de mercado antes do projeto",
      "Suporte 7 dias após a entrega do projeto",
    ],
    deadline: "15 a 30 dias",
  },
  {
    icon: Wrench,
    title: "Sistema Personalizado",
    description: "Solução desenvolvida sob medida para os processos e objetivos do seu negócio.",
    features: [
      "Sistemas de Gestão, Dashboards Administrativo, Sistemas Personalizados", 
      "Fluxos personalizados", 
      "Estudo do seu processo antes do desenvolvimento",
      "Estudo de mercado antes do projeto",
      "Suporte 7 dias após a entrega do projeto",
    ],
    deadline: "Conforme o escopo",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Services() {
  return (
    <section
      id="servicos"
      className="theme-light relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Serviços
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            O formato certo para o <span className="text-gradient-blue">seu projeto</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Escolha a estrutura que combina com o momento do seu negócio. Cada solução é adaptada
            aos seus objetivos e ao seu público.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 lg:mt-16">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              {...fadeInUp}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease: "easeOut" }}
              className="relative flex h-full flex-col rounded-2xl border border-primary/60 bg-primary/10 p-6 shadow-lg shadow-primary/10 backdrop-blur"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <service.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{service.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-foreground/85"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-3.5 py-3 text-sm">
                <Clock3 className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Prazo estimado:</span>
                <span className="font-semibold text-foreground">{service.deadline}</span>
              </div>

              <div className="mt-auto flex justify-center pt-4">
                <AnimatedButton href="#orcamento" variant="primary">
                  Solicitar Orçamento
                </AnimatedButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
