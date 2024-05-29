import React, { useState } from "react";
import AlbumHeader from "../AlbumHeader";
import SongItem from "./components/SongItem";

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
            <SongItem song={filteredItem.song} writers={filteredItem.writers} />
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
