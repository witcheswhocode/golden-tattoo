import { useState } from "react";
import { writerDetails } from "../../../../constants";

export default function WriterItems(props: any) {
  const listOfProminentWriters = [
    "Taylor Swift",
    "Liz Rose",
    "Jack Antonoff",
    "Max Martin",
    "Shellback",
    "Aaron Dessner",
    "Joe Alwyn",
  ];

  function getColor(writer: string) {
    if (listOfProminentWriters.includes(writer)) {
      return writer.replaceAll(" ", "");
    } else return "Default";
  }

  const [revealeImages, setRevealeImages] = useState(false);

  const handleToggleImage = () => {
    setRevealeImages(!revealeImages);
    console.log(`Toggled images, new state: ${revealeImages}`);
  };

  return (
    <div
      className="scroll-horizontal flex-grow w-full px-2 mb-0"
      onClick={() => handleToggleImage()}
    >
      <div className="flex">
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
                className={`w-auto flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer ${
                  revealeImages ? "h-40" : "h-10"
                }`}
              >
                <div
                  className={`bg-${getColor(
                    writer
                  )} min-w-max inline-block mr-2 mb-4 px-2 py-1 text-center text-black bg-transparent border border-transparent rounded-full text-base`}
                >
                  {writer}
                </div>
                <div className={`w-24 h-24 overflow-hidden`}>
                  <img
                    className="w-24 h-24 object-cover"
                    loading="lazy"
                    src={imgUrl}
                    alt={writer}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
