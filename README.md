<h1 align="center">React + TypeScript + Vite Music App with Spotify Web API</h1>
    
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

This section in my project deserves special attention. Implementing authentication functionality was a challenging task for me, requiring a lot of effort and time. Perhaps it may seem simple to some, but for me, it was a real challenge. Therefore, I would like to focus on this aspect. I hope that my information and experience in this aspect will be useful to other developers facing similar tasks.

During development, I encountered a lack of examples of using Spotify Web API authentication with React and TypeScript. Most available examples were based on using the Express framework to implement the `/login` method for initiating the authorization request. However, such examples were not suitable for my project, which was based on React and TypeScript without using Express.

So, I decided to refer to the Authorization Code with PKCE Flow guide in JavaScript and adapt it for my project.

The authentication method using **Proof Key for Code Exchange (PKCE)** helps prevent attacks related to intercepting the authorization code and using it to obtain an access token. The basic information about this method is provided [here](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow), but I also want to break it down and provide a detailed description of the implementation of this method in my application.

This additional explanation allows for a more detailed understanding of how the PKCE method is used in my application and how it ensures the security of the authentication process.

### Code Verifier

The PKCE authentication flow begins with the creation of a code verifier. According to the PKCE standard, the code verifier is a cryptographically random string with high entropy, ranging from 43 to 128 characters in length (the longer, the better). It can contain letters, numbers, underscores, dots, dashes, or tildes.

The code verifier is implemented using the following function:

```typescript
// Function to generate code verifier
export const generateCodeVerifier = () => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  return Array.from(randomValues)
    .map((value) => possible[value % possible.length])
    .join("");
};
```

### Code Challenge

After generating the code verifier, it needs to be transformed (hashed) using the **SHA256** algorithm. This value will be sent in the user authentication request.

For this purpose, the `generateCodeChallenge` function is used. It takes the authorization code as input, converts it into binary format, computes the SHA-256 hash, and returns the result as a Base64 string, which is then used in the exchange of the authorization code for an access token.

```typescript
// Function to generate code challenge
export const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);
  return base64urlencode(hashed);
};
```

Next, the `base64urlencode` function is implemented, which returns the Base64 representation of the computed hash using the `generateCodeChallenge` function:

```typescript
// Function to encode array buffer to base64 URL
const base64urlencode = (arrayBuffer: ArrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  let str = "";
  bytes.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
```

The `exchangeToken` function performs the exchange of the authorization code for an access token. This token will be used to authenticate the user when making requests to the Spotify Web API. The `code` parameter represents the authorization code obtained after successful user authentication.

```typescript
const exchangeToken = async (code: string) => {
  try {
    const response = await axios.post(
      "tokenEndpoint",
      {
        code: code,
        // Другие параметры запроса
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обмене токена:", error);
    throw error;
  }
};
```

### Request User Authorization

To request user authorization, you need to make a GET request to the /authorize endpoint (authorizationEndpoint). This request should include the same parameters as the authorization code flow, as well as two additional parameters: `code_challenge` and `code_challenge_method`.

| Request Parameter    | Relevance          | Value                                                                                                      |
|-----------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| client_id             | Required          | The client identifier generated after registering the application.                                                                                                   |
| response_type         | Required          | Set to `code`.                                                                                                                                                           |
| redirect_uri         | Required          | The URI to redirect to after the user grants or denies permission. This URI must be included in the list of allowed redirect URIs specified during application registration [(see application guide)](https://developer.spotify.com/documentation/web-api/concepts/apps). The `redirect_uri` value here must exactly match one of the values entered during application registration, including upper or lower case, trailing slashes, and so on. |
| state                 | Optional          | Provides protection against attacks such as cross-site request forgery.                                                                                               |
| scope                 | Optional          | A space-separated list of scopes. If scopes are not specified, permission will be granted only for access to public information: i.e., only information typically visible in Spotify desktop, web, and mobile applications. |
| code_challenge_method| Required          | Set to `S256`.                                                                                                                                                           |
| code_challenge        | Required          | Set to the code challenge that was calculated in the previous step.                                                                                                    |

The code for requesting user authorization looks like this:

```typescript
// Function to redirect to Spotify authorization page
export const redirectToSpotifyAuthorize = async () => {
  // Generate code verifier and challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  localStorage.setItem("code_verifier", codeVerifier);

  // Construct authorization URL
  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  // Redirect to Spotify authorization page
  window.location.href = authUrl.toString();
};
```

The application generates a **PKCE** code challenge and redirects to the Spotify authorization server login page by updating the `window.location` object. This allows the user to grant permissions to the application.

> [!NOTE]
> Note that the code verifier (`code_verifier`) value is stored locally using the `localStorage` property for use in the next stage of the authorization flow.

### Response

If the user accepts the requested permissions, the **OAuth** service redirects the user back to the URL specified in the `redirect_uri` field. This callback contains two query parameters in the URL:

| Query Parameter | Value                                                      |
|-----------------|------------------------------------------------------------|
| code            | The authorization code that can be exchanged for an access token. |
| state           | The value of the state parameter provided in the request.  |

Next, you need to parse the URL to retrieve the code parameter.

```typescript
const args = new URLSearchParams(window.location.search);
const code = args.get("code");
```

The `code` will be needed to request an access token in the next step.

If the user declines the request or an error occurs, the query string in the response will contain an "error" parameter with a description of the reason for the unsuccessful authorization, for example: "access_denied".

### Request an access token

After the user accepts the authorization request from the previous step, you can exchange the authorization code for an access token. To do this, you need to send a POST request to the /api/token (`tokenEndpoint`) endpoint with the following parameters:

| Request Parameter | Required | Value                                                                                   |
|-------------------|----------|-----------------------------------------------------------------------------------------|
| grant_type        | Required | Must contain the value "authorization_code".                                           |
| code              | Required | The authorization code returned from the previous request.                              |
| redirect_uri      | Required | This parameter is used only for verification (there is no actual redirection). The value of this parameter must exactly match the value of the redirect_uri parameter specified when requesting the authorization code. |
| client_id         | Required | The application identifier, available from the developer dashboard.                     |
| code_verifier     | Required | The value of this parameter must match the `code_verifier` value generated by the application in the previous step.  |

The request must include the following HTTP header:

| Header Parameter | Required | Value                            |
|------------------|----------|----------------------------------|
| Content-Type     | Required | Set as `application/x-www-form-urlencoded`. |

After receiving the authorization code from the Spotify response, call the `exchangeToken` function.

```typescript
export const exchangeToken = createAsyncThunk<Token, string>(
  "auth/exchangeToken",
  async (code) => {
    if (!code) return;

    const codeVerifier = localStorage.getItem("code_verifier");

    try {
      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier!,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return processTokenResponse(response);
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
);
```

### Response 

In case of success, the response will have a status of **200 OK** and the following JSON data in the response body:

| Key             | Type    | Description                                                                                         |
|-----------------|---------|-----------------------------------------------------------------------------------------------------|
| access_token    | string  | The access token that can be used in subsequent calls, such as to the Spotify Web API services.    |
| token_type      | string  | How the access token can be used: always "Bearer".                                                  |
| scope           | string  | The list of scopes granted for this access_token, separated by spaces.                               |
| expires_in      | int     | The period of time (in seconds) for which the access token is valid.                                  |
| refresh_token   | string  | A new access token, not requiring users to reauthorize the application.                             

Additionally, the `processTokenResponse` function is used, which takes a time value in seconds (for example, 3600 seconds, which is equal to one hour) and adds this number of seconds to the current date and time to determine the expiration date and time of the token.

### State Management

After successfully obtaining the token, Redux is used to manage the authentication state in the application. With Redux Toolkit, state updates are handled by a reducer that handles the successful completion of the exchange of the authorization code for the access token..

```typescript
.addCase(exchangeToken.fulfilled, (state, action) => {
  state.currentToken = action.payload;
  state.error = null;
})
```

### Token Exchange Handling

The `handleTokenExchange` function processes the authorization code and exchanges it for an access token. Here is a brief description of its functionality:

1. **Check for Authorization Code**: The function takes the authorization code as an argument and checks for its existence.
   
2. **Exchange Code for Token**: If the authorization code exists, the function sends a request to the server to exchange this code for an access token. This request is made using the `exchangeToken` function, which asynchronously interacts with the server to exchange the authorization code for an access token.

3. **Update URL**: After successfully exchanging the code for a token, the URL is updated to remove the authorization code from the query parameters. This is done for security purposes and to prevent code reuse.

4. **Error Handling**: If errors occur during the code exchange for a token, they are logged to the browser console.

The `handleTokenExchange` function is used to initiate the process of exchanging the authorization code for an access token and updating the URL after a successful exchange.

```typescript
  const handleTokenExchange = async (code: string | null) => {
    if (code) {
      try {
        dispatch(exchangeToken(code));

        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      } catch (error) {
        console.error("Failed to exchange token:", error);
      }
    }
  };
```

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
