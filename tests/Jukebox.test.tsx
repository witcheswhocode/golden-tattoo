import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Jukebox from "../src/components/Jukebox";

type WritersData = {
  alb: string;
  album: string;
  albumid: number;
  albumshort: string;
  apple: string;
  countproducers: number;
  countwriters: number;
  other: string;
  producers: string;
  released: string;
  song: string;
  songid: number;
  spotify: string;
  totaloriginalsongs: number;
  totalselfwritten: number;
  totalsongs: number;
  totalsongsftv: number;
  totalwriters: number;
  writers: string;
};

const writersData: WritersData[] = [
  {
    alb: "midnights",
    album: "Midnights",
    albumid: 9,
    albumshort: "Midnights",
    apple: "https://music.apple.com/us/album/midnights/1649434004",
    countproducers: 0,
    countwriters: 6,
    other:
      "https://store.taylorswift.com/collections/special-edition-vinyls/products/midnights-vinyl",
    producers: "",
    released: "2022",
    song: "Lavender Haze",
    songid: 171,
    spotify:
      "https://open.spotify.com/playlist/4GtQVhGjAwcHFz82UKy3Ca?si=7163584ad3324695",
    totaloriginalsongs: 21,
    totalselfwritten: 1,
    totalsongs: 21,
    totalsongsftv: 0,
    totalwriters: 10,
    writers:
      "Sam Dew,Jahaan Sweet,Sounwave,Zoë Kravitz,Jack Antonoff,Taylor Swift",
  },
  {
    alb: "midnights",
    album: "Midnights",
    albumid: 9,
    albumshort: "Midnights",
    apple: "https://music.apple.com/us/album/midnights/1649434004",
    countproducers: 0,
    countwriters: 2,
    other:
      "https://store.taylorswift.com/collections/special-edition-vinyls/products/midnights-vinyl",
    producers: "",
    released: "2022",
    song: "Maroon",
    songid: 172,
    spotify:
      "https://open.spotify.com/playlist/4GtQVhGjAwcHFz82UKy3Ca?si=7163584ad3324695",
    totaloriginalsongs: 21,
    totalselfwritten: 1,
    totalsongs: 21,
    totalsongsftv: 0,
    totalwriters: 10,
    writers: "Jack Antonoff,Taylor Swift",
  },
  {
    alb: "midnights",
    album: "Midnights",
    albumid: 9,
    albumshort: "Midnights",
    apple: "https://music.apple.com/us/album/midnights/1649434004",
    countproducers: 0,
    countwriters: 6,
    other:
      "https://store.taylorswift.com/collections/special-edition-vinyls/products/midnights-vinyl",
    producers: "",
    released: "2022",
    song: "Anti-Hero",
    songid: 173,
    spotify:
      "https://open.spotify.com/playlist/4GtQVhGjAwcHFz82UKy3Ca?si=7163584ad3324695",
    totaloriginalsongs: 21,
    totalselfwritten: 1,
    totalsongs: 21,
    totalsongsftv: 0,
    totalwriters: 10,
    writers: "Jack Antonoff,Taylor Swift",
  },
  {
    alb: "fearless",
    album: "Fearless (Taylor's Version)",
    albumid: 1,
    albumshort: "Fearless (TV)",
    apple:
      "https://music.apple.com/us/album/fearless-taylors-version/1552791073",
    countproducers: 0,
    countwriters: 3,
    other:
      "https://store.taylorswift.com/collections/fearless-taylors-version-album-collection",
    producers: "",
    released: "2008,2021",
    song: "Fearless (Taylor's Version)",
    songid: 14,
    spotify:
      "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=ZMj61rcORNedgqOScGpyFA",
    totaloriginalsongs: 19,
    totalselfwritten: 11,
    totalsongs: 25,
    totalsongsftv: 6,
    totalwriters: 11,
    writers: "Hillary Lindsey,Liz Rose,Taylor Swift",
  },
];

test("renders Jukebox component with song and album title", () => {
  render(<Jukebox data={writersData} />);

  // Ensure that the modal is rendered with the correct data
  const elementTS = screen.getAllByText("Taylor Swift");
  expect(elementTS.length).toBe(4);

  const elementLR = screen.getAllByText("Liz Rose");
  expect(elementLR.length).toBe(1);

  const elementHL = screen.getAllByText("Hillary Lindsey");
  expect(elementHL.length).toBe(1);

  const elementJA = screen.getAllByText("Jack Antonoff");
  expect(elementJA.length).toBe(3);

  const elementSD = screen.getAllByText("Sam Dew");
  expect(elementSD.length).toBe(1);

  const elementJS = screen.getAllByText("Jahaan Sweet");
  expect(elementJS.length).toBe(1);

  const elementS = screen.getAllByText("Sounwave");
  expect(elementS.length).toBe(1);

  const elementZ = screen.getAllByText("Zoë Kravitz");
  expect(elementZ.length).toBe(1);

  const elementLH = screen.getAllByText("Lavender Haze");
  expect(elementLH.length).toBe(1);

  const elementAH = screen.getAllByText("Anti-Hero");
  expect(elementAH.length).toBe(1);

  const elementM = screen.getAllByText("Maroon");
  expect(elementM.length).toBe(1);

  const elementF = screen.getAllByText("Fearless (Taylor's Version)");
  expect(elementF.length).toBe(1);
});
