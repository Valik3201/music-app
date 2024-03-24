import { useState, useEffect } from "react";
import { redirectUri } from "../../constants/constants";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { refreshToken } from "../../redux/auth/authOperations";
import { getUserPlaylists } from "../../redux/userData/userDataOperations";
import { logout } from "../../redux/auth/authSlice";
import { Outlet, NavLink } from "react-router-dom";
import * as Icons from "../ui/icons/flowbite";
import SessionTimer from "../SessionTimer/SessionTimer";

const Root: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const userPlaylists = useAppSelector((state) => state.data.playlists);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(getUserPlaylists(currentToken.access_token));
    }
  }, []);

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
              <span className="text-green text-xs font-medium ms-2 px-2.5 py-0.5 rounded-full border border-green">
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

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black pt-12 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-black">
          <div className="flex flex-col gap-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to=""
                    className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <Icons.HomeIconSolid />
                        ) : (
                          <Icons.HomeIconOutline />
                        )}
                        Home
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/search"
                    className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <Icons.SearchIconSolid />
                        ) : (
                          <Icons.SearchIconOutline />
                        )}
                        Search
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/create-playlist"
                    className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <Icons.PlusIcon green />
                        ) : (
                          <Icons.PlusIcon />
                        )}
                        Create Playlist
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>

            {userPlaylists && (
              <ul className="py-5 space-y-2 border-t border-silver-900">
                <li>
                  <NavLink
                    to="/all-playlists"
                    className="flex items-center gap-2 p-2 text-base rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <Icons.GridIconSolid />
                        ) : (
                          <Icons.GridIconOutline />
                        )}
                        All Playlists
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/favorite"
                    className="flex items-center gap-2 p-2 text-base rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <Icons.StarIconSolid />
                        ) : (
                          <Icons.StarIconOutline />
                        )}
                        Favorite Songs
                      </>
                    )}
                  </NavLink>
                </li>

                {Object.values(userPlaylists)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((playlist: any) => (
                    <li key={playlist.id}>
                      <NavLink
                        to={`/playlist/${playlist.id}`}
                        className="flex items-center gap-2 p-2 text-base rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
                      >
                        {({ isActive }) => (
                          <>
                            {isActive ? (
                              <Icons.ListMusicSolid />
                            ) : (
                              <Icons.ListMusicOutline />
                            )}
                            {playlist.name}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-black text-silver-400 text-xs font-medium z-20">
          Copyright {new Date().getFullYear()}
        </div>
      </aside>

      <main className="p-8 md:ml-64 h-auto pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
