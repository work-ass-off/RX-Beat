export type JamendoResponse<T> = {
  headers: {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
  };

  results: T[];
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

export type JamendoTrack = {
  id: string;
  name: string;
  duration: number;

  artist_id: string;
  artist_name: string;

  album_id: string;
  album_name: string;

  image: string;
  audio: string;
};
