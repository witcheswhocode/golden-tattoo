import React, { useState, useEffect, useRef } from 'react';

interface LocationSearchProps {
  data: {
    id: number;
    name: string;
    children: { id: number; name: string }[];
  }[];
} 

const LocationSearch: React.FC<LocationSearchProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedItem === null || selectedItem === filteredData.length - 1) {
        setSelectedItem(0);
      } else {
        setSelectedItem(selectedItem + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedItem === null || selectedItem === 0) {
        setSelectedItem(filteredData.length - 1);
      } else {
        setSelectedItem(selectedItem - 1);
      } 
    } else if (e.key === 'Enter') {
      if (selectedItem !== null) {
        handleSelectItem(filteredData[selectedItem]);
      }
    }
  };

  const handleSelectItem = (item: { id: number; name: string; children: { id: number; name: string }[] }) => {
    setSearchTerm(item.name);
    setIsOpen(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.children.some((child) => child.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filterLocation = (item: { name: string; children: { name: string }[] }) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsOpen(false);
    } else {
      setIsOpen(true); // Open the dropdown when there's input
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <span onClick={toggleDropdown} className="absolute right-2 top-2 cursor-pointer">
        &#9660;
      </span>
      {isOpen && searchTerm && (
        <div className="border mt-2 rounded-lg">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`p-2 ${selectedItem === index ? 'bg-blue-100' : ''}`}
              onClick={() => handleSelectItem(item)}
            >
              <div className="font-semibold">{item.name}</div>
              <ul>
                
              {item.children.filter((child:any) => filterLocation(child)).map((child) => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
