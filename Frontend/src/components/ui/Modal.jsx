import { cn } from "../../utils/cn";

const Modal = ({ isOpen, onClose, title, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className={cn(
          "w-full max-w-md",
          "rounded-lg",
          "bg-surface",
          "p-6",
          "shadow-md",

          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-text">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="
              text-text-muted
              hover:text-text
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
