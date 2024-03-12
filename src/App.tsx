import React from "react";
import Auth from "./components/Auth";
import SavedAlbums from "./components/SavedAlbums";

const App: React.FC = () => {
  return (
    <Auth>
      <SavedAlbums />
    </Auth>
  );
};

export default App;
