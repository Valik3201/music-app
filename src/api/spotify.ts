import axios from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export const searchSpotify = async (
  accessToken: string,
  searchQuery: string
) => {
  try {
    const response = await axios.get("/search", {
      params: {
        q: searchQuery,
        type: "album,artist,playlist,track",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching:", error);
    throw new Error("An error occurred while searching. Please try again.");
  }
};

export const getPlaylist = async (accessToken: string, playlist_id: string) => {
  try {
    const response = await axios.get(`/playlists/${playlist_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetch playlist data:", error);
  }
};

export const getAlbum = async (accessToken: string, album_id: string) => {
  try {
    const response = await axios.get(`/albums/${album_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetch album data:", error);
  }
};

export const createPlaylist = async (
  accessToken: string,
  user_id: string,
  playlistData: { name: string; description: string; public: boolean }
) => {
  try {
    const response = await axios.post(
      `/users/${user_id}/playlists`,
      playlistData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
  }
};

export const addItemsToPlaylist = async (
  accessToken: string,
  playlist_id: string,
  itemsData: { uris: string[]; position?: string }
) => {
  try {
    const response = await axios.post(
      `/playlists/${playlist_id}/tracks`,
      itemsData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding items to playlist:", error);
  }
};
