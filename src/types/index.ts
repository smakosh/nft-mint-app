export type Collection = {
  id: number;
  title: string;
  description: string;
  published_at: Date;
  total_photos: number;
  private: boolean;
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
  // current_user_collections: [ // The *current user's* collections that this photo belongs to.
  //   {
  //     id: 206;
  //     title: Makers: Cat and Ben;
  //     published_at: 2016-01-12T18:16:09-05:00;
  //     last_collected_at: 2016-06-02T13:10:03-04:00;
  //     updated_at: 2016-07-10T11:00:01-05:00;
  //     cover_photo: null;
  //     user: null
  //   };
  //   // ... more collections
  // ];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};
