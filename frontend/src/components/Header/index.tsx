import React from 'react';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  // Define any props you want to pass to the Header component
}

function Header(props: HeaderProps) {
  const { theme } = useTheme();
  const themeClass = `data-theme="${theme}"`;

  return (
    <header className={`bg-primary text-secondary p-4 ${themeClass}`}>
      <h1 className="text-2xl">My Website</h1>
    </header>
  );
}

export default Header;
