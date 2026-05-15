export type JamendoTrack = {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
};
export type JamendoResponse = {
  results: JamendoTrack[];
};
