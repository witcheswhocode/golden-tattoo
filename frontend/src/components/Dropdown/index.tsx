import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import CustomButton from "../Button";

interface DropdownProps {
  theme: string;
  items: DropdownItem[];
  handleThemeChange: (value: string) => void;
}

export type DropdownItem = {
  value: string;
};

export default function Dropdown(props: DropdownProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItems = props.items;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: string) => {
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
      <CustomButton type="button" onClick={toggleDropdown} text={props.theme} />

      {isOpen && (
        <div
          className={`\absolute mt-2 w-56 bg-${theme}-button shadow-md z-50
        `}
        >
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
