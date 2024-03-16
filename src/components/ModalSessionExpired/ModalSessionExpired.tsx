import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setSessionExpired } from "../../redux/auth/authSlice";

const ModalSessionExpired: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      dispatch(setSessionExpired(false));
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-black/75 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen">
      <div className="relative bg-shark  rounded-lg shadow w-full max-w-md max-h-full mb-4">
        <button
          type="button"
          onClick={() => dispatch(setSessionExpired(false))}
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-black/40 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="text-lg font-black mb-4 mt-4">
            Your session has expired.
          </h3>
          <p className="mb-4">
            For security reasons, please log in again to continue accessing the
            platform.
          </p>
          <button
            onClick={() => dispatch(setSessionExpired(false))}
            className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-green font-extrabold rounded-full text-sm px-5 py-2.5 text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSessionExpired;
