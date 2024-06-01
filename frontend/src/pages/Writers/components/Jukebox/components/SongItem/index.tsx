import React, { useState, useEffect, useRef } from "react";
import SongName from "./components/SongName";
import WriterItems from "./components/WriterItems";

export interface SongItemProps {
  song: string;
  writers: string;
}

function SongItem(props: SongItemProps) {
  const [isHeightIncreased, setIsHeightIncreased] = useState(false);

  return (
    <div
      className={`bg-white mb-1 flex mx-auto p-1 mt-2 w-11/12 overflow-hidden ${
        isHeightIncreased
          ? "rounded-lg transition-border-radius  ease-in"
          : "rounded-full transition-border-radius ease-out"
      }`}
      key={`${props.song}`}
    >
      <SongName song={props.song} />

      <WriterItems
        writers={props.writers}
        setIsHeightIncreased={setIsHeightIncreased}
      />
    </div>
  );
}

export default SongItem;
