import AlbumArt from "./AlbumArt";
import AlbumInfo from "./AlbumInfo";

export interface AlbumHeaderProps {
  alb: string | null;
  albumshort: string;
  album: string;
  released: string;
  totalwriters: string;
  totalselfwritten: string;
}

function AlbumHeader(props: AlbumHeaderProps) {
  return (
    <div className="w-full h-[150px] flex mb-10 px-4 border-2 border-solid border-black border-b-10">
      <AlbumArt alb={props.alb} />
      <AlbumInfo
        alb={props.alb}
        albumshort={props.albumshort}
        album={props.album}
        released={props.released}
        totalwriters={props.totalwriters}
        totalselfwritten={props.totalselfwritten}
      />
    </div>
  );
}

export default AlbumHeader;
