import { useTheme } from "../ThemeContext";

interface FooterProps {}

function Footer(props: FooterProps) {
  const { theme } = useTheme();
  return (
    <footer
      className={`m-auto text-${theme}-text p-4 md:w-2/3`}
    >
      <div className="flex flex-col justify-start items-start gap-2">
        <p>Have suggestions or comments? Give your feedback here.</p>

        <p>
          This was created by Liz Anderson with the input of many more, learn
          more about this project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
