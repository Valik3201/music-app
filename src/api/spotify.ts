import axios from "axios";

export const fetchNewReleases = async (token: string) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching new releases:", error);
    return null;
  }
};
