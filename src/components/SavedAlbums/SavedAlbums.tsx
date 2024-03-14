import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchUserSavedAlbums } from "../../redux/userData/userDataOperations";

const SavedAlbums: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const savedAlbums = useAppSelector((state) => state.data.albums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(fetchUserSavedAlbums(currentToken.access_token));
    }
  }, [currentToken]);

  return (
    <>
      {isAuthenticated && (
        <div>
          <h2 className="text-3xl font-bold">Saved Albums</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {savedAlbums.map((album: any, index) => (
              <li key={index}>
                <img
                  src={album.album.images[0].url}
                  alt={album.album.name}
                  className="h-auto max-w-full rounded-lg"
                />
                <p className="font-bold">{album.album.name}</p>
                <p className="text-grey">
                  {album.album.artists
                    .map((artist: any) => artist.name)
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SavedAlbums;
