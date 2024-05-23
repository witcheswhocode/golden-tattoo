import React, { useState } from "react";

export interface AlbumArtProps {
  alb: string | null;
}

function AlbumArt(props: AlbumArtProps) {
  return (
      <img
        className="m-1"
        loading="lazy"
        src={`assets/albums/${props.alb}.png`}
        alt="Album Image"
      />
  );
}

export default AlbumArt;
