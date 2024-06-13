import React from "react";
import { useTheme } from "../ThemeContext";

interface ButtonProps {
  text: string;
  key?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  selected?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  href,
  disabled,
  selected,
  ...rest
}) => {
  const { theme } = useTheme();

  const commonClasses = `
    flex
    justify-center
    items-center
    bg-${theme}-button
    border-r-2 border-b-2 border-${theme}-buttonBorder border-r-outset border-b-outset
    hover:border-t-2 hover:border-l-2 hover:border-${theme}-buttonBorder hover:border-outset hover:text-${theme}-buttonTextHover
    rounded-md
    box-border
    p-1
    px-2
    mb-2
    w-auto
    text-${theme}-buttonText
    cursor-pointer
    text-sm
    text-center
    whitespace-nowrap
    tap-highlight-transparent
    ${selected === true ? `border-t-2 border-l-2 border-${theme}-buttonBorder border-outset text-${theme}-buttonTextHover` : ``}
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
