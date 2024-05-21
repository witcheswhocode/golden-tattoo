import React from 'react';

interface HeaderProps {
  theme: string
}

function Header(props: HeaderProps) {
  console.log(`bg-${props.theme}Background`)
  return (
    <header className={`bg-${props.theme}-backgroundColor text-white p-4`}>
      <h1 className={`text-${props.theme}-main text-2xl`}>My Website</h1>
    </header>
  );
}

export default Header;
