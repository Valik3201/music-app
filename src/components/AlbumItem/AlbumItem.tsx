import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../../api/spotify";
import { useAppSelector } from "../../redux/hooks";
import * as Types from "./types";
import PlaylistComponents from "../ui/PlaylistComponents/PlaylistComponents";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";
import PlaylistSkeleton from "../ui/PlaylistSkeleton/PlaylistSkeleton";

const {
  Playlist,
  PlaylistHeader,
  PlaylistInfo,
  Type,
  Title,
  Artist,

  Table,
  SongCount,
} = PlaylistComponents;

const AlbumItem = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const { albumID } = useParams<{ albumID: string }>();
  const [album, setAlbum] = useState<Types.AlbumResponse | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      setAlbum(null);

      try {
        if (!albumID) {
          throw new Error("Album ID is not provided");
        }

        if (currentToken && currentToken.access_token) {
          const albumData = await getAlbum(currentToken.access_token, albumID);
          setAlbum(albumData);
        }
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
    };

    fetchAlbum();
  }, [albumID]);

  const totalDuration = useMemo(() => {
    if (!album) return 0;

    return album.tracks.items.reduce((total, item) => {
      return total + item.duration_ms;
    }, 0);
  }, [album]);

  const totalDurationInMinutes = Math.floor(totalDuration / 60000);

  const hours = Math.floor(totalDurationInMinutes / 60);
  const minutes = totalDurationInMinutes % 60;

  let totalTimeString = "";

  if (hours > 0) {
    totalTimeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  totalTimeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (!album) {
    return <PlaylistSkeleton />;
  }

  return (
    <>
      {album && (
        <Playlist>
          <PlaylistHeader>
            {album.images && album.images[0]?.url ? (
              <div className="bg-shark w-64 h-64 rounded-lg mb-2 mr-4">
                <img
                  src={album.images[0].url}
                  alt={album.name}
                  className="object-cover aspect-square rounded-lg"
                />
              </div>
            ) : (
              <PlaylistCover />
            )}
            <PlaylistInfo>
              <Type>{album.type}</Type>
              <Title>
                {album.name}
                {album.album_type === "single" && (
                  <span>
                    {" - "}
                    {album.album_type.charAt(0).toUpperCase() +
                      album.album_type.slice(1)}
                  </span>
                )}
              </Title>
              <Artist>
                <span className="font-black text-silver-400">
                  {album.release_date.split("-")[0]}
                  {" • "}
                </span>
                {album.artists.map((artist, index) => [
                  <a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {artist.name}
                  </a>,
                  index !== album.artists.length - 1 && ", ",
                ])}
              </Artist>
            </PlaylistInfo>
          </PlaylistHeader>

          <Table>
            {album.tracks.items.map((item, index) => (
              <tr key={item.id} className="odd:bg-shark/50 even:bg-black">
                <td className="py-4 ps-4">
                  <div className="flex gap-2 items-center">
                    <p>{index + 1}</p>
                    <p className="font-bold truncate">{item.name}</p>

                    {item.explicit && (
                      <div className="min-w-4 h-4 bg-silver-900/50 font-bold rounded-md text-xs text-center mr-2">
                        E
                      </div>
                    )}
                  </div>
                </td>
                <td className="hidden lg:table-cell text-silver-400 truncate py-2">
                  {item.artists.map((artist, index) => [
                    <a
                      key={artist.id}
                      href={artist.external_urls.spotify}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artist.name}
                    </a>,
                    index !== item.artists.length - 1 && ", ",
                  ])}
                </td>
                <td className="hidden lg:table-cell text-silver-400 truncate py-2">
                  <a
                    href={item.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {album.name}
                    {album.album_type === "single" && (
                      <span>
                        {" "}
                        -{" "}
                        {album.album_type.charAt(0).toUpperCase() +
                          album.album_type.slice(1)}
                      </span>
                    )}
                  </a>
                </td>
                <td className="text-silver-400 py-2">
                  <div className="flex gap-1.5 items-center">
                    {Math.floor(item.duration_ms / 60000)}:
                    {(
                      "0" + Math.floor((item.duration_ms % 60000) / 1000)
                    ).slice(-2)}
                    <AddToPlaylistModal uri={item.uri} />
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          <SongCount>
            <div className="text-xs font-bold text-silver-700">
              {formatDate(album.release_date)}
            </div>
            {album.tracks.total} songs, {totalTimeString}
            <div className="text-xs font-bold text-silver-700">
              {album.copyrights.map((item) =>
                item.type === "C" ? item.text : null
              )}
            </div>
          </SongCount>
        </Playlist>
      )}
    </>
  );
};

export default AlbumItem;
