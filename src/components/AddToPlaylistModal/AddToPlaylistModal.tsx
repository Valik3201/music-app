import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

import { addItemsToPlaylist } from "../../api/spotify";

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
      <button onClick={toggleModal}>Add</button>

      {isOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-shark rounded-lg shadow">
              <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t">
                <h2 className="text-white text-3xl font-black pb-4">
                  Add to playlist
                </h2>

                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-white p-2 rounded-lg hover:bg-black/50"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <ul>
                  {userPlaylists &&
                    user &&
                    userPlaylists.map((item) =>
                      item.owner.display_name === user.display_name ? (
                        <li key={item.id}>
                          <button onClick={() => handlePlaylistSelect(item.id)}>
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
