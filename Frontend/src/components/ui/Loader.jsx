import { cn } from "../../utils/cn";

const Loader = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4",

    md: "h-6 w-6",

    lg: "h-10 w-10",
  };

  return (
    <div
      className={cn(
        "animate-spin",
        "rounded-full",
        "border-2",
        "border-border",
        "border-t-primary",

        sizes[size],

        className,
      )}
    />
  );
};

export default Loader;
