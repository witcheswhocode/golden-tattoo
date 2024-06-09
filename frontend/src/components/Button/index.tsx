import React from "react";
import { useTheme } from "../ThemeContext";

interface ButtonProps {
  text: string;
  key?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  href,
  disabled,
  ...rest
}) => {
  const { theme } = useTheme();

  const commonClasses = `
    flex
    justify-center
    items-center
    bg-${theme}-button
    border-r-2 border-b-2 border-gray-500 border-r-outset border-b-outset
    hover:border-t-2 hover:border-l-2 hover:border-gray-500 hover:border-outset hover:text-gray-500
    rounded-md
    box-border
    p-1
    w-12
    text-${theme}-buttonText
    cursor-pointer
    text-sm
    text-center
    whitespace-nowrap
    tap-highlight-transparent
  `;

  if (href) {
    return (
      <a
        href={href}
        className={commonClasses}
        {...rest}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      className={commonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};

export default CustomButton;
