import React, { useState, useEffect } from "react";
import { useToken } from "../hooks/useToken";
import { getUserSavedAlbums } from "../api/spotify";

const SavedAlbums: React.FC = () => {
  const { accessToken } = useToken();
  const [savedAlbums, setSavedAlbums] = useState<any[]>([]);

  useEffect(() => {
    const fetchSavedAlbums = async () => {
      if (!accessToken) {
        return;
      }

      try {
        const albums = await getUserSavedAlbums(accessToken);
        setSavedAlbums(albums.items);
      } catch (error) {
        console.error("Error fetching saved albums:", error);
      }
    };

    if (accessToken) {
      fetchSavedAlbums();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>Saved Albums</h2>
      <ul>
        {savedAlbums.map((album: any, index) => (
          <li key={index}>
            <img src={album.album.images[0].url} alt={album.album.name} />
            <p>{album.album.name}</p>
            <p>
              {album.album.artists.map((artist: any) => artist.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedAlbums;
