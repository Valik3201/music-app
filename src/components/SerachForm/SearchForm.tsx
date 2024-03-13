import { useState } from "react";
import { useToken } from "../../hooks/useToken";
import { searchSpotify } from "../../api/spotify";
import { SearchResult, Artist, Album, Track, Playlist, Image } from "./types";

const SearchForm: React.FC = () => {
  const { accessToken } = useToken();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artists: [],
    albums: [],
    tracks: [],
    playlists: [],
  });
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!accessToken) {
        return;
      }

      const data = await searchSpotify(accessToken, searchQuery);

      setSearchResults({
        artists: data.artists.items,
        albums: data.albums.items,
        tracks: data.tracks.items,
        playlists: data.playlists.items,
      });
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Search</h2>

      <form onSubmit={handleSearch} className="max-w-3xl">
        <label htmlFor="search" className="mb-2 text-sm font-medium sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search query"
            className="block w-full p-4 ps-10 pe-24 text-sm border border-grey rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-green"
          />
          <button
            type="submit"
            className="text-black absolute end-2.5 bottom-2.5 bg-green hover:opacity-80 font-medium rounded-full text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}

      {!error && (
        <div>
          {searchResults.albums.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Albums</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {searchResults.albums.slice(0, 10).map((result: Album) => (
                  <li key={result.id}>
                    {result.images.map(
                      (image: Image, index) =>
                        image.height === 640 && (
                          <img
                            key={index}
                            src={image.url}
                            alt={result.name}
                            className="h-auto max-w-full rounded-lg"
                          />
                        )
                    )}

                    <p className="font-bold">{result.name}</p>
                    <p className="text-grey">
                      <span>{result.release_date.split("-")[0]} • </span>
                      {result.artists.map((item) => item.name).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.artists.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Artists</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.artists.slice(0, 10).map((result: Artist) => (
                  <li key={result.id} className="flex gap-4 items-center">
                    {result.images.map(
                      (image: Image, index) =>
                        image.height === 640 && (
                          <img
                            key={index}
                            src={image.url}
                            alt={result.name}
                            className="w-16 h-16 rounded-full"
                          />
                        )
                    )}
                    <p className="text-2xl font-bold">{result.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.tracks.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Tracks</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.tracks.map((result: Track) => (
                  <li key={result.id} className="p-2 bg-grey/5 rounded-xl">
                    <div className="flex gap-4">
                      {result.album.images.map((image: Image, index) =>
                        image.height === 640 ? (
                          <img
                            key={index}
                            src={image.url}
                            alt={result.name}
                            className="h-12 w-12 rounded-md"
                          />
                        ) : null
                      )}

                      <div className="flex w-full justify-between items-center">
                        <div>
                          <p className="font-medium">{result.name}</p>
                          <p className="text-xs">
                            {result.album.artists
                              .map((item) => item.name)
                              .join(", ")}
                          </p>
                        </div>

                        <div className="pr-2">
                          {Math.floor(result.duration_ms / 60000)}:
                          {(
                            "0" +
                            Math.floor((result.duration_ms % 60000) / 1000)
                          ).slice(-2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.playlists.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Playlists</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {searchResults.playlists
                  .filter((result: Playlist) =>
                    result.images.some((image: Image) => image.height === 640)
                  )
                  .map((result: Playlist) => (
                    <li key={result.id}>
                      {result.images.map((image: Image, index) =>
                        image.height === 640 ? (
                          <img
                            key={index}
                            src={image.url}
                            alt={result.name}
                            className="h-auto max-w-full rounded-lg"
                          />
                        ) : null
                      )}
                      <p className="font-bold">{result.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
