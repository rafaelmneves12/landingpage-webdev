import { motion } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const WA_URL = "https://wa.me/5521977072215";
const EMAIL = "rafaelneves.devweb@gmail.com";

const trust = [
  { icon: BadgeCheck, label: "Atendimento verificado" },
  { icon: Clock, label: "Resposta em até 24h" },
  { icon: ShieldCheck, label: "Orçamento sem compromisso" },
];

const contacts = [
  { icon: Phone, label: "+55 21 97707-2215", href: "tel:+5521977072215" },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Rio de Janeiro, Brasil" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/rafael-mattos-neves-97a180274",
  },
];

export function Contact() {
  return (
    <section id="contato" className="theme-dark relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vamos construir o site do <span className="text-gradient-blue">seu negócio</span>?
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Estou disponível para novos projetos e respondo rapidamente. Escolha o canal que
            preferir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <AnimatedButton
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="self-center"
          >
            Chamar no WhatsApp
          </AnimatedButton>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            <Mail className="h-5 w-5" />
            Enviar email
          </a>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const content = (
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/30 p-4 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-secondary/60">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <span className="text-sm text-foreground">{c.label}</span>
              </div>
            );
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {trust.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground sm:text-sm">{t.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
