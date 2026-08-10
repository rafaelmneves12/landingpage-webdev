const ITEMS = [
  "Alto Desempenho",
  "Design Moderno",
  "SEO Otimizado",
  "Mobile-First",
  "Foco em Conversão",
  "Atendimento Direto",
  "Entrega Ágil",
  "Suporte Incluso",
];

function MarqueeItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <div key={item} className="marquee-item flex shrink-0 items-center">
          <span className="px-5 text-sm font-semibold tracking-wide text-white sm:px-7">
            {item}
          </span>
          <span className="marquee-marker text-accent-cyan" aria-hidden="true">
            •
          </span>
        </div>
      ))}
    </div>
  );
}

export function ServicesMarquee() {
  return (
    <div
      className="services-marquee marquee-premium theme-dark flex h-14 w-full items-center overflow-hidden border-y border-primary/30"
      aria-label="Diferenciais do serviço"
    >
      <div className="services-marquee-track flex w-max will-change-transform">
        <MarqueeItems />
        <MarqueeItems hidden />
      </div>
    </div>
  );
}
