export default function SongName(props: any) {

  return (
    <div
      className="flex items-center justify-start w-5/12 text-md cursor-pointer scroll-horizontal"
    >
      <span className="pl-2 align-middle">{props.song}</span>
    </div>
  );
}
