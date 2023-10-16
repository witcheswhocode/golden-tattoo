import React from 'react';

interface HeaderProps {
  // Define your prop types here
}

function Header(props: HeaderProps) {
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl">My Website</h1>
    </header>
  );
}

export default Header;
