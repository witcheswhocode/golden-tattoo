import React from "react";
import { useTheme } from "../ThemeContext";
import SingleEmoji from "../SingleEmoji";

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  return (
    <nav className="p-4 text-white">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <a
              href="/bracelets"
              className={`hover:underline text-center text-${theme}-text`}
            >
              bracelets
            </a>
          </li>
          <SingleEmoji />
          <li>
            <a
              href="/lyrics"
              className={`hover:underline text-center text-${theme}-text`}
            >
              lyrics
            </a>
          </li>
          <SingleEmoji />
          <li>
            <a
              href="/writers"
              className={`hover:underline text-center text-${theme}-text`}
            >
              writers
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
