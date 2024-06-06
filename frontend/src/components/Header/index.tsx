import React from "react";
import { useTheme } from "../ThemeContext";
import Typewriter from "../Typewriter";

interface HeaderProps {
  // Define any props you want to pass to the Header component
}

function Header(props: HeaderProps) {
  const { theme } = useTheme();
  const themeClass = `data-theme="${theme}"`;

  return (
    <header className={`p-4 h-36 ${themeClass}`}>
      <div
        className="relative flex justify-center font-monoton text-custom-gray text-2.5xl text-justify mt-4"
      >
        {theme === "theme" ? (
          <Typewriter text={"golden tattoo"} />
        ) : (
          <span className={`absolute text-${theme}-text font-${theme} z-20`}>
            golden
            <span className={`${theme === "midnights" ? "" : "hidden"} font-${theme}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span className={`${theme === "midnights" ? "" : "hidden"} font-${theme}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            tattoo
          </span>
        )}
        <div
          className={`absolute flex justify-center items-center w-full p-4 ${
            theme === "midnights" ? "" : "hidden"
          }`}
        >
          {/* Moon image */}
          <div className="absolute h-24 w-24 shadow-custom-light rounded-full z-10 bg-center bg-cover midnights-moon animate-animating-multiple-properties">
            {/* Background with gradient */}
            <div className="absolute inset-0 rounded-full bg-bloodmoon-gradient"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
