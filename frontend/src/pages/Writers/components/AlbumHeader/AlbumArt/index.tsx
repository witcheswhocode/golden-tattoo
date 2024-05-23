import React, { useState } from "react";

export interface AlbumArtProps {
  alb: string | null;
}

function AlbumArt(props: AlbumArtProps) {
  return (
    <div className="flex justify-left items-center m-1 w-1/3 h-full relative">
      <img
        className="w-1/3 h-1/3 object-cover"
        loading="lazy"
        src={`assets/albums/${props.alb}.png`}
        alt="Album Image"
      />
    </div>
  );
}

export default AlbumArt;
