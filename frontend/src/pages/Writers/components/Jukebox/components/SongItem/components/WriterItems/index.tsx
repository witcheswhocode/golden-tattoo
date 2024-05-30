import { useState } from "react";
import { writerDetails } from "../../../../constants";

export default function WriterItems(props: any) {
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
  const [revealedImages, setRevealedImages] = useState(
    new Array(props.writers.split(",").length).fill(false)
  );

  const handleToggleImage = (index: number) => {
    const newRevealedImages = [...revealedImages];
    newRevealedImages[index] = !newRevealedImages[index];
    setRevealedImages(newRevealedImages);
    console.log(`Toggled image at index ${index}, new state:`, newRevealedImages);
  };

  return (
    <div className="writers flex w-full px-2 overflow-hidden">
      {props.writers
        .split(",")
        .reverse()
        .map((writer: any, index: number) => {
          const writerDetail = writerDetails[writer.trim()]; // Use trim to handle any extra spaces around the writer names
          const imgUrl =
            writerDetail?.imgurl ||
            "https://i.pinimg.com/736x/2a/77/a6/2a77a6fb864f2b974952c30270ccf001.jpg"; // Use optional chaining to handle cases where writerDetail might be undefined
          return (
            <div
              key={index}
              className="w-auto h-10 flex flex-col items-center transition-height duration-300 ease-in-out cursor-pointer"
              onClick={() => handleToggleImage(index)}
            >
              <div
                className={`bg-${getColor(
                  writer
                )} min-w-max inline-block mr-2 mb-4 px-2 py-1 text-center text-black bg-transparent border border-transparent rounded-full text-base`}
              >
                {writer}
              </div>
              <div className="w-24 h-24 bg-gray-200 overflow-hidden">
                <img
                  className={`w-24 h-24 object-cover transition-opacity duration-300 ease-in-out ${
                    revealedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  src={imgUrl}
                  alt={writer}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
