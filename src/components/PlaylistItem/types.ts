export interface PlaylistOwner {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface PlaylistImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface PlaylistFollowers {
  href: string | null;
  total: number;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  track: Track;
}

export interface PlaylistTracks {
  href: string;
  items: PlaylistTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: PlaylistFollowers;
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: PlaylistOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  name: string;
  uri: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface ExternalIds {
  isrc: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
  video_thumbnail: {
    url: string | null;
  };
}
