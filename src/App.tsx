import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import SavedAlbums from "./components/SavedAlbums/SavedAlbums";
import SearchForm from "./components/SerachForm/SearchForm";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Playlists from "./components/Playlists/Playlists";
import PlaylistItem from "./components/PlaylistItem/PlaylistItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
    // loader: function,
    children: [
      {
        index: true,
        element: <SavedAlbums />,
      },
      {
        path: "/search",
        element: <SearchForm />,
      },
      {
        path: "/all-playlists",
        element: <Playlists />,
      },
      {
        path: "playlist/:playlistID",
        element: <PlaylistItem />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
