import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../api/spotify";
import { useAppSelector } from "../../redux/hooks";
import * as Types from "./types";
import PlaylistComponents from "../ui/PlaylistComponents/PlaylistComponents";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";
import { Link } from "react-router-dom";
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";
import PlaylistSkeleton from "../ui/PlaylistSkeleton/PlaylistSkeleton";

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

const PlaylistItem = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const { playlistID } = useParams<{ playlistID: string }>();
  const [playlist, setPlaylist] = useState<Types.Playlist | null>(null);

  console.log(playlist?.tracks);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setPlaylist(null);

      try {
        if (!playlistID) {
          throw new Error("Playlist ID is not provided");
        }

        if (currentToken && currentToken.access_token) {
          const playlistData = await getPlaylist(
            currentToken.access_token,
            playlistID
          );
          setPlaylist(playlistData);
        }
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
    };

    fetchPlaylist();
  }, [playlistID, currentToken]);

  const totalDuration = useMemo(() => {
    if (!playlist?.tracks?.items) return 0;

    return playlist.tracks.items.reduce((total, item) => {
      return total + (item.track?.duration_ms || 0);
    }, 0);
  }, [playlist]);

  const totalDurationInMinutes = Math.floor(totalDuration / 60000);
  const hours = Math.floor(totalDurationInMinutes / 60);
  const minutes = totalDurationInMinutes % 60;

  let totalTimeString = "";

  if (hours > 0) {
    totalTimeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  totalTimeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

  if (!playlist) {
    return <PlaylistSkeleton />;
  }

  return (
    <>
      {playlist && (
        <Playlist>
          <PlaylistHeader>
            {playlist.images && playlist.images[0]?.url ? (
              <div className="bg-shark w-64 h-64 rounded-lg mb-2 mr-4">
                <img
                  src={playlist.images[0]?.url || ""}
                  alt={playlist.name || "Playlist cover"}
                  className="object-cover aspect-square rounded-lg h-full min-w-64"
                />
              </div>
            ) : (
              <PlaylistCover />
            )}
            <PlaylistInfo>
              <Type>{playlist.type}</Type>
              <Title>{playlist.name || "Unknown Playlist"}</Title>
              <Artist>
                <a
                  href={playlist.owner?.external_urls?.spotify || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green font-medium text-2xl"
                >
                  {playlist.owner?.display_name || "Unknown Artist"}
                </a>
              </Artist>
              <Description>
                {playlist.description || "No description available"}
              </Description>
            </PlaylistInfo>
          </PlaylistHeader>

          <Table>
            {playlist.tracks.items.map((item) => (
              <tr
                key={item.track?.id}
                className="odd:bg-shark/50 even:bg-black"
              >
                <td className="relative py-4 px-2">
                  <p className="font-bold truncate ms-12">
                    {item.track?.name || "Unknown Track"}
                  </p>

                  <div className="lg:hidden truncate ms-12">
                    {item.track?.artists?.map((artist, index) => [
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
                  </div>

                  <div
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-md bg-cover"
                    style={{
                      backgroundImage: `url(${
                        item.track?.album?.images[0]?.url || ""
                      })`,
                    }}
                  ></div>
                </td>

                <td className="hidden lg:table-cell text-silver-400 truncate py-4">
                  {item.track?.artists?.map((artist, index) => [
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
                <td className="hidden lg:table-cell text-silver-400 truncate py-4">
                  <Link to={`/album/${item.track?.album?.id || ""}`}>
                    {item.track?.album?.name || "Unknown Album"}
                    {item.track?.album?.album_type === "single" && (
                      <span>
                        {" - "}
                        {item.track?.album.album_type.charAt(0).toUpperCase() +
                          item.track?.album.album_type.slice(1)}
                      </span>
                    )}
                  </Link>
                </td>
                <td className="text-silver-400 text-center py-4">
                  <div className="flex gap-1.5 items-center">
                    {Math.floor((item.track?.duration_ms || 0) / 60000)}:
                    {(
                      "0" +
                      Math.floor(
                        ((item.track?.duration_ms || 0) % 60000) / 1000
                      )
                    ).slice(-2)}
                    <AddToPlaylistModal uri={item.track?.uri} />
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          <SongCount>
            {playlist.tracks.total} songs, {totalTimeString}
          </SongCount>
        </Playlist>
      )}
    </>
  );
};

export default PlaylistItem;
