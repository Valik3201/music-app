import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

import { addItemsToPlaylist } from "../../api/spotify";
import { ListMusicOutline, PlusIcon } from "../ui/icons/flowbite";

const AddToPlaylistModal: React.FC<{ uri: string }> = ({ uri }) => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const userPlaylists = useAppSelector((state) => state.data.playlists);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePlaylistSelect = async (playlistId: string) => {
    if (currentToken && currentToken.access_token) {
      await addItemsToPlaylist(currentToken.access_token, playlistId, {
        uris: [uri],
      });

      toggleModal();
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="p-1 rounded-lg odd:hover:bg-silver-900/20 transition duration-200 ease-in-out"
      >
        <PlusIcon />
      </button>

      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-shark rounded-lg shadow">
              <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t">
                <h2 className="text-white text-xl md:text-3xl font-black">
                  Add to playlist
                </h2>

                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-white p-1 rounded-lg hover:bg-black/50 transition duration-200 ease-in-out"
                  data-modal-hide="default-modal"
                >
                  <div className="rotate-45">
                    <PlusIcon />
                  </div>

                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-96">
                <ul>
                  {userPlaylists &&
                    user &&
                    userPlaylists.map((item) =>
                      item.owner.display_name === user.display_name ? (
                        <li key={item.id}>
                          <button
                            onClick={() => handlePlaylistSelect(item.id)}
                            className="flex items-center gap-2 p-2 w-full text-base rounded-lg hover:bg-black/40 transition duration-200 ease-in-out"
                          >
                            <ListMusicOutline />
                            {item.name}
                          </button>
                        </li>
                      ) : null
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToPlaylistModal;
