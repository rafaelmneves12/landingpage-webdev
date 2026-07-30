import { motion } from "motion/react";
import { UserCheck, ShieldCheck, MessageCircle, Timer } from "lucide-react";

const ITEMS = [
  { icon: UserCheck, label: "Atendimento direto com o desenvolvedor — sem terceirização" },
  { icon: MessageCircle, label: "Você fala comigo, não com um robô" },
  { icon: Timer, label: "Resposta em até 24h" },
  { icon: ShieldCheck, label: "7 dias de garantia após a entrega" },
];

export function TrustBar() {
  return (
    <section aria-label="Compromissos de atendimento" className="relative py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item) => (
            <li key={item.label} className="flex min-w-0 items-center gap-2.5">
              <item.icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0 text-xs font-medium leading-snug text-foreground sm:text-[13px]">
                {item.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}