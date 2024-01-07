import React from 'react';

interface HeaderProps {
  theme: string
}

function Header(props: HeaderProps) {
  console.log(`bg-${props.theme}-main`)
  return (
    <header className={`bg-[${props.theme}-main] text-white p-4`}>
      <h1 className={`text-${props.theme}-secondary text-2xl`}>My Website</h1>
    </header>
  );
}

export default Header;
