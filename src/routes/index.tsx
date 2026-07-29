import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Process } from "@/components/landing/Process";
import { Incluso } from "@/components/landing/Incluso";
import { Orcamento } from "@/components/landing/Orcamento";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Process />
      <Incluso />
      <Orcamento />
      {/* Próxima seção: Contato */}
      <section id="contato" className="min-h-[20vh]" />
    </main>
  );
}



