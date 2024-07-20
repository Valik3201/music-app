export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
export const redirectUri = import.meta.env.VITE_REDIRECT_URI;
export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";
export const scope =
  "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
