import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-silver-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <p className="text-green italic mb-8">
            {error.statusText || error.message}
          </p>
          <Link
            to="/"
            className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
