export interface SearchResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  playlists: Playlist[];
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  images: Image[];
  duration_ms: number;
}

export interface Playlist {
  id: string;
  name: string;
  images: Image[];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
