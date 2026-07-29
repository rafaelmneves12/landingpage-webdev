import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const BUSINESS_OPTIONS = [
  { value: "comercio", label: "Comércio ou loja" },
  { value: "servicos", label: "Prestador de serviços" },
  { value: "empresa", label: "Empresa" },
  { value: "outro", label: "Outro" },
] as const;

const SITE_OPTIONS = [
  { value: "one-page", label: "One-page" },
  { value: "landing-page", label: "Landing Page" },
  { value: "institucional", label: "Site institucional" },
  { value: "blog", label: "Blog" },
  { value: "cardapio-digital", label: "Cardápio Digital" },
  { value: "catalogo-digital", label: "Catálogo Digital" },
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
    businessTypeOther: z
      .string()
      .trim()
      .max(100, "Máximo de 100 caracteres.")
      .optional(),
    siteTypes: z
      .array(z.string())
      .min(1, "Selecione pelo menos um tipo de site."),
    siteTypeOther: z
      .string()
      .trim()
      .max(100, "Máximo de 100 caracteres.")
      .optional(),
    content: z.enum(
      ["tudo-pronto", "apenas-imagens", "apenas-textos", "nada"],
      {
        required_error: "Selecione uma opção sobre textos e imagens.",
        invalid_type_error: "Selecione uma opção válida.",
      }
    ),
    currentSite: z
      .string()
      .trim()
      .max(500, "O link deve ter no máximo 500 caracteres.")
      .optional(),
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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

    const contentLabel = CONTENT_OPTIONS.find(
      (c) => c.value === data.content
    )?.label;

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
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            Orçamento rápido
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Vamos começar seu{" "}
            <span className="text-gradient-blue">projeto?</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Preencha as informações abaixo e receba um orçamento personalizado
            direto no meu WhatsApp.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 space-y-8 rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-8 lg:p-10"
          noValidate
        >
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">
              Nome e sobrenome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ex: João Silva"
              {...register("name")}
              className="w-full rounded-xl border border-border/80 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-offset-background transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Business type */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-foreground">
              Qual o seu tipo de negócio?
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BUSINESS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    businessType === option.value
                      ? "border-primary/70 bg-primary/15 text-foreground"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:bg-card/60"
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
              <p className="text-xs text-destructive">
                {errors.businessType.message}
              </p>
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
                    className="mt-2 w-full rounded-xl border border-border/80 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-offset-background transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
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
          <div className="space-y-3">
            <span className="text-sm font-semibold text-foreground">
              Tipo de site que você procura
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SITE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    siteTypes.includes(option.value)
                      ? "border-primary/70 bg-primary/15 text-foreground"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:bg-card/60"
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
              <p className="text-xs text-destructive">
                {errors.siteTypes.message}
              </p>
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
                    className="mt-2 w-full rounded-xl border border-border/80 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-offset-background transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
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
          <div className="space-y-3">
            <span className="text-sm font-semibold text-foreground">
              Sobre textos e imagens
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    watch("content") === option.value
                      ? "border-primary/70 bg-primary/15 text-foreground"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:bg-card/60"
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
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content.message}</p>
            )}
          </div>

          {/* Current site */}
          <div className="space-y-2">
            <label
              htmlFor="currentSite"
              className="text-sm font-semibold text-foreground"
            >
              Se você já tem um site e quer reformular, cole o link aqui{" "}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="currentSite"
              type="text"
              placeholder="https://seusite.com"
              {...register("currentSite")}
              className="w-full rounded-xl border border-border/80 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-offset-background transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
            {errors.currentSite && (
              <p className="text-xs text-destructive">
                {errors.currentSite.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Enviar orçamento pelo WhatsApp
            <ArrowRight className="h-4 w-4" />
          </motion.button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-background/40 px-4 py-3 text-center">
            <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Seus dados são usados apenas para o orçamento e não são
              armazenados em nenhum servidor.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
