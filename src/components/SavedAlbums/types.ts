export interface Album {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  images: {
    url: string;
  }[];
}
