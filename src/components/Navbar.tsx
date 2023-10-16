import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-center"> {/* Updated this line */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:underline text-center"> {/* Added text-center */}
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline text-center"> {/* Added text-center */}
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline text-center"> {/* Added text-center */}
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
