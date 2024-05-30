import React, { useState } from "react";

export interface AlbumArtProps {
  alb: string | null;
}

function AlbumArt(props: AlbumArtProps) {
  return (
      <img
        className="h-full w-auto object-fill"
        loading="lazy"
        src={`assets/albums/${props.alb}.png`}
        alt="Album Image"
      />
  );
}

export default AlbumArt;
