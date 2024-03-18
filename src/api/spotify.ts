import axios from "axios";

export const searchSpotify = async (
  accessToken: string,
  searchQuery: string
) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: searchQuery,
        type: "album,artist,playlist,track",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.debug(response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching:", error);
    throw new Error("An error occurred while searching. Please try again.");
  }
};

export const getPlaylist = async (accessToken: string, playlist_id: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetch playlist data:", error);
  }
};
