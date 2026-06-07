export type JamendoResponse<T> = {
  headers: {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
  };

  results: T;
};

export type JamendoBaseQueryParams = {
  limit?: number;
  offset?: number;
  order?: string;
};

export type JamendoTrackQueryParams = JamendoBaseQueryParams & {
  search?: string;
  tags?: string;
  artist_id?: string;
};

export type JamendoAlbums = {
  id: string;
  name: string;
  releasedate: string;

  artist_id: string;
  artist_name: string;

  image: string;

  tracks?: JamendoTrack[];
  musicinfo?: JamendoMusicInfo;
};

export type JamendoTrack = {
  id: string;
  name: string;
  duration: number;
  audio: string;

  image?: string;
  albume_image?: string;

  artist_id?: string;
  artist_name?: string;

  album_id: string;
  album_name: string;

  updatedate?: string;
  releasedate?: string;
  relations?: {
    review: string;
    favorite: string;
    like: string;
  };

  count?: string;
  position?: string;
};

export type JamendoMusicInfo = {
  tags: string[];
  description: Record<string, string>;
};

export type JamendoAutocompleteResponse = {
  tracks: string[];
  artists: string[];
  albums: string[];
  tags: string[];
};
