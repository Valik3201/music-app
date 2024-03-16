import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { searchSpotify } from "../../api/spotify";
import { SearchResult, Artist, Album, Track, Playlist, Image } from "./types";
import { Form } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SearchForm: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artists: [],
    albums: [],
    tracks: [],
    playlists: [],
  });
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (query: string) => {
    try {
      if (!currentToken) {
        return;
      }

      const data = await searchSpotify(currentToken.access_token, query);

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

  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ q: searchQuery });
    performSearch(searchQuery);
  };

  return (
    <div>
      <h2 className="text-3xl font-black pb-4">Search</h2>

      <Form onSubmit={handleSearch} className="max-w-3xl pb-4" role="search">
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
            className="block w-full p-4 ps-6 pe-24 text-sm border border-silver-400 rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-green focus:border-green search-cancel:appearance-none"
          />
          <button
            type="submit"
            className="text-black absolute end-2.5 bottom-2.5 bg-green hover:opacity-80 font-medium rounded-full text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </Form>

      {error && (
        <div
          className="flex items-center p-4 mb-4 text-sm rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Error</span>
          <div>
            <span className="font-medium">Oophs!</span> {error}
          </div>
        </div>
      )}

      {!error && (
        <div>
          {searchResults.albums.length > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Albums</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-4">
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
                    <p className="text-silver-400">
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
              <h2 className="text-3xl font-black pb-4">Artists</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                {searchResults.artists.slice(0, 10).map((result: Artist) => (
                  <li key={result.id} className="flex gap-4 items-center">
                    <div className="bg-green w-16 h-16 rounded-full">
                      {result.images && result.images[0] && (
                        <img
                          src={result.images[0]?.url}
                          alt={result.name}
                          className="object-cover w-16 h-16 rounded-full"
                        />
                      )}
                    </div>

                    <p className="text-2xl font-bold">{result.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.tracks.length > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Tracks</h2>
              <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
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
                          <p className="font-medium truncate w-80 md:w-52">
                            {result.name}
                          </p>
                          <p className="text-xs text-silver-400 truncate w-96 md:w-60">
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
              <h2 className="text-3xl font-black pb-4">Playlists</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-4">
                {searchResults.playlists.map((result: Playlist) => (
                  <li key={result.id}>
                    <div className="bg-silver-400 aspect-square rounded-lg">
                      <img
                        src={result.images[0].url}
                        alt={result.name}
                        className="object-cover aspect-square rounded-lg"
                      />
                    </div>

                    <p className="font-bold">{result.name}</p>
                    <p className="text-silver-400">
                      {result.owner.display_name}
                    </p>
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
