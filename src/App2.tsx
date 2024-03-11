import { useState, useEffect } from "react";

// Constants for Spotify API
const clientId = "780f802a101a4469932f0ce682c4cc73";
const redirectUrl = "https://music-app-ts.netlify.app";
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email";

// Interface for token object
interface Token {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: string | null;
  expires: string | null;
}

// Main component
const App: React.FC = () => {
  // State to manage tokens
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh_token") || null
  );
  const [_expiresIn, setExpiresIn] = useState<number | null>(
    localStorage.getItem("expires_in")
      ? parseInt(localStorage.getItem("expires_in")!)
      : null
  );
  const [_expires, setExpires] = useState<Date | null>(
    localStorage.getItem("expires")
      ? new Date(localStorage.getItem("expires")!)
      : null
  );
  const [user, setUser] = useState<any>(null);

  // Effect hook to run on initial render
  useEffect(() => {
    // Parsing URL params to get code
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");

    // Function to fetch data
    const fetchData = async () => {
      // If code is present, request token
      if (code) {
        const token = await getToken(code);

        console.debug("getToken", code);

        saveToken(token);

        console.debug("saveToken", token);

        // Remove code from URL after token exchange
        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch user data if access token is present
      if (accessToken) {
        const userData = await getUserData();
        setUser(userData);
        console.log("User Data:", userData);
      } else {
        console.log("User not logged in");
      }
    };

    fetchUser();
  }, [accessToken]);

  // Function to redirect to Spotify authorization page
  const redirectToSpotifyAuthorize = async () => {
    // Generate code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);

    // Construct authorization URL
    const authUrl = new URL(authorizationEndpoint);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    // Redirect to Spotify authorization page
    window.location.href = authUrl.toString();
  };

  // Function to request token
  const getToken = async (code: string | null) => {
    if (code) {
      const codeVerifier = localStorage.getItem("code_verifier");

      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUrl,
          code_verifier: codeVerifier!,
        }),
      });

      return await response.json();
    }
  };

  // Function to refresh token
  const getRefreshToken = async () => {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "refresh_token",
        refresh_token: refreshToken!,
      }),
    });

    return await response.json();
  };

  // Function to get user data
  const getUserData = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });

    return await response.json();
  };

  // Function to save token in local storage and state
  const saveToken = (response: Token) => {
    const { access_token, refresh_token, expires_in } = response;

    localStorage.setItem("access_token", access_token!);
    localStorage.setItem("refresh_token", refresh_token!);
    localStorage.setItem("refresh_in", expires_in!);

    const now = new Date();
    const expiry = new Date(now.getTime() + parseInt(expires_in!) * 1000);
    localStorage.setItem("expires", expiry.toString());

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setExpiresIn(expires_in ? parseInt(expires_in) : null);
    setExpires(expiry);
  };

  // Function to generate code verifier
  const generateCodeVerifier = () => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    return Array.from(randomValues)
      .map((value) => possible[value % possible.length])
      .join("");
  };

  // Function to generate code challenge
  const generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashed = await crypto.subtle.digest("SHA-256", data);
    return base64urlencode(hashed);
  };

  // Function to encode array buffer to base64 URL
  const base64urlencode = (arrayBuffer: ArrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    let str = "";
    bytes.forEach((byte) => {
      str += String.fromCharCode(byte);
    });
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  // Click handler for login with Spotify button
  const loginWithSpotifyClick = async () => {
    await redirectToSpotifyAuthorize();
  };

  // Click handler for logout button
  const logoutClick = () => {
    localStorage.clear();
    window.location.href = redirectUrl;
    setUser(null);
  };

  // Click handler for refresh token button
  const refreshTokenClick = async () => {
    const token = await getRefreshToken();
    saveToken(token);
  };

  // Rendering JSX
  return (
    <div>
      {accessToken && accessToken !== undefined ? (
        <div>
          <button onClick={refreshTokenClick}>Refresh Token</button>
          <button onClick={logoutClick}>Logout</button>

          {user && <h1>Hello, {user.display_name}</h1>}
        </div>
      ) : (
        <div>
          <button onClick={loginWithSpotifyClick}>Login with Spotify</button>
        </div>
      )}
    </div>
  );
};

export default App;
