export type PicsumPhoto = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type RootStackParamList = {
  Main: undefined;

  // Tabs
  Feed: undefined;
  Search: undefined;
  Camera: undefined;
  Favorites: undefined;
  Profile: undefined;

  // Modals
  PhotoDetailModal: { photo: PicsumPhoto };
  FeedDetailModal: undefined;
};
export type FavoriteItemType = {
  id: string;           
  uri: string;         
  author?: string;  
};