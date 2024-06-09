import React from "react";
import { useTheme } from "../ThemeContext";
import Typewriter from "../Typewriter";
import Curtains from "../Curtains";

interface HeaderProps {
  // Define any props you want to pass to the Header component
}

function Header(props: HeaderProps) {
  const { theme } = useTheme();
  const themeClass = `data-theme="${theme}"`;

  return (
    <header className={`my-2 p-4 h-32 ${themeClass}`}>
      <div className="md:w-2/3 md:mx-auto relative flex justify-center font-monoton text-custom-gray text-2.5xl text-justify">
        {theme === "ttpd" ? (
          <Curtains />
        ) : (
          <span className={`absolute text-${theme}-text font-${theme} z-20`}>
            golden
            <span
              className={`${
                theme === "midnights" ? "" : "hidden"
              } font-${theme}`}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span
              className={`${
                theme === "midnights" ? "" : "hidden"
              } font-${theme}`}
            >
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
          <div className="absolute h-24 w-24 shadow-custom-light rounded-full z-10 bg-center bg-cover midnights-moon animate-animating-bloodmoon-properties">
            {/* Background with gradient */}
            <div className="absolute inset-0 rounded-full bloodmoon-gradient animate-bloodmoon-animation"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
