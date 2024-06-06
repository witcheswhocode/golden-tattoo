import React from "react";
import { useTheme } from "../ThemeContext";
import SingleEmoji from "../SingleEmoji";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <nav className="p-4 text-white">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/bracelets"
              className={({ isActive }) =>
                `hover:underline text-center text-${theme}-text font-${theme} ${isActive ? 'underline' : ''}`
              }
            >
              bracelets
            </NavLink>
          </li>
          <SingleEmoji />
          <li>
            <NavLink
              to="/lyrics"
              className={({ isActive }) =>
                `hover:underline text-center text-${theme}-text font-${theme} ${isActive ? 'underline' : ''}`
              }
            >
              lyrics
            </NavLink>
          </li>
          <SingleEmoji />
          <li>
            <NavLink
              to="/writers"
              className={({ isActive }) =>
                `hover:underline text-center text-${theme}-text font-${theme} ${isActive ? 'underline' : ''}`
              }
            >
              writers
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;