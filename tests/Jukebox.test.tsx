import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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
  released: number;
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
    released: 2022,
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
    released: 2022,
    song: "Maroon",
    songid: 172,
    spotify:
      "https://open.spotify.com/playlist/4GtQVhGjAwcHFz82UKy3Ca?si=7163584ad3324695",
    totaloriginalsongs: 21,
    totalselfwritten: 1,
    totalsongs: 21,
    totalsongsftv: 0,
    totalwriters: 10,
    writers:
      "Jack Antonoff,Taylor Swift",

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
    released: 2022,
    song: "Anti-Hero",
    songid: 173,
    spotify:
      "https://open.spotify.com/playlist/4GtQVhGjAwcHFz82UKy3Ca?si=7163584ad3324695",
    totaloriginalsongs: 21,
    totalselfwritten: 1,
    totalsongs: 21,
    totalsongsftv: 0,
    totalwriters: 10,
    writers:
      "Jack Antonoff,Taylor Swift",

  },
];

test("renders Modal component with song and album title", () => {
  render(<Jukebox data={writersData} />);

  // Ensure that the modal is rendered with the correct data
  const elementTS = screen.getAllByText("Taylor Swift");
  expect(elementTS.length).toBe(3);

  /*expect(screen.getByText("Jack Antonoff")).toBeTruthy();
  expect(screen.getByText("Sam Dew")).toBeTruthy();
  expect(screen.getByText("Jahaan Sweet")).toBeTruthy();
  expect(screen.getByText("Sounwave")).toBeTruthy();
  expect(screen.getByText("Zoë Kravitz")).toBeTruthy();
  expect(screen.getByText("Lavender Haze")).toBeTruthy();
  expect(screen.getByText("Anti-Hero")).toBeTruthy();
  expect(screen.getByText("Maroon")).toBeTruthy();*/

});

