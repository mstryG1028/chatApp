const AuthHeader = ({ heading, description }) => {
  return (
    <div className="mb-6 text-center">
      <h2
        className="
        text-2xl
        font-semibold
        text-text
      "
      >
        {heading}
      </h2>

      <p
        className="
        mt-2
        text-sm
        text-text-muted
      "
      >
        {description}
      </p>
    </div>
  );
};

export default AuthHeader;
