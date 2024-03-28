import { useState } from "react";
import { redirectUri } from "../../constants/constants";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { refreshToken } from "../../redux/auth/authOperations";
import { logout } from "../../redux/auth/authSlice";
import * as Icons from "../ui/icons/flowbite";
import SessionTimer from "../SessionTimer/SessionTimer";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
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
    <header className="bg-black backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90 border-b border-silver-900 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-silver-699 rounded-lg cursor-pointer md:hidden hover:bg-shark/50 focus:bg-shark/60 focus:ring-2 focus:ring-green"
          >
            <Icons.BarIcon />
            <span className="sr-only">Toggle sidebar</span>
          </button>

          <div className="flex items-center text-xl font-black">
            <Icons.PlayIconSolid />
            Music App
            <span className="hidden md:block text-green text-xs font-medium ms-2 px-2.5 py-0.5 rounded-full border border-green">
              with Spotify Web API
            </span>
          </div>
        </div>

        <div className="flex items-center lg:order-2 relative">
          <SessionTimer />

          <button
            type="button"
            className="flex mx-3 text-sm bg-green rounded-full md:mr-0 focus:ring-4 focus:ring-green"
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
              className="absolute z-50 my-4 min-w-56 text-base list-none bg-shark divide-y divide-silver-900 shadow rounded-xl top-8 right-0"
              id="dropdown"
            >
              <div className="py-3 px-4">
                <div className="flex gap-2 items-center text-xl font-semibold">
                  {user?.display_name ?? "No name"}

                  <span className="text-blue text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue">
                    {user?.product}
                  </span>
                </div>
                <div className="block text-sm text-silver-500 truncate">
                  {user?.email ?? "No data"}
                </div>
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
  );
};

export default Header;
