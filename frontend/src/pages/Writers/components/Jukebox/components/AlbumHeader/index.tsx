import AlbumArt from "./AlbumArt";
import AlbumInfo from "./AlbumInfo";
import { useTheme } from "src/components/ThemeContext";

export interface AlbumHeaderProps {
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

function AlbumHeader(props: AlbumHeaderProps) {
  const {theme} = useTheme();
  return (
    <div className={`h-auto p-2 flex mb-3 bg-${theme}-panel`}>
      <AlbumArt alb={props.alb} />
      <AlbumInfo
        alb={props.alb}
        albumshort={props.albumshort}
        album={props.album}
        released={props.released}
        totalwriters={props.totalwriters}
        totalselfwritten={props.totalselfwritten}
        apple={props.apple}
        spotify={props.spotify}
        other={props.other}
      />
    </div>
  );
}

export default AlbumHeader;
