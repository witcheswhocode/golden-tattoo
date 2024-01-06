import React, { useState, useRef, useEffect } from "react";

// Define the dropdown item type
type DropdownItem = {
  value: string;
  label: string;
};

// Dropdown component
export const Dropdown: React.FC<{ items: DropdownItem[], theme: string, 
    handleThemeChange: (value: string) => void; }> = ({ items, theme, handleThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    handleThemeChange(value)
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
    <div className="flex" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
        onClick={toggleDropdown}
      >
        {selectedValue || theme}
      </button>

      {isOpen && (
        <div className="inline-flex mt-2 w-56">
          {items.map((item) => (
            <a
              key={item.value}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleItemClick(item.value)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
