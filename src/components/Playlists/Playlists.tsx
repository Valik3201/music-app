import { useAppSelector } from "../../redux/hooks";

import { Link } from "react-router-dom";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";

const Playlists: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userPlaylists = useAppSelector((state) => state.data.playlists);

  return (
    <>
      {isAuthenticated && (
        <div>
          <h2 className="text-3xl font-black pb-4">Playlists</h2>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-2">
            {userPlaylists &&
              userPlaylists.map((playlist: any) => (
                <li
                  key={playlist.id}
                  className="hover:opacity-70 transition duration-200 ease-in-out"
                >
                  <Link to={`/playlist/${playlist.id}`}>
                    <div className="bg-shark aspect-square rounded-lg mb-2 hover:opacity-70 transition duration-200 ease-in-out">
                      {playlist.images && playlist.images[0].url ? (
                        <img
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          className="object-cover aspect-square rounded-lg"
                        />
                      ) : (
                        <PlaylistCover size={"w-full h-full"} />
                      )}
                    </div>

                    <p className="font-bold">{playlist.name}</p>
                    <p className="text-silver-400">
                      {playlist.owner.display_name}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Playlists;
