import { LoaderCircle } from "lucide-react";
import { cn } from "../../utils/cn";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",

    secondary: "border border-border bg-surface text-text hover:bg-background",

    outline: "border border-primary text-primary hover:bg-primary/10",

    danger: "bg-danger text-white hover:opacity-90",

    ghost: "text-text hover:bg-surface",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",

    md: "h-11 px-5 text-sm",

    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2",

        "rounded-lg",

        "font-medium",

        "transition-all duration-200",

        "disabled:cursor-not-allowed",
        "disabled:opacity-60",

        "active:scale-[0.98]",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle size={18} className="animate-spin" /> : leftIcon}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
};

export default Button;
