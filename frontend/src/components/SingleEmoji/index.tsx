import { useTheme } from "src/components/ThemeContext";

export default function SingleEmoji(props: any) {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center">
      <span className={`${theme}-single-emoji`} />
    </div>
  );
}
