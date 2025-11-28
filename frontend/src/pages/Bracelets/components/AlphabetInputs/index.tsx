import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import LoadingBeads from "src/components/LoadingBeads";
import CustomButton from "src/components/Button";
import { apiUrl } from "src/helpers";
import { useTheme } from "src/components/ThemeContext";

// Alphabet lowercase letters
export const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[] | null) => void;
  inputValues: { [key: string]: number };
  resultsRef: React.RefObject<HTMLDivElement>;
  setShowSparkles: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlphabetInputs: React.FC<AlphabetInputProps> = ({
  inputValues,
  handleCombinationPossibilities,
  resultsRef,
  setShowSparkles,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const search = useSearch({ from: "/bracelets" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : Number(value);

    navigate({
      search: ((prev: any) => ({
        ...prev,
        [name.toUpperCase()]: numericValue,
      })) as any,
    });
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

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      const numericValue = value ? parseFloat(value as string) : 0;
      params.append(
        key.toLowerCase(),
        isNaN(numericValue)
          ? (value as string).toLowerCase()
          : numericValue.toString()
      );
    });

    // Append selected checkboxes values
    selectedOptions.forEach((option) => params.append("options", option));

    // URL params using TanStack Router
    // Only include letters with value > 0, and use uppercase keys
    const letterParamsObj: Record<string, number> = Object.entries(inputValues)
      .filter(([key, value]) => /^[a-z]$/.test(key) && value > 0)
      .reduce((acc, [key, value]) => {
        acc[key.toUpperCase()] = value;
        return acc;
      }, {} as Record<string, number>);
    if (Object.keys(letterParamsObj).length > 0) {
      navigate({
        search: (() => letterParamsObj) as any, // TypeScript workaround :(
      });
    }

    const urlWithParams = `${apiUrl}getBraceletIdeas?${params.toString()}`;

    await fetch(urlWithParams)
      .then((response) => response.json())
      .then((data: any) => {
        handleCombinationPossibilities(data.data.combinationList);
        setIsFormVisible(false);
        setTimeout(() => setIsSubmitted(true), 300);
        setShowSparkles(true);

        setTimeout(() => {
          setIsSubmitted(true);
          if (resultsRef.current) {
            const yOffset = -250;
            const y =
              resultsRef.current.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          setTimeout(() => setShowSparkles(false), 1000);
        }, 300);
      })
      .catch((error) => console.error("Error fetching modal data:", error))
      .finally(() => setIsLoading(false));
  };

  const handleReset = () => {
    handleCombinationPossibilities(null);
    setIsSubmitted(false);
    setIsFormVisible(true);

    // Remove all search params from the URL
    navigate({
      search: (() => ({})) as any,
    });
  };

  useEffect(() => {
    // Fill input values from search params
    const newValues: { [key: string]: number } = {};
    LETTERS.forEach((letter) => {
      const upper = letter.toUpperCase();
      if (
        search &&
        typeof search[upper] === "number" &&
        !isNaN(search[upper])
      ) {
        newValues[letter] = search[upper];
      } else {
        newValues[letter] = 0;
      }
    });
  }, [search]);

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
                      type="number"
                      min={0}
                      max={55}
                      id={letter.toLowerCase()}
                      name={letter.toLowerCase()}
                      onChange={handleInputChange}
                      value={inputValues[letter.toLowerCase()] || ""}
                      className={`text-black border rounded w-10 h-8 p-2 text-center focus:ring focus:ring-blue-200 focus:outline-none`}
                    />
                  </div>
                );
              })}
              <div className={`flex justify-between space-x-8 pt-8 py-2 w-72`}>
                <div className={`flex flex-row`}>
                  <label
                    className={`mr-2 flex justify-center items-center text-${theme}-panelText`}
                  >
                    kids friendly
                  </label>
                  <input
                    type="checkbox"
                    id="kids"
                    name="options"
                    value="kids"
                    className="mr-1"
                    onChange={handleCheckboxChange}
                  />
                </div>
                {/*<div className={`flex flex-row`}>
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
                </div>*/}
              </div>
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
