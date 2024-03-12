export interface SearchResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  playlists: Playlist[];
}

export interface Artist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
}

export interface Track {
  id: string;
  name: string;
}

export interface Playlist {
  id: string;
  name: string;
}
