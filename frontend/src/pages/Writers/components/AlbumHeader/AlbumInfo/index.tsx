import React, { useState } from "react";

export interface AlbumInfoProps {
  alb: string | null;
  albumshort: string;
  album: string;
  released: string;
}

function AlbumInfo(props: AlbumInfoProps) {
  return (
    <div className="album-text">
      <p className="album">{props.album.replace("Taylor's Version", "TV")}</p>
      <p className="p-small">Released {props.released}</p>
      <p className="p-small">
        ' + totalwriters + " Total Writers | " + totalselfwritten + ' Taylor
        self wrote
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
