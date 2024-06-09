import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

interface DropdownProps {
  theme: string;
  items: DropdownItem[];
  handleThemeChange: (value: string) => void;
}

// Define the dropdown item type
export type DropdownItem = {
  value: string;
};
type DropdownItemArray = DropdownItem[];

// Dropdown component
export default function Dropdown(props: DropdownProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownItems, setDropdownItems] = useState<DropdownItemArray>(
    props.items
  );
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    props.handleThemeChange(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        className={`inline-flex justify-center items-center px-2 py-1 border border-${theme}-border text-sm leading-5 font-medium rounded-md text-${theme}-buttonText bg-${theme}-button hover:text-gray-500 focus:outline-none focus:border-${theme} focus:shadow-outline-${theme}-border active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
        onClick={toggleDropdown}
      >
        {selectedValue || props.theme}
      </button>

      {isOpen && (
        <div className={`\absolute mt-2 w-56 bg-${theme}-button shadow-md z-50
        `}>
          {dropdownItems.map((item, index) => (
            <div key={item.value} className="mb-1">
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-${theme}-buttonText hover:bg-gray-100 hover:text-gray-900`}
                onClick={() => handleItemClick(item.value)}
              >
                {item.value}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
