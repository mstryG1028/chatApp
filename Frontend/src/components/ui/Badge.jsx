import { cn } from "../../utils/cn";

const Badge = ({ children, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-primary text-white",

    success: "bg-success text-white",

    warning: "bg-warning text-white",

    danger: "bg-danger text-white",

    muted: "bg-surface text-text",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-full",
        "px-2.5 py-1",
        "text-xs",
        "font-medium",

        variants[variant],

        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
