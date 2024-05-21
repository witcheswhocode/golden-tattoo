import React, { useState, useEffect } from "react";

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[]) => void;
  handleMostLetterCombinationPossibilities: (value: string[][]) => void;
  handleMostBraceletCombinationPossibilities: (value: string[][]) => void;
  inputValues: { [key: string]: number };
  setInputValues: (value: { [key: string]: number | any }) => void;
}

const AlphabetInputs: React.FC<AlphabetInputProps> = ({
  inputValues,
  handleCombinationPossibilities,
  handleMostLetterCombinationPossibilities,
  handleMostBraceletCombinationPossibilities,
  setInputValues,
}) => {
  //const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Convert inputValues object to URLSearchParams
    const params = new URLSearchParams();

    for (const key in inputValues) {
      const value = inputValues[key].toString().toLowerCase();
      const numericValue = parseFloat(value);

      params.append(
        key.toString().toLowerCase(),
        isNaN(numericValue) ? value : numericValue.toString()
      );
    }

    // Append parameters to the URL
    const urlWithParams = `getAllCombinations?${params.toString()}`;

    // Perform the fetch with the updated URL
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data: any) => {
        handleCombinationPossibilities(data.data.combinationList);
        handleMostLetterCombinationPossibilities(data.data.mostLettersUsed);
        handleMostBraceletCombinationPossibilities(
          data.data.mostBraceletOptions
        );
      })
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  useEffect(() => {
    /*setInputValues({
      a: 10,
      b: 20,
      d: 20,
      i: 2,
      l: 10,
      o: 20,
      p: 2,
      r: 10,
      s: 2,
    });*/

    setInputValues({
      a: 2,
      b: 2,
      c: 2,
      d: 2,
      e: 2,
      f: 2,
      g: 2,
      h: 2,
      i: 2,
      j: 2,
      k: 2,
      l: 2,
      m: 2,
      n: 2,
      o: 2,
      p: 2,
      q: 2,
      r: 2,
      s: 2,
      t: 2,
      u: 2,
      v: 2,
      w: 2,
      x: 2,
      y: 2,
      z: 2,
    });
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4 bg-red">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <div key={letter} className="flex flex-col items-center">
              <label htmlFor={letter} className="mb-1">
                {letter}
              </label>
              <input
                type="text"
                id={letter.toLowerCase()}
                name={letter.toLowerCase()}
                onChange={handleInputChange}
                value={inputValues[letter.toLowerCase()] || ""}
                className="border rounded w-8 h-8 p-2 text-center focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          );
        })}
        <div className="mt-4 w-full">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlphabetInputs;
