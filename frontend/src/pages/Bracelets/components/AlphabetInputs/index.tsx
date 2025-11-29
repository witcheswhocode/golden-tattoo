import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import LoadingBeads from "src/components/LoadingBeads";
import CustomButton from "src/components/Button";
import { apiUrl } from "src/helpers";
import { useTheme } from "src/components/ThemeContext";

interface AlphabetInputProps {
  handleCombinationPossibilities: (value: string[] | null) => void;
  inputValues: { [key: string]: number };
  resultsRef: React.RefObject<HTMLDivElement>;
  setShowSparkles: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchBraceletIdeas = async (
  params: URLSearchParams
): Promise<string[]> => {
  const response = await fetch(
    `${apiUrl}getBraceletIdeas?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to load words");
  }

  const data = await response.json();
  return data.data.combinationList;
};

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

  const mutationSubmit = useMutation({
    mutationKey: ["fetchBraceletIdeas"],
    mutationFn: (params: URLSearchParams) => fetchBraceletIdeas(params),
    onMutate: () => {
      console.log("Starting mutation to fetch bracelet ideas");
      setIsLoading(true);
    },
    onSettled: () => {
      console.log("Mutation settled");
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      alert("There was an error fetching bracelet ideas. Please try again.");
    },
    onSuccess: (data) => {
      handleCombinationPossibilities(data);
      setIsFormVisible(false);
      setTimeout(() => setIsSubmitted(true), 300);
      setShowSparkles(true);

      setTimeout(() => {
        setIsSubmitted(true);
        if (resultsRef.current) {
          window.scrollTo({ top: 300, behavior: "smooth" });
        }
        setTimeout(() => setShowSparkles(false), 1000);
      }, 300);
    },
  });

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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    navigate({
      search: ((prev: any) => {
        const next = { ...prev };
        if (checked) {
          next.kidFriendly = true;
        } else {
          delete next.kidFriendly;
        }
        return next;
      }) as any,
    });
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

    mutationSubmit.mutate(params);
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
                    name="kidFriendly"
                    className="mr-1"
                    checked={!!search.kidFriendly}
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
