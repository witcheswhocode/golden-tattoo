import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 text-white">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <a href="/bracelets" className="hover:underline text-center"> 
              Bracelets
            </a>
          </li>
          <li>
            <a href="/lyrics" className="hover:underline text-center"> 
              Lyrics
            </a>
          </li>
          <li>
            <a href="/writers" className="hover:underline text-center"> 
              Writers
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
