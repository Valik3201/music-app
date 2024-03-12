export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// export const redirectUri = "http://localhost:5173";
export const redirectUri = "https://music-app-ts.netlify.app";
export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";
export const scope = "user-read-private user-read-email user-library-read";
