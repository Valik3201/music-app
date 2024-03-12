import { useState, useEffect } from "react";
import { useToken } from "../../hooks/useToken";
import { getToken, getUserData } from "../../api/spotify";
import { redirectUri } from "../../constants/constants";
import { redirectToSpotifyAuthorize } from "../../utils/spotifyAuth";
import { AuthProps, User } from "./types";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken, saveToken, refreshAccessToken } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const userData = await getUserData(accessToken);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");
    handleTokenExchange(code);
  }, []);

  const handleTokenExchange = async (code: string | null) => {
    if (code) {
      try {
        const token = await getToken(code);
        saveToken(token);

        // Remove code from URL after token exchange
        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      } catch (error) {
        console.error("Failed to exchange token:", error);
      }
    }
  };

  const loginWithSpotifyClick = async () => {
    await redirectToSpotifyAuthorize();
  };

  const logoutClick = () => {
    localStorage.clear();
    window.location.href = redirectUri;
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshTokenClick = async () => {
    await refreshAccessToken();
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <div>
          <button onClick={refreshTokenClick}>Refresh Token</button>
          <button onClick={logoutClick}>Logout</button>
          <h1>Welcome Back, {user.display_name}</h1>
          {children}
        </div>
      ) : (
        <div>
          <button onClick={loginWithSpotifyClick}>Login with Spotify</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
