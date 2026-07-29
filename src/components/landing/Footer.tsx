import { Github, Linkedin, Mail } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#processo", label: "Processo" },
  { href: "#incluso", label: "O que está incluso" },
  { href: "#orcamento", label: "Orçamento" },
  { href: "#contato", label: "Contato" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/rafaelmneves12", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/rafael-mattos-neves-97a180274", label: "LinkedIn" },
  { icon: Mail, href: "mailto:rafaelnevesrj12@gmail.com", label: "Email" },
  { icon: WhatsAppIcon, href: "https://wa.me/5521977072215", label: "WhatsApp" },
];

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-border/60 bg-background/60 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-base font-semibold text-foreground">Rafael Neves</p>
            <p className="mt-1 text-sm text-muted-foreground">Desenvolvedor Front-End Freelancer</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Rafael Neves — Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}