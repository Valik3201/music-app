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
            className="block w-full p-4 ps-10 pe-24 text-sm border border-grey rounded-full bg-black"
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
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {searchResults.albums.map((result: Album) => (
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
              <ul>
                {searchResults.artists.map((result: Artist) => (
                  <li key={result.id}>{result.name}</li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.tracks.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Tracks</h2>
              <ul>
                {searchResults.tracks.map((result: Track) => (
                  <li key={result.id}>{result.name}</li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.playlists.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold">Playlists</h2>
              <ul>
                {searchResults.playlists.map((result: Playlist) => (
                  <li key={result.id}>{result.name}</li>
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
