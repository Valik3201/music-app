import { useState } from "react";
import { redirectUri } from "../../constants/constants";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { refreshToken } from "../../redux/auth/authOperations";
import { logout } from "../../redux/auth/authSlice";
import { Outlet, NavLink } from "react-router-dom";
import {
  HomeIconOutline,
  HomeIconSolid,
  SearchIconOutline,
  SearchIconSolid,
} from "../../icons/flowbite";

const Root: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <header className="bg-shark border-b border-shark px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="text-xl font-black">Music App</div>
          </div>

          <div className="flex items-center lg:order-2 relative">
            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open user menu</span>

              <img
                className="w-8 h-8 rounded-full"
                src={user?.images[0].url}
                alt="User photo"
              />
            </button>

            {isOpen && (
              <div
                className="absolute z-50 my-4 min-w-56 text-base list-none bg-shark divide-y divide-silver-500 shadow rounded-xl top-8 right-0"
                id="dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold">
                    {user?.display_name}
                  </span>
                  <span className="block text-sm text-silver-500 truncate">
                    {user?.email}
                  </span>
                </div>

                <div>
                  <button
                    onClick={refreshTokenClick}
                    className="block w-full text-left py-2 px-4 text-sm hover:bg-black/40"
                  >
                    Refresh Token
                  </button>
                  <button
                    onClick={logoutClick}
                    className="block w-full text-left py-2 px-4 text-sm hover:bg-black/40"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-black pt-14 transition-transform -translate-x-full md:translate-x-0">
        <div className="overflow-y-auto py-5 px-3 h-full bg-shark">
          <div className="flex flex-col gap-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to=""
                    className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-black/40 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? <HomeIconSolid /> : <HomeIconOutline />}
                        Home
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/search"
                    className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-black/40 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? <SearchIconSolid /> : <SearchIconOutline />}
                        Search
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      <main className="p-8 md:ml-64 h-auto pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default Root;