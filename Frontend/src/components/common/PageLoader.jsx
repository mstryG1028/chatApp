import Loader from "../ui/Loader";

const PageLoader = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
      "
    >
      <Loader size="lg" />
    </div>
  );
};

export default PageLoader;
