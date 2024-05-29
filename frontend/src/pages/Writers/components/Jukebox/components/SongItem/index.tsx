import React from "react";
import { writerDetails } from "../../constants";
import SongName from "./components/SongName";

export interface SongItemProps {
  song: string;
  writers: string;
}

function SongItem(props: SongItemProps) {
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
  return (
    <div
      className="mb-1 flex bg-white rounded-lg hover:rounded-none transition-all duration-600 ease-in pb-1 overflow-hidden"
      key={`${props.song}`}
    >
      <SongName song={props.song} />
      <div className="writers flex w-full px-2 overflow-x-auto overflow-y-hidden">
        {props.writers
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
                className="w-auto h-10 flex flex-col items-center hover:h-40 focus:h-40 transition-height duration-300 ease-in-out"
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
                    <span className="text-gray-500">No Image Available</span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SongItem;
