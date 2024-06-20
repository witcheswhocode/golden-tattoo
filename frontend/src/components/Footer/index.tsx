import { useTheme } from "../ThemeContext";

interface FooterProps {}

function Footer(props: FooterProps) {
  const { theme } = useTheme();
  return (
    <footer
      className={`w-80% m-auto mt-4 pb-20 text-sm text-${theme}-text p-4 md:w-2/3 lg:w-1/2 z-90`}
    >
      <div className="flex flex-col justify-start items-start gap-2">
        <p>
          Have suggestions or comments?{" "}
          <a
            target="_blank"
            href="https://forms.gle/ycZYm5YwaNam5yrp7"
            className={`underline text-${theme}-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            Give your feedback here.
          </a>{" "}
        </p>
        <p>
          This was created by{" "}
          <a
            target="_blank"
            href="https://liz-anderson-portfolio.webflow.io/"
            className={`underline text-${theme}-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            liz
          </a>{" "}
          with the input of many more,{" "}
          <a
            className={`internal underline text-${theme}-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
            href="/about"
          >
            learn more about this project.
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
