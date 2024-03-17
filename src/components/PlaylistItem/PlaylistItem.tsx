import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../api/spotify";
import { useAppSelector } from "../../redux/hooks";
import * as Types from "./types";

const PlaylistItem = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const { playlistID } = useParams<{ playlistID: string }>();
  const [playlist, setPlaylist] = useState<Types.Playlist | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
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
  }, [playlistID]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {playlist && (
        <div className="mt-4">
          <div className="flex gap-4">
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-64 h-64 rounded-lg mb-2 mr-4 shadow-2xl shadow-white/15"
            />

            <div className="flex flex-col gap-4">
              <p className="font-extrabold text-md text-silver-400 uppercase">
                {playlist.type}
              </p>
              <div>
                <h2 className="text-4xl font-black">{playlist.name}</h2>

                <a
                  href={playlist.owner.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green font-medium text-2xl"
                >
                  {playlist.owner.display_name}
                </a>
              </div>

              <p className="text-silver-400 w-3/5">{playlist.description}</p>
            </div>
          </div>

          <table className="table-fixed w-full text-sm mt-4">
            <thead>
              <tr className="text-left">
                <th className="w-4/12 py-2">Song</th>
                <th className="w-3/12 py-2">Artist</th>
                <th className="w-3/12 py-2">Album</th>
                <th className="w-1/12 py-2 text-center ">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver-900">
              {playlist.tracks.items.map((item) => (
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
                    {item.track.artists.map((artist, index) => [
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
            </tbody>
          </table>

          <p className="font-bold text-silver-400 text-sm py-4">
            {playlist.tracks.total} songs
          </p>
        </div>
      )}
    </>
  );
};

export default PlaylistItem;
