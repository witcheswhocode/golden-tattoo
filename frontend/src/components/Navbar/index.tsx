import React from "react";
import { useTheme } from "../ThemeContext";
import SingleEmoji from "../SingleEmoji";
import { Link } from "@tanstack/react-router";

const Navbar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <nav className="mt-2 p-4 text-white z-10">
      <div className={`container mx-auto flex justify-center ${theme === "ttpd" ? `bg-ttpd-background z-5 border-t-2 border-b-2 border-${theme}-tableBorder`:''}`}>
        <ul className="flex space-x-2">
          <SingleEmoji />
          <li>
            <Link
              to="/bracelets"
              className={`hover:underline text-center text-${theme}-text font-${theme}`}
              activeProps={{
                className: `hover:underline text-center text-${theme}-text font-${theme} underline`,
              }}
            >
              bracelets
            </Link>
          </li>
          <SingleEmoji />
          <li>
            <Link
              to="/lyrics"
              className={`hover:underline text-center text-${theme}-text font-${theme}`}
              activeProps={{
                className: `hover:underline text-center text-${theme}-text font-${theme} underline`,
              }}
            >
              lyrics
            </Link>
          </li>
          <SingleEmoji />
          <li>
            <Link
              to="/writers"
              className={`hover:underline text-center text-${theme}-text font-${theme}`}
              activeProps={{
                className: `hover:underline text-center text-${theme}-text font-${theme} underline`,
              }}
            >
              writers
            </Link>
          </li>
          <SingleEmoji />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
