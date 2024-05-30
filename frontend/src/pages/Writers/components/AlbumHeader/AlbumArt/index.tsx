import React, { useState } from "react";

export interface AlbumArtProps {
  alb: string | null;
}

function AlbumArt(props: AlbumArtProps) {
  return (
    <div className="flex m-0.5 justify-left items-center w-1/3 relative">
      <img
        className="h-full w-auto object-fill"
        loading="lazy"
        src={`assets/albums/${props.alb}.png`}
        alt="Album Image"
      />
    </div>
  );
}

export default AlbumArt;
