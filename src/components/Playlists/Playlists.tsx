import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserPlaylists } from "../../redux/userData/userDataOperations";
import { Link } from "react-router-dom";
import PlaylistCover from "../PlaylistCover/PlaylistCover";

const Playlists: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const userPlailists = useAppSelector((state) => state.data.playlists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token && user && user.id) {
      dispatch(
        getUserPlaylists({
          accessToken: currentToken.access_token,
          userID: user.id,
        })
      );
    }
  }, [currentToken, user]);

  return (
    <>
      {isAuthenticated && (
        <div>
          <h2 className="text-3xl font-black pb-4">Playlists</h2>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-2">
            {userPlailists &&
              userPlailists.map((playlist: any) => (
                <li
                  key={playlist.id}
                  className="hover:opacity-70 transition duration-200 ease-in-out"
                >
                  <Link to={`/playlist/${playlist.id}`}>
                    <div className="bg-shark aspect-square rounded-lg mb-2 hover:opacity-70 transition duration-200 ease-in-out">
                      {playlist.images[0]?.url ? (
                        <img
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          className="object-cover aspect-square rounded-lg"
                        />
                      ) : (
                        <PlaylistCover />
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
