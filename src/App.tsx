import { useEffect, useState } from "react";
import { fetchNewReleases } from "./api/spotify";
import { getAccessToken } from "./utils/spotifyAuth";

const App: React.FC = () => {
  const [newReleases, setNewReleases] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken) {
          const releases = await fetchNewReleases(accessToken);

          if (releases) {
            setNewReleases(releases.albums.items);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>New Releases</h1>
      <ul>
        {newReleases.map((release) => (
          <li key={release.id}>{release.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
