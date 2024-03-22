import { useState } from "react";
import { createPlaylist } from "../../api/spotify";
import { useAppSelector } from "../../redux/hooks";
import { CheckIcon } from "../ui/icons/flowbite";
import PlaylistCover from "../ui/PlaylistCover/PlaylistCover";

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
      setPlaylistData({ name: "", description: "", public: false });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black pb-4">New Playlist</h2>

      <form>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="bg-shark flex-shrink-0 rounded-lg mb-2 mr-4">
            <PlaylistCover size={"w-72 h-72"} />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                value={playlistData.name}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-4xl font-extrabold text-white bg-green/0 border-0 border-b-2 border-green appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-4xl font-extrabold text-white  duration-300 transform -translate-y-8 scale-50 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-8"
              >
                Playlist Title
              </label>
            </div>

            <label className="block text-2xl font-extrabold text-silver-400 sr-only">
              Description
            </label>
            <textarea
              name="description"
              value={playlistData.description}
              onChange={handleInputChange}
              rows={4}
              className="block p-2.5 w-full text-sm text-silver-400 bg-shark rounded-lg border border-silver-900 focus:green focus:border-green focus:ring-green focus:ring-2 resize-none"
              placeholder="Description"
            ></textarea>

            <label className="relative flex gap-2 items-center">
              <input
                type="checkbox"
                name="public"
                checked={playlistData.public}
                onChange={handleCheckboxChange}
                className="peer appearance-none forced-colors:appearance-auto w-5 h-5 text-green bg-shark border-silver-900 rounded focus:ring-green focus:ring-2"
              />
              <CheckIcon />
              Public
            </label>

            <button
              type="button"
              onClick={handleCreatePlaylist}
              className="text-black bg-green sm:w-fit hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
            >
              Create Playlist
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;
