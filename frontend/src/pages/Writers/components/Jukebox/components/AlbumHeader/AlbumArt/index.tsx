import React, { useState } from "react";

export interface AlbumArtProps {
  alb: string | null;
}

function AlbumArt(props: AlbumArtProps) {
  return (
      <img
        className="h-32 w-auto object-fill"
        loading="lazy"
        src={`assets/albums/${props.alb ? props.alb : '_1989'}.png`}
        alt="Album Image"
      />
  );
}

export default AlbumArt;
