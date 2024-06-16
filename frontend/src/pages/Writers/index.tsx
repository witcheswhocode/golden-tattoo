import React, { useEffect, useState } from "react";
import Jukebox from "./components/Jukebox";
import MetaTags from "src/components/MetaTags";
import { WritersProps } from "./components/Jukebox";

function Writers() {
  const [writerData, setWriterData] = useState<WritersProps[] | null>(null);

  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com"
        : "http://localhost:3001";

    fetch(`${apiUrl}/getWriters`)
      .then((response) => response.json())
      .then((data) => setWriterData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 z-10">
      <MetaTags
        title="writers - golden tattoo"
        description="See the writer credits on each Taylor Swift learn more about her history writing her own music."
        image="/assets/lover-meta-img.png"
      />
      <div className="px-2 m-auto">
        <p className="text-sm text-start p-2 my-2">
          Explore the complete list of Taylor's discography and the songwriters
          who contributed to her music. Click on the writers name to see their
          picture.
        </p>
      </div>
      {writerData && <Jukebox data={writerData} />}
    </div>
  );
}

export default Writers;
