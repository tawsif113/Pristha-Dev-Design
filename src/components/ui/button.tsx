import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "primary-button",
  secondary: "secondary-button",
  ghost: "ghost-button",
  danger: "danger-button",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leadingIcon,
  className,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        variantClasses[variant],
        "ui-button",
        "ui-button-" + size,
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="ui-spinner" aria-hidden="true" />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
    </button>
  );
}
