import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      {/* Próximas seções: Sobre, Processo, Incluso, Orçamento, Contato */}
      <section id="sobre" className="min-h-[20vh]" />
      <section id="processo" className="min-h-[20vh]" />
      <section id="incluso" className="min-h-[20vh]" />
      <section id="orcamento" className="min-h-[20vh]" />
      <section id="contato" className="min-h-[20vh]" />
    </main>
  );
}
