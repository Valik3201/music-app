import { useState, useEffect } from "react";
import { redirectToSpotifyAuthorize } from "../../utils/spotifyAuth";
import { getSpotifyAlbumCovers } from "./images";
import Alpine, { Alpine as AlpineType } from "alpinejs";

declare global {
  var Alpine: AlpineType;
}

window.Alpine = Alpine;

Alpine.start();

const HeroSection: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getSpotifyAlbumCovers()
      .then((covers) => {
        setImages(covers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>

      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            React + TypeScript + Vite App
            <br />
            with Spotify Web API
          </h1>
          <p className="mb-8 text-lg text-silver-400 font-normal lg:text-xl sm:px-16 xl:px-48">
            This application integrates with{" "}
            <a
              href="https://developer.spotify.com/documentation/web-api"
              className="font-medium text-green hover:underline"
              target="blank"
            >
              Spotify Web API
            </a>{" "}
            using <strong>OAuth2.0</strong> with <strong>PKCE</strong> for
            secure authentication. Redux efficiently manages token and
            application state. Users can explore music and create playlists from
            Spotify within an intuitive interface.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center">
            <button
              onClick={redirectToSpotifyAuthorize}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
            >
              Login with Spotify
            </button>
          </div>
        </div>

        <div
          x-data="{}"
          x-init="$nextTick(() => {
        let ul = $refs.covers;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
        >
          <ul
            x-ref="covers"
            className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
          >
            {images.map((item, index) => (
              <li key={index}>
                <img
                  src={item}
                  alt="album-cover"
                  className="rounded-lg max-h-40"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
