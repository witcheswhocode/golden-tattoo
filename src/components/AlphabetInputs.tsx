import React, { useState } from 'react';

function AlphabetInputs() {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  //const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M/W','N','O','P','Q','R','S','T','U','V','X','Y','Z']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    // Perform any action you want when the user clicks the submit button
    console.log(inputValues);
  };


  return (
    <div className="container mx-auto mt-8 p-4 bg-red">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <div key={letter} className="flex flex-col items-center">
              <label htmlFor={letter} className="mb-1">{letter}</label>
              <input
                type="text"
                id={letter}
                name={letter}
                onChange={handleInputChange}
                value={inputValues[letter] || ''}
                className="border rounded w-12 p-2 text-center focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AlphabetInputs;
