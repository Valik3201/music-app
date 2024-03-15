import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import SavedAlbums from "./components/SavedAlbums/SavedAlbums";
import SearchForm from "./components/SerachForm/SearchForm";
import ErrorPage from "./components/ErrorPage/ErrorPage";

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
