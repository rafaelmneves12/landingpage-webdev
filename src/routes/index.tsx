import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      {/* Próximas seções: Processo, Incluso, Orçamento, Contato */}
      <section id="processo" className="min-h-[20vh]" />
      <section id="incluso" className="min-h-[20vh]" />
      <section id="orcamento" className="min-h-[20vh]" />
      <section id="contato" className="min-h-[20vh]" />
    </main>
  );
}
