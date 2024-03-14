import { redirectToSpotifyAuthorize } from "../../utils/spotifyAuth";

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-green to-transparent to-40% w-full h-96 absolute top-0 left-0 z-0"></div>

      <section className="z-10 relative h-screen flex justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            React + TypeScript + Vite App
            <br />
            with Spotify API Integration
          </h1>
          <p className="mb-8 text-lg text-grey font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
            This application integrates with{" "}
            <a
              href="https://developer.spotify.com/documentation/web-api"
              className="font-medium text-green hover:underline"
              target="blank"
            >
              Spotify Web API
            </a>{" "}
            using OAuth2.0 with PKCE for secure authentication. Redux
            efficiently manages token and application state. Users can explore
            music and create playlists from Spotify within an intuitive
            interface.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
              onClick={redirectToSpotifyAuthorize}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
            >
              Login with Spotify
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
