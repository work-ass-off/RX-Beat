export type LibraryItemProps = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  type: 'artist' | 'album' | 'playlist' | 'show';
  isPinned?: boolean;
  isActive?: boolean;
};
