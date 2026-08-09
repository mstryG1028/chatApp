import { MessageCircle } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
 return (
  <main
    className="
      flex
      min-h-screen
      items-center
      justify-center

      bg-background

      px-4
      py-10
    "
  >

    <div
      className="
        w-full
        max-w-md

        rounded-2xl

        border
        border-border

        bg-surface

        p-8

        shadow-xl
      "
    >

      <div className="mb-8 text-center">

        <div
          className="
            mx-auto

            mb-4

            flex
            h-16
            w-16

            items-center
            justify-center

            rounded-2xl

            bg-primary
          "
        >
          <MessageCircle
            size={30}
            className="text-white"
          />
        </div>

        <h1 className="text-3xl font-bold text-text">
          {title}
        </h1>

        <p className="mt-2 text-sm text-text-muted">
          {subtitle}
        </p>

      </div>

      {children}

    </div>

  </main>
);
};

export default AuthLayout;
