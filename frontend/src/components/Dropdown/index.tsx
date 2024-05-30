import React, { useState, useRef, useEffect } from "react";

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
        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
        onClick={toggleDropdown}
      >
        {selectedValue || props.theme}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-56 bg-white shadow-md z-10">
          {dropdownItems.map((item, index) => (
            <div key={item.value} className="mb-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
