import React, { useState, useEffect } from "react";
import { useToken } from "../../hooks/useToken";
import { getUserSavedAlbums } from "../../api/spotify";
import { Album } from "./types";

const SavedAlbums: React.FC = () => {
  const { accessToken } = useToken();
  const [savedAlbums, setSavedAlbums] = useState<Album[]>([]);

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
      <h2 className="text-3xl font-bold">Saved Albums</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {savedAlbums.map((album: any, index) => (
          <li key={index}>
            <img
              src={album.album.images[0].url}
              alt={album.album.name}
              className="h-auto max-w-full rounded-lg"
            />
            <p className="font-bold">{album.album.name}</p>
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
