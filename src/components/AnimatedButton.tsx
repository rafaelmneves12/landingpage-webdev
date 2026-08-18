import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "dark" | "light";
  size?: "sm" | "md";
  className?: string;
};

type AnimatedAnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type AnimatedNativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type AnimatedButtonProps = AnimatedAnchorProps | AnimatedNativeButtonProps;

function isAnchorProps(props: AnimatedButtonProps): props is AnimatedAnchorProps {
  return typeof props.href === "string";
}

const VARIANTS = {
  primary:
    "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-105",
  dark: "border-white/15 bg-[#07111f] text-white shadow-lg shadow-black/15 hover:border-primary/45",
  light:
    "border-border bg-white text-slate-900 shadow-lg shadow-slate-900/10 hover:border-primary/40",
};

const ORB_VARIANTS = {
  primary: "bg-[#07111f] text-white group-hover:bg-white group-hover:text-[#07111f]",
  dark: "bg-primary text-[#07111f] group-hover:bg-white group-hover:text-[#07111f]",
  light: "bg-primary text-white group-hover:bg-[#07111f] group-hover:text-white",
};

function ButtonContent({
  children,
  size,
  variant,
}: Pick<CommonProps, "children" | "size"> & { variant: NonNullable<CommonProps["variant"]> }) {
  return (
    <>
      <span
        className={cn(
          "animated-button__label whitespace-nowrap transition-[padding] duration-[475ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          size === "sm"
            ? "pl-4 pr-11 group-hover:pl-11 group-hover:pr-4"
            : "pl-5 pr-14 group-hover:pl-14 group-hover:pr-5",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        data-size={size}
        className={cn(
          "animated-button__orb absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full transition-[left,background-color,color] duration-[475ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          size === "sm" ? "h-8 w-8" : "h-10 w-10",
          ORB_VARIANTS[variant],
        )}
      >
        <ArrowUpRight
          className={cn(
            "transition-transform duration-[475ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-45",
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
          )}
        />
      </span>
    </>
  );
}

export function AnimatedButton(props: AnimatedButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(
    "animated-button group relative inline-flex w-fit max-w-full items-center justify-center overflow-hidden rounded-full border font-semibold transition-all duration-[475ms] ease-[cubic-bezier(0.4,0,0.2,1)] disabled:cursor-not-allowed disabled:opacity-60",
    size === "sm" ? "h-10 text-xs" : "h-12 text-sm",
    VARIANTS[variant],
    className,
  );
  const content = (
    <ButtonContent size={size} variant={variant}>
      {children}
    </ButtonContent>
  );

  if (isAnchorProps(props)) {
    const {
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...anchorProps
    } = props;
    return (
      <a {...anchorProps} className={classes}>
        {content}
      </a>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;
  return (
    <button {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
