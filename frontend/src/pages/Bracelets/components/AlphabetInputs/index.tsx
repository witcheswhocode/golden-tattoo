import React, { useState, useEffect } from "react";
import { useTheme } from "src/components/ThemeContext";

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[] | null) => void;
  handleMostLetterCombinationPossibilities: (value: string[][]) => void;
  handleMostBraceletCombinationPossibilities: (value: string[][]) => void;
  inputValues: { [key: string]: number };
  setInputValues: (value: { [key: string]: number | any }) => void;
  resultsRef: React.RefObject<HTMLDivElement>;
}

const AlphabetInputs: React.FC<AlphabetInputProps> = ({
  inputValues,
  handleCombinationPossibilities,
  handleMostLetterCombinationPossibilities,
  handleMostBraceletCombinationPossibilities,
  setInputValues,
  resultsRef,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { theme } = useTheme();

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

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com/"
        : "http://localhost:3001";

    const urlWithParams = `${apiUrl}/getAllCombinations?${params.toString()}`;

    // Perform the fetch with the updated URL
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data: any) => {
        handleCombinationPossibilities(data.data.combinationList);
        handleMostLetterCombinationPossibilities(data.data.mostLettersUsed);
        handleMostBraceletCombinationPossibilities(
          data.data.mostBraceletOptions
        );
        setIsFormVisible(false); // Hide the form with animation
        setTimeout(() => setIsSubmitted(true), 300); // Wait for the animation to complete before showing the new content

        setTimeout(() => {
          setIsSubmitted(true); // Show the success message and reset button
          if (resultsRef.current) {
            const yOffset = -250; // Adjust the offset value as needed
            const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 300); // Wait for the animation to complete before showing the new content
        })
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  const handleReset = () => {
    handleCombinationPossibilities(null);
    setIsSubmitted(false);

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
    setIsFormVisible(true);
  };

  useEffect(() => {
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
    <div className="container mx-auto mt-2 p-4 bg-red">
      {!isSubmitted ? (
        <div
          className={`transition-opacity duration-300 ${
            isFormVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-center">
            Input the quantity of each letter bead you have and press submit.
            The results will help you generate Taylor Swift related bracelet
            ideas.
          </p>
          <div className="grid grid-cols-10 gap-2 mt-8">
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
      ) : (
        <div
          className={`transition-opacity duration-300 ${
            isSubmitted ? "opacity-100" : "opacity-0"
          } ${isSubmitted ? "block" : "hidden"}`}
        >
          <div className="flex flex-col items-center">
            <p className="text-center">
              Scroll down to see your results! To input the letter count again{" "}
              <a onClick={handleReset} type="button">
                click here
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetInputs;
