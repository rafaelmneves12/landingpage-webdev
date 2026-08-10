import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyNotice,
  head: () => ({
    meta: [
      { title: "Aviso de Privacidade | Rafael Neves" },
      {
        name: "description",
        content: "Aviso de privacidade sobre os dados informados no formulário de orçamento.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
});

function PrivacyNotice() {
  return (
    <main className="theme-dark min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Voltar para o site
        </Link>

      

        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">Aviso de Privacidade</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Este aviso explica como os dados informados no formulário de orçamento são tratados ao
          entrar em contato para solicitar serviços de desenvolvimento web.
        </p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">1. Controlador e contato</h2>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5 text-sm leading-7 text-muted-foreground">
            <p>
              <strong className="text-foreground">Responsável/controlador:</strong> Rafael de Mattos Neves
            </p>
            <p>
              <strong className="text-foreground">CNPJ ou CPF:</strong> 18397937757
            </p>
            <p>
              <strong className="text-foreground">E-mail para exercício de direitos:</strong>{" "}
              rafaelneves.devweb@gmail.com
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">2. Dados coletados</h2>
          <p className="leading-relaxed text-muted-foreground">
            O formulário solicita o nome e os dados comerciais fornecidos voluntariamente, como tipo
            de negócio, tipo de site desejado, disponibilidade de textos e imagens e, de forma
            opcional, o endereço do site atual.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">3. Finalidade e forma de envio</h2>
          <p className="leading-relaxed text-muted-foreground">
            Os dados são usados exclusivamente para montar a mensagem inicial do pedido de
            orçamento. O site não envia nem armazena essas informações em servidor próprio: ao
            confirmar o formulário, ele abre uma conversa no WhatsApp com a mensagem preenchida pelo
            visitante.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">4. Tratamento pelo WhatsApp/Meta</h2>
          <p className="leading-relaxed text-muted-foreground">
            A partir do envio da mensagem, a conversa e seus dados passam a ser tratados dentro do
            WhatsApp, serviço da Meta, e ficam sujeitos aos termos e à política de privacidade dessa
            plataforma. O visitante deve consultar esses documentos antes de prosseguir.
          </p>
          <a
            href="https://www.whatsapp.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Consultar a Política de Privacidade do WhatsApp
          </a>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">5. Direitos do titular</h2>
          <p className="leading-relaxed text-muted-foreground">
            O titular pode solicitar informações, confirmação de tratamento, acesso, correção,
            eliminação quando aplicável e demais direitos previstos na Lei Geral de Proteção de
            Dados. As solicitações deverão ser encaminhadas ao e-mail indicado na seção de contato
            após o preenchimento desse dado pelo controlador.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">6. Atualizações</h2>
          <p className="leading-relaxed text-muted-foreground">
            Este aviso poderá ser atualizado para refletir mudanças no formulário, nos serviços ou
            nas obrigações legais. A versão definitiva deverá informar sua data de vigência após a
            revisão jurídica.
          </p>
        </section>
      </article>
    </main>
  );
}
