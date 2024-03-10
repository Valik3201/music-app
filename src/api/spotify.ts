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
