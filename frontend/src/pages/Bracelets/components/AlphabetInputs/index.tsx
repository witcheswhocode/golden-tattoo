import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import LoadingBeads from "src/components/LoadingBeads";
import CustomButton from "src/components/Button";
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
        ? "https://golden.tattoo/"
        : "http://localhost:3001/";

    const urlWithParams = `${apiUrl}getBraceletIdeas?${params.toString()}`;

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

    const urlWithParams1 = `${apiUrl}getBestBraceletCombos?${params.toString()}`;

    // Perform the fetch with the updated URL
    fetch(urlWithParams1)
      .then((response) => response.json())
      .then((data: any) => {
        handleMostLetterCombinationPossibilities(data.data.mostLettersUsed);
        handleMostBraceletCombinationPossibilities(
          data.data.mostBraceletOptions
        );
      })
      .catch((error) => console.error("Error fetching best combo data:", error))
  };

  const handleReset = () => {
    handleCombinationPossibilities(null);
    setIsSubmitted(false);

    setInputValues({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 0,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 0,
      q: 0,
      r: 0,
      s: 0,
      t: 0,
      u: 0,
      v: 0,
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    });
    setIsFormVisible(true);
  };

  useEffect(() => {
    setInputValues({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 0,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 0,
      q: 0,
      r: 0,
      s: 0,
      t: 0,
      u: 0,
      v: 0,
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    });
  }, []);

  return (
    <div className={`px-2`}>
      {isLoading ? (
        <div
          className={`bg-${theme}-panel text-${theme}-text rounded-lg space-y-4 border-solid border-2 border-${theme}-button shadow-${theme} mt-8 p-4`}
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
            className={`bg-${theme}-panel rounded-lg space-y-4 border-solid border-2 border-${theme}-button shadow-${theme} mt-4 p-4`}
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
                    <label
                      htmlFor={letter}
                      className={`mb-1 text-${theme}-panelText`}
                    >
                      {letter}
                    </label>
                    <input
                      type="text"
                      id={letter.toLowerCase()}
                      name={letter.toLowerCase()}
                      onChange={handleInputChange}
                      value={inputValues[letter.toLowerCase()] || ""}
                      className={`text-black border rounded w-10 h-8 p-2 text-center focus:ring focus:ring-blue-200 focus:outline-none`}
                    />
                  </div>
                );
              })}
              {/*<div className={`flex justify-between space-x-8 pt-8 py-2`}>
                <div className={`flex flex-row`}>
                  <label
                    className={`mr-2 flex justify-center items-center text-${theme}-panelText`}
                  >
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
                </div>
                <div className={`flex flex-row`}>
                  <label
                    className={`mr-2 flex justify-center items-center text-${theme}-panelText`}
                  >
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
            </div>*/}
            </div>
            <div className="flex justify-center items-center pt-2 mt-2">
              <CustomButton type="submit" text="Submit" />
            </div>
          </form>
        </div>
      ) : (
        <div
          className={`transition-opacity duration-300 ${
            isSubmitted ? "opacity-100" : "opacity-0"
          } ${isSubmitted ? "block" : "hidden"}`}
        >
          <div className="flex justify-end items-end">
            <CustomButton
              type="button"
              onClick={handleReset}
              text={"⬅️ Go back and start over"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetInputs;
