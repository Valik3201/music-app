<h1 align="center">React + TypeScript + Vite Music App<br/>with Spotify Web API</h1>
    
<div align="center">
  <p>
    Веб-приложение с использованием Spotify Web API для поиска и создания плейлистов, а также других функций. 
    <br />
    <a href="https://github.com/Valik3201/music-app"><strong>Документация (русский) »</strong></a>
    ·
    <a href="https://github.com/Valik3201/music-app/blob/main/README.md"><strong>Documentation (English) »</strong></a>
    <br />
    <br />
    <a href="https://music-app-ts.netlify.app/">Посмотреть демо</a>
    ·
    <a href="https://github.com/Valik3201/music-app/issues">Сообщить о проблеме</a>
    ·
    <a href="https://github.com/Valik3201/music-app/issues">Запросить новую функцию</a>
  </p>
</div>

## Описание

Это веб-приложение разработано в рамках обучения на платформе [Codecademy](https://www.codecademy.com). Создавая этот проект, я хотел бы более глубоко изучить TypeScript и укрепить свои навыки работы с Redux, React Router и Tailwind CSS, а также углубить свое понимание React. Приложение позволяет пользователям искать музыкальные композиции в библиотеке Spotify, создавать персонализированные плейлисты и сохранять их в своем аккаунте Spotify.

![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)
![Axios Badge](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=flat)
![React Router Badge](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat)
![Redux Badge](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)
![Netlify Badge](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=fff&style=flat)

[![screenshot](https://github.com/Valik3201/music-app/blob/main/assets/screenshot-1.png)](https://github.com/Valik3201/music-app/blob/main/assets/screenshot-1.png)

## Функциональность

- **Аутентификация**: Пользователи могут войти в свой аккаунт Spotify и получить доступ к своим плейлистам.
- **Поиск музыки**: Возможность поиска треков, альбомов, артистов и плейлистов через [Spotify Web API](https://developer.spotify.com/documentation/web-api).
- **Создание и управление плейлистами**: Пользователи могут создавать свои собственные плейлисты и добавлять в них треки.
- **Навигация по приложению**: Использование бокового меню для перехода между разделами приложения, такими как домашняя страница, поиск, создание и просмотр плейлистов, а также плейлист со списком избранных песен и другие плейлисты пользователя.
- **Отображение информации о музыке**: Пользователи могут просматривать подробную информацию о треках, альбомах и плейлистах, а также добавлять их в свои плейлисты.

### Будущее функции

Помимо текущей функциональности, в разработке планируется добавить следующие возможности:

1. **Управление плейлистом**:
   - Возможность изменения обложки и описания плейлиста.
   - Возможность удаления песен из плейлиста.

2. **Обновление состояния приложения**:
   - Автоматическое обновление состояния приложения сразу же после любых изменений, таких как создание плейлиста, добавление или удаление песен из плейлиста, а также добавление альбома в сохраненные альбомы.

3. **Добавление плеера для прослушивания**:
   - Интеграция музыкального плеера в приложение для прослушивания музыки непосредственно из интерфейса.

4. **Добавление раздела с похожим контентом**:
   - Возможность просмотра похожего контента, основанного на предпочтениях и истории прослушивания пользователя.

5. **Улучшение оптимизации приложения**:
   - Оптимизация производительности и процессов работы приложения для более плавного и быстрого пользовательского опыта.
   - Улучшение пользовательского интерфейса и навигации для повышения удобства использования.

Эти дополнительные функции помогут расширить возможности приложения и сделать его еще более удобным и функциональным для пользователей.

## Технологии

- **React**: Использован для разработки пользовательского интерфейса и управления состоянием приложения.
- **TypeScript**: Для статической типизации к JavaScript, что делает код более надежным и удобным для сопровождения.
- **Redux Toolkit**: Для эффективного управления состоянием приложения, включая информацию об аутентификации пользователя и его данных.
- **React Router 6**: Для навигации между страницами и компонентами приложения.
- **Axios**: Использован для выполнения HTTP-запросов к Spotify Wev API.
- **Redux Persist**: Для сохранения токена доступа пользователя между сеансами работы с приложением.
- **Tailwind CSS**: Для стилизации пользовательского интерфейса. Tailwind CSS позволяет быстро создавать кастомные стили с помощью набора предопределенных классов.
- **Flowbite**: Еще один инструмент для стилизации пользовательского интерфейса, который помогает создавать эстетичные и адаптивные дизайны.
- **Netlify**: Платформа для деплоя и хостинга веб-приложения, с использованием переменных окружения для безопасного хранения конфиденциальных данных.

## Установка и запуск

1. Клонируйте репозиторий на свой локальный компьютер:

```bash
git clone https://github.com/valik3201/music-app.git
```

2. Установите зависимости:

```bash
cd music-app
npm i
```

3. Создайте файл `.env` в корне проекта и добавьте в него необходимые переменные окружения:

```plaintext
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_REDIRECT_URI=your_redirect_uri
```

4. Запустите приложение:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

## Аутентификация через Spotify

Этот раздел в моем проекте заслуживает особого внимания. Реализация функциональности аутентификации была для меня сложной задачей, требующей много усилий и времени. Возможно, для кого-то это бы казалось простым, но для меня это был настоящий вызов. По-этому я бы хотел уделить этому особое внимание. Надеюсь, что моя информация и опыт в этом аспекте будут полезными для других разработчиков, сталкивающихся с подобными задачами.

В процессе разработки я столкнулся с отсутствием примеров использования аутентификации Spotify Web API с использованием React и TypeScript. Большинство доступных примеров были основаны на использовании фреймворка Express для реализации метода `/login` инициирования запроса авторизации. Однако, такие примеры не подходили для моего проекта, который базировался на React и TypeScript без использования Express.

По-этому я решил обратиться к руководству по Authorization Code with PKCE Flow на JavaScript и адаптировать его для своего проекта. 

Метод аутентификации с использованием **Proof Key for Code Exchange (PKCE)** позволяет предотвратить атаки, связанные с перехватом кода авторизации и использованием его для получения токена доступа. Основная информация о данном методе представлена [здесь](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow), но я также хочу разложить все по порядку и дать подробное описание реализации этого метода в моем приложении.

Это дополнительное объяснение позволяет дать более подробное представление о том, как метод PKCE используется в моем приложении, и каким образом он обеспечивает безопасность аутентификационного процесса.

### Code Verifier

Поток авторизации PKCE начинается с создания верификатора кода. Согласно стандарту PKCE, верификатор кода представляет собой криптографическую случайную строку с высокой энтропией длиной от 43 до 128 символов (чем длиннее, тем лучше). Он может содержать буквы, цифры, подчеркивания, точки, дефисы или тильды.

Верификатор кода реализован с помощью следующей функции:

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

После того, как верификатор кода был сгенерирован, нужно преобразовать (хэшировать) его с помощью алгоритма **SHA256**. Это значение, которое будет отправлено в запросе на авторизацию пользователя.

Для этого используется функция `generateCodeChallenge`, которая принимает код авторизации в качестве входных данных, преобразует его в бинарный формат, вычисляет хеш SHA-256 и возвращает результат в виде строки Base64, который затем используется в обмене кода авторизации на токен доступа.

```typescript
// Function to generate code challenge
export const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);
  return base64urlencode(hashed);
};
```

Далее реализована функция `base64urlencode`, которая возвращает base64-представление вычисленного хэша с помощью функции `generateCodeChallenge`:

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

Функция `exchangeToken` выполняет обмен кода авторизации на токен доступа.
Этот токен будет использоваться для аутентификации пользователя при выполнении запросов к Spotify Web API . Параметр `code` представляет собой код авторизации, полученный после успешной аутентификации пользователя.

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

Чтобы запросить авторизацию у пользователя, необходимо сделать GET-запрос на конечную точку /authorize (`authorizationEndpoint`). Этот запрос должен включать те же параметры, что и поток кода авторизации, а также два дополнительных параметра: `code_challenge` и `code_challenge_method`:

| Параметр запроса      | Релевантность     | Значение                                                                                                                                                                |
|-----------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| client_id             | Обязательно       | Идентификатор клиента, созданный после регистрации приложения.                                                                                                   |
| response_type         | Обязательно       | Установлено в `code`.                                                                                                                                                     |
| redirect_uri         | Обязательно       | URI для перенаправления после предоставления или отказа в разрешении пользователем. Этот URI должен быть внесен в список разрешенных URI перенаправления, указанный при регистрации  приложения [(см. руководство по приложению)](https://developer.spotify.com/documentation/web-api/concepts/apps). Значение `redirect_uri` здесь должно точно соответствовать одному из значений, введенных при регистрации приложения, включая верхний или нижний регистр, завершающие косые черты и тому подобное. |
| state                 | Опционально | Это обеспечивает защиту от атак, таких как межсайтовая подделка запроса.                                                                                   |
| scope                 | Опционально       | Пробел-разделенный список областей. Если области не указаны, разрешение будет предоставлено только для доступа к общедоступной информации: т. е. только к информации, обычно видимой в настольных, веб- и мобильных приложениях Spotify. |
| code_challenge_method| Обязательно       | Установлено в `S256`.                                                                                                                                                     |
| code_challenge        | Обязательно       | Установлено в код вызова, который был расчитан на предыдущем этапе.                                                                                     |

Код для запроса авторизации пользователя выглядит следующим образом:

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

Приложение генерирует вызов кода **PKCE** и перенаправляет на страницу входа в систему сервера авторизации **Spotify**, обновляя значение объекта `window.location`. Это позволяет пользователю предоставлять разрешения  приложению

> [!NOTE]  
> Обратите внимание, что значение верификатора кода (`code_verifier`) хранится локально с использованием свойства `localStorage` для использования на следующем этапе потока авторизации.

### Response

Если пользователь принимает запрошенные разрешения, служба **OAuth** перенаправляет пользователя обратно на URL-адрес, указанный в поле `redirect_uri`. Этот обратный вызов содержит два параметра запроса в URL:

| Параметр запроса | Значение                                                                                   |
|------------------|--------------------------------------------------------------------------------------------|
| code             | Авторизационный код, который можно обменять на токен доступа.                              |
| state            | Значение параметра state, предоставленное в запросе.                                       |

Затем нужно разобрать URL-адрес, чтобы получить параметр кода:

```typescript
const args = new URLSearchParams(window.location.search);
const code = args.get("code");
```

`code` будет необходим для запроса токена доступа на следующем шаге.

Если пользователь отклоняет запрос или происходит ошибка, в ответе строка запроса будет содержать параметр "error" с описанием причины неудачной авторизации, например: "access_denied".

### Request an access token

После того, как пользователь примет запрос на авторизацию предыдущего шага, можно обменять код авторизации на токен доступа. Для єтого нужно отправить POST-запрос на конечную точку /api/token (`tokenEndpoint`)со следующими параметрами:

| Параметр запроса | Обязательность | Значение                                       |
|------------------|----------------|------------------------------------------------|
| grant_type       | Обязательный   | Должно содержать значение authorization_code.  |
| code             | Обязательный   | Код авторизации, возвращенный из предыдущего запроса.|
| redirect_uri     | Обязательный   | Этот параметр используется только для проверки (фактического перенаправления нет). Значение этого параметра должно точно соответствовать значению параметра redirect_uri, указанному при запросе кода авторизации.|
| client_id        | Обязательный   | Идентификатор приложения, доступный из панели разработчика.|
| code_verifier    | Обязательный   | Значение этого параметра должно совпадать со значением `code_verifier`, сгенерированным приложением на предыдущем этапе.|
  
Запрос должен включать следующий заголовок HTTP:  

| Параметр заголовка | Обязательность | Значение                     |
|--------------------|----------------|------------------------------|
| Content-Type       | Обязательный   | Установлено как `application/x-www-form-urlencoded`. |

После получения кода авторизации из ответа Spotify, вызываем функцию `exchangeToken`.

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

В случае успеха ответ будет иметь статус **200 OK** и следующие JSON-данные в теле ответа:

| Ключ            | Тип     | Описание                                                                                             |
|-----------------|---------|------------------------------------------------------------------------------------------------------|
| access_token    | string  | Токен доступа, который может быть использован в последующих вызовах, например, к сервисам Spotify Web API.|
| token_type      | string  | Как может быть использован токен доступа: всегда "Bearer".                                           |
| scope           | string  | Список областей (scopes), которые были предоставлены для этого access_token, разделенные пробелами.|
| expires_in      | int     | Период времени (в секундах), в течение которого токен доступа действителен.                         |
| refresh_token   | string  | Новый токен доступа, не требуемый от пользователей повторной авторизации приложения.                       

Дополнительно используется функция `processTokenResponse` которая принимает значение времени в секундах (например, 3600 секунд, что равно одному часу) и добавляет это количество секунд к текущей дате и времени, чтобы определить дату и время истечения токена.

### Управление состоянием

После успешного получения токена, используется Redux для управления состоянием аутентификации в приложении. При помощи Redux Toolkit, обновление состояния выполняется с помощью редюсера, который обрабатывает успешное выполнение обмена кода авторизации на токен доступа.

```typescript
.addCase(exchangeToken.fulfilled, (state, action) => {
  state.currentToken = action.payload;
  state.error = null;
})
```

### Обработка обмена токена

Функция `handleTokenExchange` выполняет обработку кода авторизации и обмен его на токен доступа. Вот краткое описание ее функциональности:

1. **Проверка наличия кода авторизации**: Функция принимает код авторизации в качестве аргумента и проверяет его на наличие.
   
2. **Обмен кода на токен**: Если код авторизации существует, функция выполняет запрос на сервер для обмена этого кода на токен доступа. Этот запрос выполняется с помощью функции `exchangeToken`, которая асинхронно взаимодействует с сервером для обмена кода авторизации на токен доступа.

3. **Обновление URL**: После успешного обмена кода на токен, URL обновляется, чтобы удалить код авторизации из параметров запроса. Это делается для безопасности и для предотвращения повторного использования кода.

4. **Обработка ошибок**: В случае возникновения ошибок при обмене кода на токен, они логируются в консоли браузера.

Функция `handleTokenExchange`  используется для инициирования процесса обмена кода авторизации на токен доступа и обновления URL после успешного обмена.

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

### Хуки для работы с Redux


```typescript
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

```

Данный фрагмент кода предоставляет кастомные хуки для удобной работы с Redux в React-приложении.

1. **useAppDispatch**: Этот хук предоставляет доступ к объекту `dispatch`, который используется для отправки actions в Redux store. Он инициализируется с помощью функции `useDispatch` из пакета `react-redux`.

2. **useAppSelector**: Этот хук позволяет выбирать части состояния из Redux store. Он принимает тип `RootState`, который представляет корневое состояние Redux store, и возвращает выбранный кусок состояния. Он инициализируется с помощью функции `useSelector` из пакета `react-redux`.

После определения кастомных хуков, их можно использовать в компонентах React для управления состоянием приложения с помощью Redux без необходимости каждый раз импортировать `useDispatch` и `useSelector` из `react-redux` и передавать типы состояния и диспатча.

## Автор

[![Gmail Badge](https://img.shields.io/badge/Gmail-EA4335?logo=gmail&logoColor=fff&style=flat)](mailto:valik3201@gmail.com)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=flat)](https://www.linkedin.com/in/valentynchernetskyi/)
[![Telegram Badge](https://img.shields.io/badge/Telegram-26A5E4?logo=telegram&logoColor=fff&style=flat)](https://t.me/valik3201)
[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=fff&style=flat)](https://www.instagram.com/valik_chern/)
[![Twitter Badge](https://img.shields.io/badge/Twitter-1D9BF0?logo=twitter&logoColor=fff&style=flat)](https://twitter.com/valik3201)

## Благодарности

#### Spotify
Хочу выразить благодарность компании Spotify за предоставление доступа к их Web API, что позволило реализовать функционал музыкального приложения в этом проекте.

#### Codecademy
Выражаю благодарность Codecademy за предоставление обучающего материала и возможность изучения технологий, которые использовались при разработке этого проекта. Благодаря курсам на Codecademy я смог углубить свои знания в React и TypeScript, что помогло в реализации данного приложения.
