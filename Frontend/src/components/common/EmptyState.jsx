const EmptyState = ({ title = "No Data Found", description, icon = "📭" }) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-3
        text-center
        p-6
      "
    >
      <div className="text-4xl">{icon}</div>

      <h3 className="text-lg font-semibold text-text">{title}</h3>

      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
  );
};

export default EmptyState;
