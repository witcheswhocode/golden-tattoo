import React, { useState } from "react";

export interface AlbumInfoProps {
  alb: string | null;
  albumshort: string;
  album: string;
  released: string;
  totalwriters: string;
  totalselfwritten: string;
}

function AlbumInfo(props: AlbumInfoProps) {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden w-2/3">
      <p className="album">{props.album.replace("Taylor's Version", "TV")}</p>
      <p className="p-small">Released {props.released}</p>
      <p className="p-small">
        {props.totalwriters} Total Writers | {props.totalselfwritten} Taylor self wrote
      </p>
      <div id="album-links">
        <span>
          <a
            target="_blank"
            href="' +
                d.spotify +
                '"
          >
            <img className="img-spotify" />
          </a>
        </span>
        <span>
          <a
            target="_blank"
            href="' +
                d.apple +
                '"
          >
            <img className="img-apple" />
          </a>
        </span>
        <span>
          <a
            target="_blank"
            href="' +
                d.other +
                '"
          >
            <img className="img-shop" />
          </a>
        </span>
      </div>
    </div>
  );
}

export default AlbumInfo;
