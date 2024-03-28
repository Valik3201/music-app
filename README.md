<h1 align="center">React + TypeScript + Vite Music App<br/>with Spotify Web API</h1>
    
<div align="center">
  <p>
    A web application using Spotify Web API for searching and creating playlists, along with other features. 
    <br />
    <a href="https://github.com/Valik3201/music-app/blob/main/README_ru.md"><strong>Documentation (Russian) »</strong></a>
    ·
    <a href="https://github.com/Valik3201/music-app"><strong>Documentation (English) »</strong></a>
    <br />
    <br />
    <a href="https://music-app-ts.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Valik3201/music-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/Valik3201/music-app/issues">Request Feature</a>
  </p>
</div>

## Description

This web application was developed as part of learning on the [Codecademy](https://www.codecademy.com) platform. Creating this project, I wanted to delve deeper into TypeScript and strengthen my skills with Redux, React Router, and Tailwind CSS, as well as deepen my understanding of React. The application allows users to search for music tracks in the Spotify library, create personalized playlists, and save them to their Spotify account.

![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)
![Axios Badge](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=flat)
![React Router Badge](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat)
![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)
![Netlify Badge](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=fff&style=flat)

[![screenshot](https://github.com/Valik3201/music-app/blob/main/assets/screenshot-1.png)](https://github.com/Valik3201/music-app/blob/main/assets/screenshot-1.png)

## Functionality

- **Authentication**: Users can sign in to their Spotify account and access their playlists.
- **Music Search**: Ability to search for tracks, albums, artists, and playlists through the [Spotify Web API](https://developer.spotify.com/documentation/web-api).
- **Playlist Creation and Management**: Users can create their own playlists and add tracks to them.
- **App Navigation**: Use of a sidebar menu to navigate between sections of the application, such as the home page, search, playlist creation, and viewing playlists, as well as a playlist with a list of favorite songs and other user playlists.
- **Display Music Information**: Users can view detailed information about tracks, albums, and playlists, as well as add them to their playlists.

### Future Features

In addition to the current functionality, the following features are planned for development:

1. **Playlist Management**:

   - Ability to change the cover and description of the playlist.
   - Ability to remove songs from the playlist.

2. **App State Update**:

   - Automatic updating of the application state immediately after any changes, such as creating a playlist, adding or removing songs from the playlist, as well as adding an album to saved albums.

3. **Player Integration for Listening**:

   - Integration of a music player into the application for listening to music directly from the interface.

4. **Adding a Section with Similar Content**:

   - Ability to view similar content based on user preferences and listening history.

5. **Improving App Optimization**:
   - Optimization of application performance and processes for smoother and faster user experience.
   - Improvement of user interface and navigation for increased usability.

These additional features will help expand the capabilities of the application and make it even more convenient and functional for users.

## Technologies

- **React**: Used for developing the user interface and managing the application state.
- **TypeScript**: For static typing to JavaScript, making the code more reliable and easier to maintain.
- **Redux Toolkit**: For efficient state management of the application, including user authentication information and their data.
- **React Router 6**: For navigation between pages and components of the application.
- **Axios**: Used for making HTTP requests to the Spotify Web API.
- **Redux Persist**: For persisting the user access token between application sessions.
- **Tailwind CSS**: For styling the user interface. Tailwind CSS allows for quickly creating custom styles using a set of predefined classes.
- **Flowbite**: Another tool for styling the user interface, which helps create aesthetic and responsive designs.
- **Netlify**: Platform for deploying and hosting the web application, using environment variables for securely storing confidential data.

## Installation and Running

1. Clone the repository to your local machine:

```bash
git clone https://github.com/valik3201/music-app.git
```

2. Install dependencies:

```bash
cd music-app
npm i
```

3. Create a `.env` file in the root of the project and add the necessary environment variables:

```plaintext
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_REDIRECT_URI=your_redirect_uri
```

4. Run the application:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Authentication via Spotify

For detailed information on the authentication process in the application, please refer to the [`authentication.md`](https://github.com/Valik3201/music-app/blob/main/authentication.md) file.

### Redux Hooks

```typescript
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

This code snippet provides custom hooks for convenient work with Redux in a React application.

1. **useAppDispatch**: This hook provides access to the `dispatch` object, which is used to dispatch actions to the Redux store. It is initialized using the `useDispatch` function from the `react-redux` package.

2. **useAppSelector**: This hook allows selecting parts of the state from the Redux store. It takes the `RootState` type, which represents the root state of the Redux store, and returns the selected piece of state. It is initialized using the `useSelector` function from the `react-redux` package.

After defining these custom hooks, they can be used in React components to manage the application state with Redux without the need to import `useDispatch` and `useSelector` from `react-redux` every time and passing state and dispatch types.

## Author

[![Gmail Badge](https://img.shields.io/badge/Gmail-EA4335?logo=gmail&logoColor=fff&style=flat)](mailto:valik3201@gmail.com)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=flat)](https://www.linkedin.com/in/valentynchernetskyi/)
[![Telegram Badge](https://img.shields.io/badge/Telegram-26A5E4?logo=telegram&logoColor=fff&style=flat)](https://t.me/valik3201)
[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=fff&style=flat)](https://www.instagram.com/valik_chern/)
[![Twitter Badge](https://img.shields.io/badge/Twitter-1D9BF0?logo=twitter&logoColor=fff&style=flat)](https://twitter.com/valik3201)

## Acknowledgments

#### Spotify

I would like to express my gratitude to Spotify for providing access to their Web API, which allowed implementing the functionality of the music application in this project.

#### Codecademy

I express my gratitude to Codecademy for providing educational materials and the opportunity to learn technologies used in the development of this project. Thanks to the courses on Codecademy, I was able to deepen my knowledge in React and TypeScript, which helped in implementing this application.
