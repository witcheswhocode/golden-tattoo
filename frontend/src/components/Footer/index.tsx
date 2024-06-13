import { useTheme } from "../ThemeContext";

interface FooterProps {}

function Footer(props: FooterProps) {
  const { theme } = useTheme();
  return (
    <footer className={`m-auto text-${theme}-text p-4 px-8 md:w-2/3 lg:w-1/2`}>
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
            Liz Anderson
          </a>{" "}
          with the input of many more,{" "}
          <a className="internal" href="#about">
            learn more about this project.
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
