import React, { useEffect, useState } from "react";
import {
  fetchNewReleases,
  searchItems,
  getUserSavedAlbums,
} from "./api/spotify";
import { getAccessToken, loginURL, getTokenFromUrl } from "./utils/spotifyAuth";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const App: React.FC = () => {
  const [_newReleases, setNewReleases] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>({
    artists: [],
    albums: [],
    tracks: [],
    playlists: [],
  });
  const [_spotifyToken, setSpotifyToken] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>("");

  useEffect(() => {
    // This is for the Spotify token
    const _spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (_spotifyToken) {
      setSpotifyToken(_spotifyToken);

      console.debug(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
      spotify.getMe().then((user) => {
        setUser(user);
        console.log("DIS YOU:", user);
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken && _spotifyToken) {
          const data = await getUserSavedAlbums(_spotifyToken);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [_spotifyToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken) {
          const releases = await fetchNewReleases(accessToken);

          if (releases) {
            setNewReleases(releases.albums.items);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const accessToken = await getAccessToken();

      if (accessToken && searchQuery) {
        const results = await searchItems(accessToken, searchQuery, [
          "album",
          "artist",
          "track",
          "playlist",
        ]);

        if (results) {
          setSearchResults({
            artists: results.artists.items,
            albums: results.albums.items,
            tracks: results.tracks.items,
            playlists: results.playlists.items,
          });
        }
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleLogout = () => {
    setSpotifyToken("");
    spotify.setAccessToken("");
    setUser(null);
  };

  return (
    <div>
      {!user && <a href={loginURL}>Sign in with Spotify!</a>}

      {user && <button onClick={handleLogout}>Logout</button>}

      {user && <h2>Welcome, {user?.display_name}!</h2>}

      <ul>
        {user &&
          userData &&
          userData.items &&
          userData.items.map((item: any, index: number) => {
            return <li key={index}>{item.album.name}</li>;
          })}
      </ul>

      {/* <h1>New Releases</h1>
      <ul>
        {newReleases.map((release) => (
          <li key={release.id}>{release.name}</li>
        ))}
      </ul> */}

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.artists.length > 0 && (
        <div>
          <h2>Artists</h2>
          <ul>
            {searchResults.artists.map((result: any) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.albums.length > 0 && (
        <div>
          <h2>Albums</h2>
          <ul>
            {searchResults.albums.map((result: any) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.tracks.length > 0 && (
        <div>
          <h2>Tracks</h2>
          <ul>
            {searchResults.tracks.map((result: any) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}

      {searchResults.playlists.length > 0 && (
        <div>
          <h2>Playlists</h2>
          <ul>
            {searchResults.playlists.map((result: any) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
