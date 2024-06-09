import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import LoadingBeads from "src/components/LoadingBeads";
import { useTheme } from "src/components/ThemeContext";

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[] | null) => void;
  handleMostLetterCombinationPossibilities: (value: string[][]) => void;
  handleMostBraceletCombinationPossibilities: (value: string[][]) => void;
  inputValues: { [key: string]: number };
  setInputValues: (value: { [key: string]: number | any }) => void;
  resultsRef: React.RefObject<HTMLDivElement>;
  setShowSparkles: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlphabetInputs: React.FC<AlphabetInputProps> = ({
  inputValues,
  handleCombinationPossibilities,
  handleMostLetterCombinationPossibilities,
  handleMostBraceletCombinationPossibilities,
  setInputValues,
  resultsRef,
  setShowSparkles,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    const formData = new FormData(event.target as HTMLFormElement);

    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      const numericValue = parseFloat(value as string);
      params.append(
        key.toLowerCase(),
        isNaN(numericValue)
          ? (value as string).toLowerCase()
          : numericValue.toString()
      );
    });

    // Append selected checkboxes values
    selectedOptions.forEach((option) => params.append("options", option));

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com/"
        : "http://localhost:3001/";

    const urlWithParams = `${apiUrl}getAllCombinations?${params.toString()}`;

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
        setShowSparkles(true); // Show sparkles

        setTimeout(() => {
          setIsSubmitted(true); // Show the success message and reset button
          if (resultsRef.current) {
            const yOffset = -250; // Adjust the offset value as needed
            const y =
              resultsRef.current.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          setTimeout(() => setShowSparkles(false), 1000); // Hide sparkles after 1 second
        }, 300); // Wait for the animation to complete before showing the new content
      })
      .catch((error) => console.error("Error fetching modal data:", error))
      .finally(() => setIsLoading(false)); // Set loading to false after fetch is completed
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
    <div className={`container mx-auto mt-2 p-4 md:w-3/4`}>
      {isLoading ? (
        <div
          className={`bg-${theme}-panel rounded-lg space-y-4 border-solid border-2 border-${theme}-button shadow-${theme} mt-8 p-4`}
        >
          <LoadingBeads />
        </div>
      ) : !isSubmitted ? (
        <div
          className={`transition-opacity duration-300 ${
            isFormVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <form
            onSubmit={handleFormSubmit}
            className={`bg-${theme}-panel rounded-lg space-y-4 border-solid border-2 border-${theme}-button shadow-${theme} mt-8 p-4`}
          >
            <h1
              className={`text-2xl font-bold text-center text-${theme}-panelText`}
            >
              Bracelet Idea Generator
            </h1>
            <p className={`text-center text-${theme}-panelText`}>
              Input the quantity of each letter bead you have and press submit.
              The results will help you generate Taylor Swift related bracelet
              ideas.
            </p>
            <div className={`grid grid-cols-6 gap-2`}>
              {Array.from({ length: 26 }, (_, i) => {
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={letter}
                    className={`flex flex-col items-center font-bold`}
                  >
                    <label htmlFor={letter} className={`mb-1 text-${theme}-panelText`}>
                      {letter}
                    </label>
                    <input
                      type="text"
                      id={letter.toLowerCase()}
                      name={letter.toLowerCase()}
                      onChange={handleInputChange}
                      value={inputValues[letter.toLowerCase()] || ""}
                      className={`text-black border rounded w-8 h-8 p-2 text-center focus:ring focus:ring-blue-200 focus:outline-none`}
                    />
                  </div>
                );
              })}
              <div className="flex justify-cemter items-center pt-8 py-2">
                <label className="mr-2 flex justify-center items-center">
                  explicit
                </label>
                <input
                  type="checkbox"
                  id="explicit"
                  name="options"
                  value="explicit"
                  className="mr-1"
                  onChange={handleCheckboxChange}
                />
                <label className="mr-2 flex justify-center items-center">
                  acronyms
                </label>
                <input
                  type="checkbox"
                  id="acronyms"
                  name="options"
                  value="acronyms"
                  className="mr-1"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <div className="flex justify-center items-center pt-2 mt-2">
              <button
                type="submit"
                className={`bg-${theme}-button text-${theme}-buttonText px-4 py-2 rounded`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className={`transition-opacity duration-300 ${
            isSubmitted ? "opacity-100" : "opacity-0"
          } ${isSubmitted ? "block" : "hidden"}`}
        >
          <div className="flex">
            <button
              type="button"
              onClick={handleReset}
              className={`text-sm bg-${theme}-button text-${theme}-buttonText px-4 py-2 rounded shadow-${theme} border border-${theme}-border`}
            >
              ⬅️ Go back and start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetInputs;
