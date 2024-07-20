import axios from "axios";
import { clientId, clientSecret } from "../../constants/constants";

async function getSpotifyToken(): Promise<string> {
  const url = "https://accounts.spotify.com/api/token";
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const response = await axios.post(url, "grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch token: ${response.statusText}`);
  }

  return response.data.access_token;
}

export async function getSpotifyAlbumCovers(): Promise<string[]> {
  const token = await getSpotifyToken();
  const url = "https://api.spotify.com/v1/browse/new-releases?limit=25";

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const images = response.data.albums.items.map(
    (item: any) => item.images[0].url
  );

  return images;
}
