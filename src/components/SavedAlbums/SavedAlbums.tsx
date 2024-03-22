import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserSavedAlbums } from "../../redux/userData/userDataOperations";

const SavedAlbums: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const savedAlbums = useAppSelector((state) => state.data.albums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(getUserSavedAlbums(currentToken.access_token));
    }
  }, [currentToken]);

  return (
    <>
      {isAuthenticated && (
        <div>
          <h2 className="text-3xl font-black pb-4">Saved Albums</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-4">
            {savedAlbums &&
              savedAlbums.map((album: any) => (
                <li key={album.album.id}>
                  <a
                    href={album.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={album.album.images[0].url}
                      alt={album.album.name}
                      className="h-auto max-w-full rounded-lg mb-2 hover:opacity-80 transition duration-200 ease-in-out"
                    />
                    <p className="font-bold">{album.album.name}</p>
                    <p className="text-silver-400">
                      {album.album.artists
                        .map((artist: any) => artist.name)
                        .join(", ")}
                    </p>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SavedAlbums;
