import React, { useState } from "react";
import AlbumHeader from "./components/AlbumHeader";
import SongItem from "./components/SongItem";
import RowOfEmojis from "../RowOfEmojis";
import CustomButton from "src/components/Button";
import { useTheme } from "src/components/ThemeContext";
import { useSearch, useNavigate } from "@tanstack/react-router";

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
  const { theme } = useTheme();
  const search = useSearch({ from: "/writers" });
  const navigate = useNavigate();

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

    if (released && released !== "null") {
      return (
        <section
          id="writers-section"
          aria-label={`${albumshort}`}
          key={`${albumshort}${keySuffix}`}
        >
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
          <div className={`z-50 py-4 bg-${theme}-panel`}>
            {props.data
              .filter((item) => item.albumshort === albumshort)
              .map((filteredItem) => (
                <SongItem
                  song={filteredItem.song}
                  writers={filteredItem.writers}
                />
              ))}
          </div>
          <RowOfEmojis />
        </section>
      );
    }
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

    if (search.sortOrder === "asc") {
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
      other,
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
    navigate({
      search: ((prev: any) => {
        const newSortOrder = prev.sortOrder === "asc" ? "desc" : "asc";
        return { ...prev, sortOrder: newSortOrder };
      }) as any,
    });
  };

  return (
    <div className="p-3 m-auto">
      <div className="flex justify-end items-end">
        {" "}
        <CustomButton text={"Sort By Date"} onClick={toggleSortOrder} />
      </div>
      {result}
    </div>
  );
}

export default Jukebox;
