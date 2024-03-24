export interface SearchResult {
  artists: {
    total: number;
    items: Artist[];
  };
  albums: {
    total: number;
    items: Album[];
  };
  tracks: {
    total: number;
    items: Track[];
  };
  playlists: {
    total: number;
    items: Playlist[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: { url: string }[];
  release_date: string;
  external_urls: { spotify: string };
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  images: { url: string }[];
  duration_ms: number;
  external_urls: { spotify: string };
  uri: string;
}

export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  owner: {
    display_name: string;
  };
  external_urls: { spotify: string };
}
