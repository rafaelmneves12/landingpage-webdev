import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ServicesMarquee } from "@/components/landing/ServicesMarquee";
import { About } from "@/components/landing/About";
import { Methodology } from "@/components/landing/Methodology";
import { Services } from "@/components/landing/Services";
import { Projects } from "@/components/landing/Projects";
import { Process } from "@/components/landing/Process";
import { Incluso } from "@/components/landing/Incluso";
import { Faq } from "@/components/landing/Faq";
import { Orcamento } from "@/components/landing/Orcamento";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Rafael Neves — Desenvolvedor Front-End Freelancer | Criação de Sites",
      },
      {
        name: "description",
        content:
          "Criação de sites profissionais, landing pages e catálogos digitais em React e Tailwind. Atendimento direto com o desenvolvedor. Peça seu orçamento pelo WhatsApp.",
      },
      {
        property: "og:title",
        content: "Rafael Neves — Desenvolvedor Front-End Freelancer | Criação de Sites",
      },
      {
        property: "og:description",
        content:
          "Criação de sites profissionais, landing pages e catálogos digitais em React e Tailwind. Atendimento direto com o desenvolvedor. Peça seu orçamento pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Rafael Neves — Desenvolvedor Front-End Freelancer",
          description:
            "Criação de sites institucionais, landing pages, cardápios e catálogos digitais com React, TypeScript e Tailwind CSS.",
          areaServed: "Brasil",
          telephone: "+55 21 97707-2215",
          email: "rafaelneves.devweb@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rio de Janeiro",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="relative isolate">
        <Hero />
        <Methodology />
      </div>
      <ServicesMarquee />
      <Services />
      <Projects />
      <Process />
      <About />
      <Incluso />
      <Faq />
      <Orcamento />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
