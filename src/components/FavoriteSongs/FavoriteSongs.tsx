import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getUserTracks } from "../../redux/userData/userDataOperations";
import PlaylistComponents from "../ui/PlaylistComponents/PlaylistComponents";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";
import { Link } from "react-router-dom";

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

  const totalDuration = useMemo(() => {
    if (!favoriteSongs) return 0;

    return favoriteSongs.reduce((total, item) => {
      return total + item.track.duration_ms;
    }, 0);
  }, [favoriteSongs]);

  const totalDurationInMinutes = Math.floor(totalDuration / 60000);

  const hours = Math.floor(totalDurationInMinutes / 60);
  const minutes = totalDurationInMinutes % 60;

  let totalTimeString = "";

  if (hours > 0) {
    totalTimeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  totalTimeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

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
                  <Link to={`/album/${item.track.album.id}`}>
                    {item.track.album.name}
                    {item.track.album.album_type === "single" && (
                      <span>
                        {" - "}
                        {item.track.album.album_type.charAt(0).toUpperCase() +
                          item.track.album.album_type.slice(1)}
                      </span>
                    )}
                  </Link>
                </td>
                <td className="text-silver-400 text-center py-2">
                  <div className="flex gap-1.5 items-center">
                    {Math.floor(item.track.duration_ms / 60000)}:
                    {(
                      "0" + Math.floor((item.track.duration_ms % 60000) / 1000)
                    ).slice(-2)}
                    <AddToPlaylistModal uri={item.track.uri} />
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          <SongCount>
            {favoriteSongs.length} songs, {totalTimeString}
          </SongCount>
        </Playlist>
      )}
    </>
  );
};

export default FavoriteSongs;
