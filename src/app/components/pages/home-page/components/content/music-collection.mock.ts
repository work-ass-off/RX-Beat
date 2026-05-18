export type MusicGenre = 'rock' | 'pop' | 'hip-hop' | 'electronic' | 'jazz';

export type Track = {
  id: number;
  title: string;
  artist: string;
  year: number;
  duration: string;
};

export type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
  tracks: Track[];
};

export type GenreCollection = {
  genreTitle: string;
  albums: Album[];
};

export type MusicCollectionByGenre = Record<MusicGenre, GenreCollection>;

export const MUSIC_COLLECTION_MOCK: MusicCollectionByGenre = {
  rock: {
    genreTitle: 'Rock',
    albums: [
      {
        id: 1,
        title: 'Nevermind',
        artist: 'Nirvana',
        year: 1991,
        tracks: [
          {
            id: 1,
            title: 'Smells Like Teen Spirit',
            artist: 'Nirvana',
            year: 1991,
            duration: '5:01',
          },
        ],
      },
      {
        id: 2,
        title: 'A Night at the Opera',
        artist: 'Queen',
        year: 1975,
        tracks: [
          {
            id: 2,
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            year: 1975,
            duration: '5:55',
          },
        ],
      },
      {
        id: 3,
        title: 'Elephant',
        artist: 'The White Stripes',
        year: 2003,
        tracks: [
          {
            id: 3,
            title: 'Seven Nation Army',
            artist: 'The White Stripes',
            year: 2003,
            duration: '3:51',
          },
        ],
      },
      {
        id: 16,
        title: 'Back in Black',
        artist: 'AC/DC',
        year: 1980,
        tracks: [
          {
            id: 16,
            title: 'You Shook Me All Night Long',
            artist: 'AC/DC',
            year: 1980,
            duration: '3:30',
          },
        ],
      },
      {
        id: 17,
        title: 'Led Zeppelin IV',
        artist: 'Led Zeppelin',
        year: 1971,
        tracks: [
          {
            id: 17,
            title: 'Stairway to Heaven',
            artist: 'Led Zeppelin',
            year: 1971,
            duration: '8:02',
          },
        ],
      },
    ],
  },
  pop: {
    genreTitle: 'Pop',
    albums: [
      {
        id: 4,
        title: 'After Hours',
        artist: 'The Weeknd',
        year: 2020,
        tracks: [
          {
            id: 4,
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            year: 2019,
            duration: '3:20',
          },
        ],
      },
      {
        id: 5,
        title: 'When We All Fall Asleep, Where Do We Go?',
        artist: 'Billie Eilish',
        year: 2019,
        tracks: [
          {
            id: 5,
            title: 'Bad Guy',
            artist: 'Billie Eilish',
            year: 2019,
            duration: '3:14',
          },
        ],
      },
      {
        id: 6,
        title: '21',
        artist: 'Adele',
        year: 2011,
        tracks: [
          {
            id: 6,
            title: 'Rolling in the Deep',
            artist: 'Adele',
            year: 2010,
            duration: '3:48',
          },
        ],
      },
      {
        id: 18,
        title: 'Future Nostalgia',
        artist: 'Dua Lipa',
        year: 2020,
        tracks: [
          {
            id: 18,
            title: 'Levitating',
            artist: 'Dua Lipa',
            year: 2020,
            duration: '3:23',
          },
        ],
      },
      {
        id: 19,
        title: '1989',
        artist: 'Taylor Swift',
        year: 2014,
        tracks: [
          {
            id: 19,
            title: 'Blank Space',
            artist: 'Taylor Swift',
            year: 2014,
            duration: '3:51',
          },
        ],
      },
    ],
  },
  'hip-hop': {
    genreTitle: 'Hip-Hop',
    albums: [
      {
        id: 7,
        title: 'DAMN.',
        artist: 'Kendrick Lamar',
        year: 2017,
        tracks: [
          {
            id: 7,
            title: 'HUMBLE.',
            artist: 'Kendrick Lamar',
            year: 2017,
            duration: '2:57',
          },
        ],
      },
      {
        id: 8,
        title: 'ASTROWORLD',
        artist: 'Travis Scott',
        year: 2018,
        tracks: [
          {
            id: 8,
            title: 'SICKO MODE',
            artist: 'Travis Scott',
            year: 2018,
            duration: '5:12',
          },
        ],
      },
      {
        id: 9,
        title: '8 Mile: Music from and Inspired by the Motion Picture',
        artist: 'Eminem',
        year: 2002,
        tracks: [
          {
            id: 9,
            title: 'Lose Yourself',
            artist: 'Eminem',
            year: 2002,
            duration: '5:26',
          },
        ],
      },
      {
        id: 20,
        title: 'The Blueprint',
        artist: 'JAY-Z',
        year: 2001,
        tracks: [
          {
            id: 20,
            title: 'Izzo (H.O.V.A.)',
            artist: 'JAY-Z',
            year: 2001,
            duration: '4:00',
          },
        ],
      },
      {
        id: 21,
        title: 'The College Dropout',
        artist: 'Kanye West',
        year: 2004,
        tracks: [
          {
            id: 21,
            title: 'Jesus Walks',
            artist: 'Kanye West',
            year: 2004,
            duration: '3:13',
          },
        ],
      },
    ],
  },
  electronic: {
    genreTitle: 'Electronic',
    albums: [
      {
        id: 10,
        title: 'Discovery',
        artist: 'Daft Punk',
        year: 2001,
        tracks: [
          {
            id: 10,
            title: 'One More Time',
            artist: 'Daft Punk',
            year: 2000,
            duration: '5:20',
          },
        ],
      },
      {
        id: 11,
        title: 'Nothing but the Beat',
        artist: 'David Guetta',
        year: 2011,
        tracks: [
          {
            id: 11,
            title: 'Titanium',
            artist: 'David Guetta ft. Sia',
            year: 2011,
            duration: '4:05',
          },
        ],
      },
      {
        id: 12,
        title: 'For Lack of a Better Name',
        artist: 'deadmau5',
        year: 2009,
        tracks: [
          {
            id: 12,
            title: 'Strobe',
            artist: 'deadmau5',
            year: 2009,
            duration: '10:37',
          },
        ],
      },
      {
        id: 22,
        title: 'Immunity',
        artist: 'Jon Hopkins',
        year: 2013,
        tracks: [
          {
            id: 22,
            title: 'Open Eye Signal',
            artist: 'Jon Hopkins',
            year: 2013,
            duration: '7:41',
          },
        ],
      },
      {
        id: 23,
        title: 'Cross',
        artist: 'Justice',
        year: 2007,
        tracks: [
          {
            id: 23,
            title: 'D.A.N.C.E.',
            artist: 'Justice',
            year: 2007,
            duration: '4:02',
          },
        ],
      },
    ],
  },
  jazz: {
    genreTitle: 'Jazz',
    albums: [
      {
        id: 13,
        title: 'Kind of Blue',
        artist: 'Miles Davis',
        year: 1959,
        tracks: [
          {
            id: 13,
            title: 'So What',
            artist: 'Miles Davis',
            year: 1959,
            duration: '9:22',
          },
        ],
      },
      {
        id: 14,
        title: 'Time Out',
        artist: 'The Dave Brubeck Quartet',
        year: 1959,
        tracks: [
          {
            id: 14,
            title: 'Take Five',
            artist: 'The Dave Brubeck Quartet',
            year: 1959,
            duration: '5:24',
          },
        ],
      },
      {
        id: 15,
        title: 'My Favorite Things',
        artist: 'John Coltrane',
        year: 1961,
        tracks: [
          {
            id: 15,
            title: 'My Favorite Things',
            artist: 'John Coltrane',
            year: 1961,
            duration: '13:44',
          },
        ],
      },
      {
        id: 24,
        title: 'Ella and Louis',
        artist: 'Ella Fitzgerald & Louis Armstrong',
        year: 1956,
        tracks: [
          {
            id: 24,
            title: "They Can't Take That Away from Me",
            artist: 'Ella Fitzgerald & Louis Armstrong',
            year: 1956,
            duration: '4:42',
          },
        ],
      },
      {
        id: 25,
        title: 'Blue Train',
        artist: 'John Coltrane',
        year: 1957,
        tracks: [
          {
            id: 25,
            title: 'Blue Train',
            artist: 'John Coltrane',
            year: 1957,
            duration: '10:43',
          },
        ],
      },
    ],
  },
};
