import React from "react";
import SongName from "./components/SongName";
import WriterItems from "./components/WriterItems";

export interface SongItemProps {
  song: string;
  writers: string;
}

function SongItem(props: SongItemProps) {
  return (
    <div
      className="mb-1 flex mx-auto container bg-white rounded-lg hover:rounded-none transition-all duration-600 ease-in pb-1 overflow-hidden"
      key={`${props.song}`}
    >
      <SongName song={props.song} />

      <WriterItems writers={props.writers} />
    </div>
  );
}

export default SongItem;
