import AlbumArt from "./AlbumArt";
import AlbumInfo from "./AlbumInfo";

export interface AlbumHeaderProps {
  alb: string | null;
  albumshort: string;
  album: string;
  released: string;
}

function AlbumHeader(props: AlbumHeaderProps) {
  return (
    <div className="mb-10 px-4 pt-8 border-2 border-solid border-black border-b-10">
      <AlbumArt alb={props.alb} />
      <AlbumInfo
        alb={props.alb}
        albumshort={props.albumshort}
        album={props.album}
        released={props.released}
      />
    </div>
  );
}

export default AlbumHeader;
