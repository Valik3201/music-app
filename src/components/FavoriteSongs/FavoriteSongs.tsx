import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserTracks } from "../../redux/userData/userDataOperations";
import PlaylistComponents from "../ui/PlaylistComponents/PlaylistComponents";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";

const {
  Playlist,
  PlaylistHeader,
  PlaylistInfo,
  Type,
  Title,
  Artist,
  Description,
  Table,
  SongCount,
} = PlaylistComponents;

const FavoriteSongs = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const favoriteSongs = useAppSelector((state) => state.data.tracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(getUserTracks(currentToken.access_token));
    }
  }, [currentToken]);

  return (
    <>
      {isAuthenticated && favoriteSongs.length !== 0 && (
        <Playlist>
          <PlaylistHeader>
            <PlaylistCover variant="star" />

            <PlaylistInfo>
              <Type>Playlist</Type>
              <Title>Favourite Songs</Title>
              <Artist>{user?.display_name}</Artist>
              <Description>
                Your last 50 favourite tracks in one playlist.
              </Description>
            </PlaylistInfo>
          </PlaylistHeader>

          <Table>
            {favoriteSongs.map((item) => (
              <tr key={item.track.id}>
                <td className="flex gap-4 items-center py-2">
                  <img
                    src={item.track.album.images[0].url}
                    alt={item.track.name}
                    className="h-10 w-10 rounded-md"
                  />
                  <p className="font-bold truncate">{item.track.name}</p>
                </td>
                <td className="text-silver-400 truncate py-2">
                  {item.track.artists.map((artist: any, index: number) => [
                    <a
                      key={artist.id}
                      href={artist.external_urls.spotify}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artist.name}
                    </a>,
                    index !== item.track.artists.length - 1 && ", ",
                  ])}
                </td>
                <td className="text-silver-400 truncate py-2">
                  <a
                    href={item.track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {item.track.album.name}
                  </a>
                </td>
                <td className="text-silver-400 text-center py-2">
                  {Math.floor(item.track.duration_ms / 60000)}:
                  {(
                    "0" + Math.floor((item.track.duration_ms % 60000) / 1000)
                  ).slice(-2)}
                </td>
              </tr>
            ))}
          </Table>

          <SongCount>{favoriteSongs.length} songs</SongCount>
        </Playlist>
      )}
    </>
  );
};

export default FavoriteSongs;
