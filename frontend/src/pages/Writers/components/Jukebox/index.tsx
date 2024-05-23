import React, { useState } from "react";
import AlbumHeader from "../AlbumHeader";

export interface WritersProps {
  alb: string | null;
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
}

export interface WritersData {
  data: WritersProps[];
}

function Jukebox(props: WritersData) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track sorting order
  const listOfPromeninetWriters = [
    "Taylor Swift",
    "Liz Rose",
    "Jack Antonoff",
    "Max Martin",
    "Shellback",
    "Aaron Dessner",
    "Joe Alwyn",
  ];

  function getColor(writer: string) {
    if (listOfPromeninetWriters.includes(writer)) {
      return writer.replaceAll(" ", "");
    } else return "Default";
  }

  const createDiv = (
    albumshort: string,
    released: string,
    count: string | null,
    alb: string | null,
    album: string,
  ) => {
    const keySuffix =
      (released !== null ? `-${released}` : "") +
      (count !== null ? `-${count}` : "");

    return (
      <section aria-label={`${albumshort}`} key={`${albumshort}${keySuffix}`}>
        <AlbumHeader alb={alb} albumshort={albumshort} album={album} released={released} />
        {props.data
          .filter((item) => item.albumshort === albumshort)
          .map((filteredItem) => (
            <div
              className="mb-1 flex bg-white rounded-full transition-height duration-600 ease-in pb-1 overflow-hidden"
              key={`${filteredItem.song}${keySuffix}`}
            >
              <div className="flex items-center justify-center h-auto w-1/3 min-w-1/3 px-4">
                <div className="text-center">{filteredItem.song}</div>
              </div>
              <div className="flex w-2/3 px-2 overflow-x-auto">
                {filteredItem.writers
                  .split(",")
                  .reverse()
                  .map((writer, index) => (
                    <div className="w-auto h-8 hover:h-48 focus:h-48 transition-height duration-300 ease-in-out">
                      <div
                        className={`bg-${getColor(
                          writer
                        )} min-w-max inline-block mr-2 px-2 py-1 text-center text-black bg-transparent border border-transparent rounded-full text-xs`}
                      >
                        {writer}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </section>
    );
  };

  // Get unique album and song combinations
  const uniqueAlbums = [
    ...new Set(
      props.data.map(
        (item) =>
          `${item.albumshort}_${item.released}_${item.totalwriters}_${item.alb}_${item.album}`
      )
    ),
  ];

  // Sorting function based on release date
  const sortFunction = (a: string, b: string) => {
    let [albumshortA, releasedAString] = a.split("_");
    let [albumshortB, releasedBString] = b.split("_");

    let releasedA = releasedAString.split(',')[0]
    let releasedB = releasedBString.split(',')[0]

    releasedA = releasedA === "null" ? "5000" : releasedA;
    releasedB = releasedB === "null" ? "5000" : releasedB;

    const releasedNumberA = parseInt(releasedA, 10);
    const releasedNumberB = parseInt(releasedB, 10);

    if (sortOrder === "asc") {
      return releasedNumberA - releasedNumberB;
    } else {
      return releasedNumberB - releasedNumberA;
    }
  };

  // Sort uniqueAlbums based on release date
  const sortedUniqueAlbums = uniqueAlbums.sort(sortFunction);
  // Render div elements for each unique album and song combination
  const result = sortedUniqueAlbums.map((combination) => {
    const [albumshort, released, count, alb, album] = combination.split("_");

    return createDiv(albumshort, released, count, alb, album);
  });

  // Toggle sorting order when the button is clicked
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <main className="p-4">
      <button onClick={toggleSortOrder}>Toggle Sort Order</button>
      {result}
    </main>
  );
}

export default Jukebox;
