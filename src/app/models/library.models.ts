export type LibraryItemProps = {
  id: string; //TODO: ID element
  title: string; //TODO: Track, album or artist's name
  subtitle: string; //  TODO: "Playlist • 48 tracks" or "Artist"
  imageUrl?: string; // TODO: Image url
  type: 'artist' | 'album' | 'playlist' | 'show'; //  TODO: Shape of avatar
  isPinned?: boolean; //  TODO: Pinned element or not
  isActive?: boolean; //  TODO: is playing now
};
