import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserPlaylists } from "../../redux/userData/userDataOperations";
import { NavLink } from "react-router-dom";
import * as Icons from "../ui/icons/flowbite";

export const HomeIcon: React.FC<{ solid: boolean }> = ({ solid }) => {
  return solid ? <Icons.HomeIconSolid /> : <Icons.HomeIconOutline />;
};

export const SearchIcon: React.FC<{ solid: boolean }> = ({ solid }) => {
  return solid ? <Icons.SearchIconSolid /> : <Icons.SearchIconOutline />;
};

export const StarIcon: React.FC<{ solid: boolean }> = ({ solid }) => {
  return solid ? <Icons.StarIconSolid /> : <Icons.StarIconOutline />;
};

export const GridIcon: React.FC<{ solid: boolean }> = ({ solid }) => {
  return solid ? <Icons.GridIconSolid /> : <Icons.GridIconOutline />;
};

const SidebarNavItem: React.FC<{
  to: string;
  icon: React.ElementType;
  text: string;
}> = ({ to, icon: Icon, text }) => (
  <li>
    <NavLink
      to={to}
      className="flex items-center gap-2 p-2 text-base font-bold rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
    >
      {({ isActive }) => (
        <>
          {isActive ? <Icon solid /> : <Icon outline />}
          {text}
        </>
      )}
    </NavLink>
  </li>
);

const SidebarPlaylistItem: React.FC<{ id: string; name: string }> = ({
  id,
  name,
}) => (
  <li>
    <NavLink
      to={`/playlist/${id}`}
      className="flex items-center gap-2 p-2 text-base rounded-lg hover:bg-shark/50 transition duration-200 ease-in-out"
    >
      {({ isActive }) => (
        <>
          {isActive ? <Icons.ListMusicSolid /> : <Icons.ListMusicOutline />}
          <p className="truncate">{name}</p>
        </>
      )}
    </NavLink>
  </li>
);

const Sidebar: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const userPlaylists = useAppSelector((state) => state.data.playlists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(getUserPlaylists(currentToken.access_token));
    }
  }, [currentToken, dispatch]);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black pt-12 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-black">
        <div className="flex flex-col gap-4">
          <nav>
            <ul className="space-y-2">
              <SidebarNavItem to="" icon={HomeIcon} text="Home" />
              <SidebarNavItem to="/search" icon={SearchIcon} text="Search" />
              <SidebarNavItem
                to="/create-playlist"
                icon={Icons.PlusIcon}
                text="Create Playlist"
              />
            </ul>
          </nav>

          {userPlaylists && (
            <ul className="py-5 space-y-2 border-t border-silver-900">
              <SidebarNavItem
                to="/all-playlists"
                icon={GridIcon}
                text="All Playlists"
              />
              <SidebarNavItem
                to="/favorite"
                icon={StarIcon}
                text="Favorite Songs"
              />
              {Object.values(userPlaylists)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((playlist: any) => (
                  <SidebarPlaylistItem
                    key={playlist.id}
                    id={playlist.id}
                    name={playlist.name}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-black text-silver-400 text-xs font-medium z-20">
        Copyright {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default Sidebar;
