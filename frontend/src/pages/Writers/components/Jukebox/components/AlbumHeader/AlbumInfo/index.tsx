import React, { useState } from "react";
import { useTheme } from "src/components/ThemeContext";

export interface AlbumInfoProps {
  alb: string | null;
  albumshort: string;
  album: string;
  released: string;
  totalwriters: string;
  totalselfwritten: string;
  apple: string;
  spotify: string;
  other: string;
}

function AlbumInfo(props: AlbumInfoProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col justify-center items-center overflow-hidden w-full bg-${theme}-panel z-1`}>
      <p className={`text-${theme}-panelTextSecondary text-auto font-bold text-center font-futura`}>{props.album.replace("Taylor's Version", "TV").toUpperCase()}</p>
      <p className={`text-${theme}-panelTextSecondary text-xs m-1 font-futura`}>Released {props.released}</p>
      <p className={`text-${theme}-panelTextSecondary text-xs m-1 font-futura`}>
        {props.totalwriters} Total Writers | {props.totalselfwritten} Taylor
        self wrote
      </p>
      <div className="flex gap-6 my-2">
        <span>
          <a target="_blank" href={props.spotify}>
            <img className="w-6 h-6 object-cover" src={`assets/spotify-${theme}.png`} />
          </a>
        </span>
        <span>
          <a target="_blank" href={props.apple}>
            <img className="w-6 h-6 object-cover" src={`assets/apple-${theme}.png`} />
          </a>
        </span>
        <span>
          <a target="_blank" href={props.other}>
            <img className="w-6 h-6 object-cover" src={`assets/buy-${theme}.png`} />
          </a>
        </span>
      </div>
    </div>
  );
}

export default AlbumInfo;
