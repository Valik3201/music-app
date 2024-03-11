import axios from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export const fetchNewReleases = async (token: string) => {
  try {
    const response = await axios.get("/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching new releases:", error);
    return null;
  }
};

export const searchItems = async (
  token: string,
  query: string,
  types: string[],
  market: string = "US",
  limit: number = 20
) => {
  try {
    const response = await axios.get("/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: types.join(","),
        market: market,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching items:", error);
    return null;
  }
};

export const getUserSavedAlbums = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("User saved albums:", response.data);
    return response.data;
    // Здесь вы можете обработать данные о сохраненных альбомах пользователя
  } catch (error) {
    console.error("Error fetching user saved albums:", error);
  }
};
