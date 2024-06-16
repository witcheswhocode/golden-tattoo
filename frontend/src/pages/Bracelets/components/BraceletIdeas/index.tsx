import React, { useState, useEffect } from "react";
import LetterCount from "../LetterCount";
import BraceletSelection from "../BraceletSelection";
import ListOfBraceletIdeas from "../ListOfBraceletIdeas";
import ListOfBestCombinations from "../ListOfBestCombinations";
import Tabs from "src/components/Tabs";
import Tab from "src/components/Tabs/components/Tab";
import ExpandableDiv from "../ExpandableDiv";
import LoadingBeads from "src/components/LoadingBeads";

interface Bracelet {
  name: string;
}

interface BraceletIdeasProps {
  bracelets: string[];
  mostLettersUsed: string[][] | null;
  mostBraceletOptions: string[][] | null;
  letters: { [key: string]: number };
}

const BraceletIdeas: React.FC<BraceletIdeasProps> = ({
  bracelets,
  mostLettersUsed,
  mostBraceletOptions,
  letters,
}) => {
  const [braceletQuantities, setBraceletQuantities] = useState<{
    [key: string]: { value: number; active: boolean };
  }>(
    bracelets.reduce((acc: any, bracelet) => {
      acc[bracelet] = { value: 0, active: true };
      return acc;
    }, {})
  );
  const [braceletSelection, setBraceletSelection] = useState<{
    [key: string]: number;
  }>();
  const [availableLetters, setAvailableLetters] = useState<{
    [key: string]: number;
  }>(letters);

  const letterTotal = Object.keys(letters).reduce((total, letter) => {
    return total + letters[letter];
  }, 0);
  const [lettersLeft, setLettersLeft] = useState<number>(letterTotal);

  const handleIncrement = (id: string) => {
    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: { value: prevQuantities[id].value + 1, active: true },
    }));

    setBraceletSelection((prevSelection) => ({
      ...(prevSelection || {}), // Use an empty object as a default if prevQuantities is null
      [id]: prevSelection && prevSelection[id] ? prevSelection[id] + 1 : 1,
    }));

    const updatedLetters = id
      .replace(/[^A-Z0-9]/gi, "")
      .split("")
      .reduce((acc: any, c) => {
        acc[c.toLowerCase()] =
          ((acc[c.toLowerCase()]
            ? acc[c.toLowerCase()]
            : availableLetters[c.toLowerCase()]) || 0) - 1;
        return acc;
      }, {});

    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  const handleDecrement = (id: string) => {
    if (braceletQuantities[id].value === 0) {
      return;
    }

    setBraceletQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: { value: prevQuantities[id].value - 1, active: true }, // Assuming you want to decrement the value
    }));

    setBraceletSelection((prevSelection) => {
      const updatedSelection = {
        ...(prevSelection || {}),
        [id]: prevSelection && prevSelection[id] ? prevSelection[id] - 1 : 0,
      };

      // Remove entry if value is 0
      if (updatedSelection[id] === 0) {
        delete updatedSelection[id];
      }

      return updatedSelection;
    });

    const updatedLetters = id
      .replace(/[^A-Z0-9]/gi, "")
      .split("")
      .reduce((acc: any, c) => {
        if (availableLetters.hasOwnProperty(c.toLowerCase())) {
          acc[c.toLowerCase()] =
            ((acc[c.toLowerCase()]
              ? acc[c.toLowerCase()]
              : availableLetters[c.toLowerCase()]) || 0) + 1;
        }
        return acc;
      }, {});

    setAvailableLetters((prevAvailableLetters) => ({
      ...(prevAvailableLetters || {}),
      ...updatedLetters,
    }));
  };

  function countOccurrences(str: string, letter: string): number {
    let count: number = 0;
    for (let i: number = 0; i < str.length; i++) {
      if (str[i].toLowerCase() === letter.toLowerCase()) {
        count++;
      }
    }
    return count;
  }

  useEffect(() => {
    setBraceletQuantities((prevBraceletQuantities) => {
      let prev = { ...prevBraceletQuantities };
      Object.keys(prev).forEach((key) => {
        // loop through bracelet options
        let temp = key.replaceAll(" ", "").length; // count of letters that are needed left
        Object.keys(availableLetters).forEach((letter) => {
          // loop through available letter counts
          const num = countOccurrences(key.toLowerCase(), letter.toLowerCase()); // number of times the letter shows up in the word
          const countLetters = availableLetters[letter]; // number of available letter
          if (num !== 0 && countLetters === 0) {
            // word had the letter, letter count does not have any
            prev[key].active = false;
            return;
          } else if (num > countLetters) {
            // word has more letters than the letter count
            prev[key].active = false;
            return;
          } else if (num > 0 && countLetters >= num) {
            // word has more than one of the letters, the letter count has more than the word needs
            temp = temp - num;
            if (temp === 0) {
              prev[key].active = true;
            }
          }
        });
      });

      // Sorting by the 'active' field
      const sortedBraceletQuantities = Object.entries(prev)
        .sort(([, a], [, b]) => (a.active === b.active ? 0 : a.active ? -1 : 1)) // Changed to -1, 0, 1
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      return sortedBraceletQuantities;
    });

    let newTotalLetter = 0;
    Object.keys(availableLetters).forEach((letter) => {
      newTotalLetter = newTotalLetter + availableLetters[letter];
    });
    setLettersLeft(newTotalLetter);
  }, [availableLetters]);

  return (
    <div className="p-4">
      <LetterCount
        availableLetters={availableLetters}
        letterTotal={letterTotal}
        lettersLeft={lettersLeft}
      />
      <div className="flex items-center justify-center">
        <ExpandableDiv
          count={braceletSelection && Object.keys(braceletSelection).length}
        >
          <BraceletSelection
            braceletSelection={braceletSelection || {}}
            braceletQuantities={braceletQuantities}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        </ExpandableDiv>
      </div>

      <Tabs>
        <Tab label="Build Your Own">
          <ListOfBraceletIdeas
            braceletQuantities={braceletQuantities}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        </Tab>
        <Tab label="Optimized">
          (
          {mostLettersUsed && mostBraceletOptions ? (
            <>
              <ListOfBestCombinations
                combinations={mostLettersUsed}
                title={"Use the Most Letters"}
                desc={
                  "This list gives you the variation that will use the most beads."
                }
              />
              <ListOfBestCombinations
                combinations={mostBraceletOptions}
                title={"Make the Most Bracelets"}
                desc={
                  "This is a list a various combinations you can try to make the most bracelets."
                }
              />
            </>
          ) : (
            <>
              <LoadingBeads />
            </>
          )}
          )
        </Tab>
      </Tabs>
    </div>
  );
};

export default BraceletIdeas;
