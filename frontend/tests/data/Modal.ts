export type ModalData = {
  lyricid: number;
  lyric: string;
  subtext: string;
  lyrichtml: string;
  categories: string;
  album: string;
  albumshort: string;
  alb: string;
  song: string;
};

export const modalData: ModalData[] = [
  {
    lyricid: 1,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "Some kind of <b>haunted</b>, some kind of haunted",
    categories: "parallels|ghosts",
    album: "Midnights",
    albumshort: "Midnights",
    alb: "midnight",
    song: "Midnight Rain",
  },
  {
    lyricid: 2,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "<b>Haunted</b> by the look in my eyes",
    categories: "parallels|ghosts",
    album: "evermore",
    albumshort: "evermore",
    alb: "evermore",
    song: "happiness",
  },
  {
    lyricid: 3,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "Still sitting in a corner I <b>haunt</b>",
    categories: "parallels|ghosts",
    album: "evermore",
    albumshort: "evermore",
    alb: "evermore",
    song: "right where you left me",
  },
];
