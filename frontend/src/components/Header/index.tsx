import React from "react";
import { useTheme } from "../ThemeContext";
import Curtains from "../Curtains";

interface HeaderProps {
  // Define any props you want to pass to the Header component
}

function Header(props: HeaderProps) {
  const { theme } = useTheme();
  const themeClass = `data-theme="${theme}"`;

  return (
    <header className={`my-2 p-4 w-full h-32 ${themeClass}`}>
      <div
        className={`md:w-2/3 lg:w-1/2 md:mx-auto h-full relative flex justify-center font-monoton text-custom-gray ${
          theme === "midnights" ? "text-3xl" : "text-4xl"
        } text-justify`}
      >
        {theme === "ttpd" ? (
          <Curtains />
        ) : (
          <div className="relative w-full h-full flex justify-center items-center">
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
            <div
              className={`absolute flex justify-center items-center w-full ${
                theme === "midnights" ? "" : "hidden"
              }`}
            >
              {/* Moon image */}
              <div className="absolute mb-6 h-24 w-24 shadow-custom-light rounded-full z-10 bg-center bg-cover midnights-moon animate-animating-bloodmoon-properties">
                {/* Background with gradient */}
                <div className="absolute inset-0 rounded-full bloodmoon-gradient animate-bloodmoon-animation"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
