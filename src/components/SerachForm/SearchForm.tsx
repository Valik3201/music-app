import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { searchSpotify } from "../../api/spotify";
import { SearchResult, Artist, Album, Track, Playlist } from "./types";
import { Form } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Carousel, CarouselItem } from "./Carousel";

const SearchForm: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult>({
    artists: { total: 0, items: [] },
    albums: { total: 0, items: [] },
    tracks: { total: 0, items: [] },
    playlists: { total: 0, items: [] },
  });

  const [error, setError] = useState<string | null>(null);

  const performSearch = async (query: string) => {
    try {
      if (!currentToken) {
        return;
      }

      const data = await searchSpotify(currentToken.access_token, query);

      setSearchResults({
        artists: {
          total: data.artists.total,
          items: data.artists.items,
        },
        albums: {
          total: data.albums.total,
          items: data.albums.items,
        },
        tracks: {
          total: data.tracks.total,
          items: data.tracks.items,
        },
        playlists: {
          total: data.playlists.total,
          items: data.playlists.items,
        },
      });

      if (
        data.albums.total === 0 &&
        data.tracks.total === 0 &&
        data.artists.total === 0 &&
        data.playlists.total === 0
      ) {
        setError("Nothing found matching your request. Please try again.");
      } else {
        setError(null);
      }
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
            <span className="font-medium">Oophs! </span>
            {error}
          </div>
        </div>
      )}

      {!error && (
        <div>
          {searchResults.albums.total > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Albums</h2>

              <Carousel>
                {searchResults.albums.items.map((result: Album) => (
                  <CarouselItem key={result.id}>
                    <a
                      href={result.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.images && result.images[0] && (
                        <img
                          src={result.images[0]?.url}
                          alt={result.name}
                          className="object-cover rounded-lg hover:opacity-70 transition duration-200 ease-in-out mb-2"
                        />
                      )}

                      <p className="font-bold ">{result.name}</p>
                      <p className="text-silver-400 ">
                        <span>{result.release_date.split("-")[0]} • </span>
                        {result.artists.map((item) => item.name).join(", ")}
                      </p>
                    </a>
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          )}

          {searchResults.artists.total > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Artists</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4">
                {searchResults.artists.items
                  .slice(0, 10)
                  .map((result: Artist) => (
                    <li key={result.id}>
                      <a
                        href={result.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 items-center"
                      >
                        <div className="bg-green w-16 h-16 rounded-full">
                          {result.images && result.images[0] && (
                            <img
                              src={result.images[0]?.url}
                              alt={result.name}
                              className="object-cover w-16 h-16 rounded-full"
                            />
                          )}
                        </div>

                        <p className="text-2xl font-extrabold">{result.name}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {searchResults.tracks.total > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Tracks</h2>
              <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-2 pb-4">
                {searchResults.tracks.items.map((result: Track) => (
                  <li
                    key={result.id}
                    className="p-2 bg-shark/75 rounded-xl hover:bg-shark transition duration-200 ease-in-out"
                  >
                    <a
                      href={result.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex gap-4">
                        {result.album.images && result.album.images[0] && (
                          <img
                            src={result.album.images[0]?.url}
                            alt={result.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
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
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchResults.playlists.total > 0 && (
            <div>
              <h2 className="text-3xl font-black pb-4">Playlists</h2>
              <Carousel>
                {searchResults.playlists.items.map((result: Playlist) => (
                  <CarouselItem key={result.id}>
                    <a
                      href={result.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-shark aspect-square rounded-lg mb-2 hover:opacity-70 transition duration-200 ease-in-out">
                        {result.images[0]?.url ? (
                          <img
                            src={result.images[0].url}
                            alt={result.name}
                            className="object-cover aspect-square rounded-lg"
                          />
                        ) : (
                          <div className="flex justify-center items-center h-full">
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              className="w-20 h-20 fill-silver-900"
                            >
                              <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      <p className="font-bold">{result.name}</p>
                      <p className="text-silver-400">
                        {result.owner.display_name}
                      </p>
                    </a>
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
