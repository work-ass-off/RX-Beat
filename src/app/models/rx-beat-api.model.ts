export type AuthDto = {
  login: string;
  password: string;
};

export type PlaylistDto = {
  name: string;
};

export type Playlist = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export type User = {
  id: string;
  login: string;
  createdAt: number;
  updatedAt: number;
};

export type Token = {
  access_token: string;
};
