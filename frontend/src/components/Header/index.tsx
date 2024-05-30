import React from "react";
import { useTheme } from "../ThemeContext";

interface HeaderProps {
  // Define any props you want to pass to the Header component
}

function Header(props: HeaderProps) {
  const { theme } = useTheme();
  const themeClass = `data-theme="${theme}"`;

  return (
    <header className={`bg-primary text-secondary p-4 ${themeClass}`}>
      <div
        id="header-box-container"
        className="relative flex justify-center font-monoton text-custom-gray text-2.5xl text-justify mt-4"
      >
        <div id="header-box"></div>
        <span id="head-text" className="text-white">
          golden
          <span className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> tattoo
        </span>
        <div className={`relative flex justify-center items-center ${theme === 'midnights' ? '' : 'hidden'}`}>
          {/* Moon image */}
          <div className="absolute h-24 w-24 shadow-custom-light rounded-full z-[-2] bg-center bg-cover midnights-moon animate-animating-multiple-properties">
            {/* Background with gradient */}
            <div className="absolute inset-0 rounded-full bg-bloodmoon-gradient"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
