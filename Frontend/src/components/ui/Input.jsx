import { cn } from "../../utils/cn";

const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = "",
  inputClassName = "",
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text">
          {label}

          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <div
        className={cn(
          "flex items-center",

          "rounded-lg",

          "border border-border",

          "bg-background",

          "transition-all duration-200",

          "focus-within:border-primary",
          "focus-within:ring-2",
          "focus-within:ring-primary/20",

          disabled && "opacity-60",

          error && "border-danger ring-2 ring-danger/20",

          className,
        )}
      >
        {leftIcon && <div className="pl-3 text-text-muted">{leftIcon}</div>}

        <input
          disabled={disabled}
          className={cn(
            "h-11 w-full",

            "bg-transparent",

            "px-3",

            "text-sm text-text",

            "placeholder:text-text-muted",

            "outline-none",

            inputClassName,
          )}
          {...props}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="pr-3 text-text-muted hover:text-text"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-text-muted">{helperText}</p>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};

export default Input;
