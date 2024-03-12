import { useState } from "react";
import { useToken } from "../../hooks/useToken";
import { searchSpotify } from "../../api/spotify";
import { SearchResult, Artist, Album, Track, Playlist } from "./types";

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
      <h2>Search for Item</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div>
        {searchResults.artists.length > 0 && (
          <div>
            <h2>Artists</h2>
            <ul>
              {searchResults.artists.map((result: Artist) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          </div>
        )}

        {searchResults.albums.length > 0 && (
          <div>
            <h2>Albums</h2>
            <ul>
              {searchResults.albums.map((result: Album) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          </div>
        )}

        {searchResults.tracks.length > 0 && (
          <div>
            <h2>Tracks</h2>
            <ul>
              {searchResults.tracks.map((result: Track) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          </div>
        )}

        {searchResults.playlists.length > 0 && (
          <div>
            <h2>Playlists</h2>
            <ul>
              {searchResults.playlists.map((result: Playlist) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
