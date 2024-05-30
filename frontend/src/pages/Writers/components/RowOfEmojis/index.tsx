import { useTheme } from "src/components/ThemeContext";

export default function RowOfEmojis(props: any) {
  const { theme } = useTheme();
  return (
    <div className="overflow-hidden whitespace-nowrap flex justify-center items-center my-5">
      <span className={`${theme}-rowof-emoji`} />
      <span className={`${theme}-rowof-emoji`} />
      <span className={`${theme}-rowof-emoji`} />
    </div>
  );
}
