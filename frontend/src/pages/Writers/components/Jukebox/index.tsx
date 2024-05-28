import React, { useState } from "react";
import AlbumHeader from "../AlbumHeader";
import { writerDetails } from "./constants";

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
    totalwriters: string,
    totalselfwritten: string,
    apple: string,
    spotify: string,
    other: string
  ) => {
    const keySuffix =
      (released !== null ? `-${released}` : "") +
      (count !== null ? `-${count}` : "");

    return (
      <section aria-label={`${albumshort}`} key={`${albumshort}${keySuffix}`}>
        <AlbumHeader
          alb={alb}
          albumshort={albumshort}
          album={album}
          released={released}
          totalwriters={totalwriters}
          totalselfwritten={totalselfwritten}
          apple={apple}
          spotify={spotify}
          other={other}
        />
        {props.data
          .filter((item) => item.albumshort === albumshort)
          .map((filteredItem) => (
            <div
              className="mb-1 flex bg-white rounded-lg hover:rounded-none transition-all duration-600 ease-in pb-1 overflow-hidden"
              key={`${filteredItem.song}${keySuffix}`}
            >
              <div className="w-32 overflow-hidden whitespace-nowrap hover:w-64 focus:w-64 transition-width duration-300 ease-in-out">
                <div className="text-center">{filteredItem.song}</div>
              </div>
              <div className="writers flex w-full px-2 overflow-x-auto overflow-y-hidden">
                {filteredItem.writers
                  .split(",")
                  .reverse()
                  .map((writer, index) => {
                    const writerDetail = writerDetails[writer.trim()]; // Use trim to handle any extra spaces around the writer names
                    const imgUrl =
                      writerDetail?.imgurl ||
                      "https://i.pinimg.com/736x/2a/77/a6/2a77a6fb864f2b974952c30270ccf001.jpg"; // Use optional chaining to handle cases where writerDetail might be undefined
                    return (
                      <div
                        key={index}
                        className="w-auto h-8 flex flex-col items-center hover:h-48 focus:h-48 transition-height duration-300 ease-in-out"
                      >
                        <div
                          className={`bg-${getColor(
                            writer
                          )} min-w-max inline-block mr-2 mb-4 px-2 py-1 text-center text-black bg-transparent border border-transparent rounded-full text-base`}
                        >
                          {writer}
                        </div>
                        <div className="w-24 h-24 bg-gray-200">
                          {imgUrl ? (
                            <img
                              className="w-24 h-24 object-cover"
                              loading="lazy"
                              src={imgUrl}
                              alt={writer}
                            />
                          ) : (
                            <span className="text-gray-500">
                              No Image Available
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
          `${item.albumshort}_${item.released}_${item.totalwriters}_${item.alb}_${item.album}_${item.totalwriters}_${item.totalselfwritten}_${item.apple}_${item.spotify}_${item.other}`
      )
    ),
  ];

  // Sorting function based on release date
  const sortFunction = (a: string, b: string) => {
    let [albumshortA, releasedAString] = a.split("_");
    let [albumshortB, releasedBString] = b.split("_");

    let releasedA = releasedAString.split(",")[0];
    let releasedB = releasedBString.split(",")[0];

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
    const [
      albumshort,
      released,
      count,
      alb,
      album,
      totalwriters,
      totalselfwritten,
      apple,
      spotify,
      other
    ] = combination.split("_");

    return createDiv(
      albumshort,
      released,
      count,
      alb,
      album,
      totalwriters,
      totalselfwritten,
      apple,
      spotify,
      other
    );
  });

  // Toggle sorting order when the button is clicked
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-4 w-full m-auto lg:w-2/3">
      <button onClick={toggleSortOrder}>Toggle Sort Order</button>
      {result}
    </div>
  );
}

export default Jukebox;
