import React, { useEffect, useState } from "react";
import Jukebox from "./components/Jukebox";
import { WritersProps } from "./components/Jukebox";

function Writers() {
  const [writerData, setWriterData] = useState<WritersProps[] | null>(null);

  useEffect(() => {
    const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com/"
      : "http://localhost:3001/";

    fetch(`${apiUrl}getWriters`)
      .then((response) => response.json())
      .then((data) => setWriterData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="p-4">{writerData && <Jukebox data={writerData} />}</main>
  );
}

export default Writers;
