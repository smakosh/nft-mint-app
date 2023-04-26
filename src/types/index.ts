export type User = {
  name: string;
  username: string;
  links: {
    html: string;
  };
};

export type Collection = {
  id: number;
  title: string;
  description: string;
  published_at: Date;
  total_photos: number;
  private: boolean;
  user: User;
  cover_photo: {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
  };
};

export type Profile = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  total_collections: number;
  followed_by_user: boolean;
  downloads: number;
  instagram_username: string | null;
  email: string;
};

export type CollectionPhoto = {
  id: string;
  created_at: Date;
  updated_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: false;
  description: string;
  user: User;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};
