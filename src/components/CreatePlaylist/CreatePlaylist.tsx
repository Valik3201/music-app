import { useState } from "react";
import { createPlaylist } from "../../api/spotify";
import { useAppSelector } from "../../redux/hooks";

interface PlaylistData {
  name: string;
  description: string;
  public: boolean;
}

const CreatePlaylist: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const [playlistData, setPlaylistData] = useState<PlaylistData>({
    name: "",
    description: "",
    public: false,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPlaylistData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPlaylistData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCreatePlaylist = async () => {
    if (currentToken && user && user.id) {
      const response = await createPlaylist(
        currentToken.access_token,
        user.id,
        playlistData
      );
      console.log("Playlist created:", response);
    }
  };

  return (
    <div>
      <h2>Create Playlist</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={playlistData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={playlistData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Public:
          <input
            type="checkbox"
            name="public"
            checked={playlistData.public}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreatePlaylist}>
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
