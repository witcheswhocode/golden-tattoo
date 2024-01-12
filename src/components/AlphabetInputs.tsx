import React, { useState, useEffect } from "react";

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[]) => void;
  inputValues: { [key: string]: number };
  setInputValues: (value: { [key: string]: number | any }) => void;
}

const AlphabetInputs: React.FC<AlphabetInputProps> = ({
  inputValues,
  handleCombinationPossibilities,
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
    const urlWithParams = `http://localhost:3001/getAllCombinations?${params.toString()}`;

    // Perform the fetch with the updated URL
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) =>
        handleCombinationPossibilities(data.data.combinationList)
      )
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  useEffect(() => {
    setInputValues({
      a: "2",
      b: "2",
      c: "2",
      d: "2",
      e: "2",
      f: "2",
      g: "2",
      h: "2",
      i: "2",
      j: "2",
      k: "2",
      l: "2",
      m: "2",
      n: "2",
      o: "2",
      p: "2",
      q: "2",
      r: "2",
      s: "2",
      t: "2",
      u: "2",
      v: "2",
      w: "2",
      x: "2",
      y: "2",
      z: "2",
    });
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4 bg-red">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <div key={letter} className="flex flex-col items-center">
              <label htmlFor={letter} className="mb-1">
                {letter}
              </label>
              <input
                type="text"
                id={letter}
                name={letter}
                onChange={handleInputChange}
                value={inputValues[letter] || ""}
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
};

export default AlphabetInputs;
