import { cn } from "../../utils/cn";

const Avatar = ({
  src,
  name = "",
  size = "md",
  online = false,
  className = "",
}) => {
  const sizes = {
    sm: "h-9 w-9 text-sm",
    md: "h-11 w-11 text-base",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };

  const getInitials = (value) => {
    if (!value) return "?";

    return value
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center justify-center",

          "overflow-hidden",

          "rounded-full",

          "bg-primary/15",

          "font-semibold",

          "text-primary",

          "select-none",

          sizes[size],

          className,
        )}
      >
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>

      {online && (
        <span
          className="
            absolute
            bottom-0
            right-0

            h-3.5
            w-3.5

            rounded-full

            border-2
            border-surface

            bg-success
          "
        />
      )}
    </div>
  );
};

export default Avatar;
