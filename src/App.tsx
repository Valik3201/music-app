import React from "react";
import Auth from "./components/Auth/Auth";
import SavedAlbums from "./components/SavedAlbums/SavedAlbums";
import SearchForm from "./components/SerachForm/SearchForm";

const App: React.FC = () => {
  return (
    <Auth>
      <SearchForm />
      <SavedAlbums />
    </Auth>
  );
};

export default App;
