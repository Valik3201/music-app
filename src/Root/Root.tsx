import { redirectUri } from "../constants/constants";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { refreshToken } from "../redux/auth/authOperations";
import { logout } from "../redux/auth/authSlice";
import { Outlet, Link } from "react-router-dom";

const Root: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const logoutClick = () => {
    localStorage.clear();
    window.location.href = redirectUri;
    dispatch(logout());
  };

  const refreshTokenClick = () => {
    if (currentToken && currentToken.refresh_token) {
      dispatch(refreshToken(currentToken.refresh_token));
    }
  };

  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-black pt-14 transition-transform -translate-x-full md:translate-x-0">
        <div className="overflow-y-auto py-5 px-3 h-full bg-grey/5">
          <div className="flex flex-col gap-4">
            {user && (
              <h1 className="text-xl font-extrabold">
                Welcome Back, {user?.display_name}
              </h1>
            )}

            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={``}
                    className="flex items-center p-2 text-base font-bold rounded-lg hover:bg-grey/15 transition duration-200 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={`search`}
                    className="flex items-center p-2 text-base font-bold rounded-lg hover:bg-grey/15 transition duration-200 ease-in-out"
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              onClick={refreshTokenClick}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
            >
              Refresh Token
            </button>
            <button
              onClick={logoutClick}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="p-4 md:ml-64 h-auto pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
