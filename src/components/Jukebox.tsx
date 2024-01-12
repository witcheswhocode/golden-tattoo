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

  const createDiv = (albumshort: string) => (
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
    ...new Set(props.data.map((item) => `${item.albumshort}`)),
  ];

  // Render div elements for each unique album and song combination
  const result = uniqueAlbums.map((combination) => {
    const [albumshort] = combination.split("-");
    return createDiv(albumshort);
  });

  useEffect(() => {
    fetch("http://localhost:3001/getWriters")
      .then((response) => response.json())
      .then((data) => setWriterData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <main className="p-4">{result}</main>;
}

export default Jukebox;
