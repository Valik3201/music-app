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

Для получения подробной информации о процессе аутентификации в приложении, ознакомьтесь с файлом [`authentication.md`](https://github.com/Valik3201/music-app/blob/main/authentication_ru.md).

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
