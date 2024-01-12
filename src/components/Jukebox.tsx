import { release } from "os";
import React, { useEffect, useState } from "react";

export interface WritersProps {
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
}

export interface WritersData {
  data: WritersProps[];
}

function Jukebox(props: WritersData) {
  const [writerData, setWriterData] = useState<WritersProps[] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track sorting order

  const createDiv = (albumshort: string, released: number) => (
    <div key={`${albumshort}`}>
      <div className="text-center text-xl">{`${albumshort}`}</div>
      {props.data
        .filter((item) => item.albumshort === albumshort)
        .map((filteredItem) => (
          <div className="flex">
            <div className="text-m" key={`${filteredItem.song}`}>
              {filteredItem.song}
            </div>
            <div className="flex">
              {filteredItem.writers
                .split(",")
                .reverse()
                .map((writer) => (
                  <div key={writer}>{writer}</div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );

  // Get unique album and song combinations
  const uniqueAlbums = [
    ...new Set(props.data.map((item) => `${item.albumshort}_${item.released}`)),
  ];

  // Sorting function based on release date
  const sortFunction = (a: string, b: string) => {
    console.log(a,b);
    let [albumshortA, releasedA] = a.split("_");
    let [albumshortB, releasedB] = b.split("_");

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
    const [albumshort, released] = combination.split("_");
    const releasedNumber = released === 'NaN' ? parseInt(released, 10) : 5000;


    return createDiv(albumshort, releasedNumber);
  });

  useEffect(() => {
    fetch("http://localhost:3001/getWriters")
      .then((response) => response.json())
      .then((data) => setWriterData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
