import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserPlaylists } from "../../redux/userData/userDataOperations";

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

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-4">
            {userPlailists &&
              userPlailists.map((playlist: any) => (
                <li key={playlist.id}>
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="h-auto max-w-full rounded-lg mb-2"
                  />
                  <p className="font-bold">{playlist.name}</p>
                  <p className="text-silver-400">
                    {playlist.owner.display_name}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Playlists;