import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatedButton } from "@/components/AnimatedButton";

const BUSINESS_OPTIONS = [
  { value: "comercio", label: "Comércio ou loja" },
  { value: "servicos", label: "Prestador de serviços" },
  { value: "empresa", label: "Empresa" },
  { value: "outro", label: "Outro" },
] as const;

const SITE_OPTIONS = [
  { value: "landing-page", label: "Landing Page" },
  { value: "institucional", label: "Site institucional" },
  { value: "loja-online", label: "Vendas & Conversão" },
  { value: "sistema-personalizado", label: "Sistema Personalizado" },
  { value: "outro", label: "Outro" },
] as const;

const CONTENT_OPTIONS = [
  { value: "tudo-pronto", label: "Já tenho tudo (textos e imagens prontos)" },
  { value: "apenas-imagens", label: "Tenho apenas imagens" },
  { value: "apenas-textos", label: "Tenho apenas textos" },
  { value: "nada", label: "Não possuo nada ainda" },
] as const;

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Por favor, informe seu nome completo.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
    businessType: z.enum(["comercio", "servicos", "empresa", "outro"], {
      required_error: "Selecione o tipo de negócio.",
      invalid_type_error: "Selecione um tipo de negócio válido.",
    }),
    businessTypeOther: z.string().trim().max(100, "Máximo de 100 caracteres.").optional(),
    siteTypes: z.array(z.string()).min(1, "Selecione pelo menos um tipo de site."),
    siteTypeOther: z.string().trim().max(100, "Máximo de 100 caracteres.").optional(),
    content: z.enum(["tudo-pronto", "apenas-imagens", "apenas-textos", "nada"], {
      required_error: "Selecione uma opção sobre textos e imagens.",
      invalid_type_error: "Selecione uma opção válida.",
    }),
    currentSite: z.string().trim().max(500, "O link deve ter no máximo 500 caracteres.").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.businessType === "outro" && !data.businessTypeOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessTypeOther"],
        message: "Descreva seu tipo de negócio.",
      });
    }
    if (
      data.siteTypes.includes("outro") &&
      (!data.siteTypeOther || data.siteTypeOther.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["siteTypeOther"],
        message: "Descreva o tipo de site desejado.",
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Orcamento() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteTypes: [],
    },
    mode: "onSubmit",
  });

  const businessType = watch("businessType");
  const siteTypes = watch("siteTypes");
  const showBusinessOther = businessType === "outro";
  const showSiteOther = siteTypes.includes("outro");

  const onSubmit = (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const businessLabel =
      data.businessType === "outro"
        ? data.businessTypeOther
        : BUSINESS_OPTIONS.find((b) => b.value === data.businessType)?.label;

    const siteTypeLabels = data.siteTypes.map((value) => {
      if (value === "outro") return data.siteTypeOther;
      return SITE_OPTIONS.find((s) => s.value === value)?.label;
    });

    const contentLabel = CONTENT_OPTIONS.find((c) => c.value === data.content)?.label;

    const lines = [
      "Olá Rafael! Tudo bem? Vim através do seu site e gostaria de um orçamento.",
      "",
      `Nome: ${data.name}`,
      `Tipo de negócio: ${businessLabel}`,
      `Tipo de site desejado: ${siteTypeLabels.join(", ")}`,
      `Sobre textos e imagens: ${contentLabel}`,
    ];

    if (data.currentSite && data.currentSite.trim().length > 0) {
      lines.push(`Site atual: ${data.currentSite.trim()}`);
    }

    lines.push("", "Aguardo o contato, obrigado!");

    const message = lines.join("\n");
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5521977072215?text=${encoded}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => setIsSubmitting(false), 800);
  };

  return (
    <section
      id="orcamento"
      className="theme-light relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            Orçamento rápido
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Vamos começar seu <span className="text-gradient-blue">projeto?</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Preencha as informações abaixo e receba um orçamento personalizado direto no meu
            WhatsApp.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-12 space-y-10 overflow-hidden rounded-[2rem] border border-primary/15 bg-card/80 p-5 shadow-[0_24px_70px_oklch(0.25_0.04_250/0.12)] backdrop-blur-xl sm:p-9 lg:p-11"
          noValidate
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          {/* Name */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground/80"
            >
              Nome e sobrenome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ex: João Silva"
              {...register("name")}
              className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/55 hover:border-primary/35 focus:border-primary/70 focus:ring-4 focus:ring-primary/12 sm:text-sm"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          {/* Business type */}
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground/80">
              Qual o seu tipo de negócio?
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BUSINESS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex min-h-[54px] cursor-pointer items-center gap-3 rounded-full border px-5 py-3 transition-all duration-200 ${
                    businessType === option.value
                      ? "border-primary bg-primary/15 text-foreground shadow-[0_8px_24px_oklch(0.55_0.16_245/0.16)] ring-1 ring-primary/20"
                      : "border-border bg-background/70 text-muted-foreground shadow-sm hover:border-primary/45 hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register("businessType")}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.businessType && (
              <p className="text-xs text-destructive">{errors.businessType.message}</p>
            )}

            <AnimatePresence initial={false}>
              {showBusinessOther && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Descreva seu tipo de negócio"
                    {...register("businessTypeOther")}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/55 hover:border-primary/35 focus:border-primary/70 focus:ring-4 focus:ring-primary/12"
                  />
                  {errors.businessTypeOther && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.businessTypeOther.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Site types */}
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground/80">
              Tipo de site que você procura
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SITE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex min-h-[54px] cursor-pointer items-center gap-3 rounded-full border px-5 py-3 transition-all duration-200 ${
                    siteTypes.includes(option.value)
                      ? "border-primary bg-primary/15 text-foreground shadow-[0_8px_24px_oklch(0.55_0.16_245/0.16)] ring-1 ring-primary/20"
                      : "border-border bg-background/70 text-muted-foreground shadow-sm hover:border-primary/45 hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    {...register("siteTypes")}
                    className="h-4 w-4 cursor-pointer rounded border-border/80 accent-primary"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.siteTypes && (
              <p className="text-xs text-destructive">{errors.siteTypes.message}</p>
            )}

            <AnimatePresence initial={false}>
              {showSiteOther && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Descreva o tipo de site desejado"
                    {...register("siteTypeOther")}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/55 hover:border-primary/35 focus:border-primary/70 focus:ring-4 focus:ring-primary/12"
                  />
                  {errors.siteTypeOther && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.siteTypeOther.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground/80">
              Sobre textos e imagens
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex min-h-[54px] cursor-pointer items-center gap-3 rounded-full border px-5 py-3 transition-all duration-200 ${
                    watch("content") === option.value
                      ? "border-primary bg-primary/15 text-foreground shadow-[0_8px_24px_oklch(0.55_0.16_245/0.16)] ring-1 ring-primary/20"
                      : "border-border bg-background/70 text-muted-foreground shadow-sm hover:border-primary/45 hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register("content")}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
          </div>

          {/* Current site */}
          <div className="space-y-3">
            <label
              htmlFor="currentSite"
              className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground/80"
            >
              Se você já tem um site e quer reformular, cole o link aqui{" "}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="currentSite"
              type="text"
              placeholder="https://seusite.com"
              {...register("currentSite")}
              className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/55 hover:border-primary/35 focus:border-primary/70 focus:ring-4 focus:ring-primary/12 sm:text-sm"
            />
            {errors.currentSite && (
              <p className="text-xs text-destructive">{errors.currentSite.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <AnimatedButton type="submit" disabled={isSubmitting} variant="primary">
              Enviar orçamento pelo WhatsApp
            </AnimatedButton>
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/65 px-4 py-3.5 text-center shadow-sm">
            <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="text-xs leading-relaxed text-muted-foreground">
              <p>
                Seus dados são usados apenas para o orçamento e não são armazenados em servidor
                próprio.
              </p>
              <a
                href="/privacidade"
                className="mt-1 inline-flex font-medium text-primary transition-colors hover:text-primary/80"
              >
                Leia o Aviso de Privacidade
              </a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
