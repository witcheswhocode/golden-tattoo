import React, { useState, useEffect } from "react";
import { useTheme } from "src/components/ThemeContext";
import CategorySelector from "./components/CategorySelector";

export type Bracelet = {
  value: number;
  active: boolean;
  category: string[];
};

interface ListOfBraceletIdeasProps {
  braceletQuantities: {
    [key: string]: { value: number; active: boolean; category: string[] };
  };
  handleDecrement: (id: string) => void;
  handleIncrement: (id: string) => void;
}

const allCategories = ["all categories", "ttpd", "explicit"];

const ListOfBraceletIdeas: React.FC<ListOfBraceletIdeasProps> = ({
  braceletQuantities,
  handleDecrement,
  handleIncrement,
}) => {
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(allCategories);
  const numberOfCategories = allCategories.length;
  const [clickedCategory, setClickedCategory] = useState<Boolean>(false);
  const hasCommonElement = (arr1: string[], arr2: string[]): boolean => {
    return arr1.some((element) => arr2.includes(element));
  };
  function filterByCategories(
    data: { [key: string]: Bracelet },
    categories: string[]
  ): { [key: string]: Bracelet } {
    const filteredData: { [key: string]: Bracelet } = {};
    for (const key in data) {
    //console.log(key, data[key])
      if (
        data[key].category /*&&
        data[key].category.some((cat) => categories.includes(cat))*/
      ) {
        //console.log(data[key].category)
        filteredData[key] = data[key];
      } else {
        if (categories.includes("all categories")) {
          filteredData[key] = braceletQuantities[key];
        }
      }
    }

    return filteredData;
  }

  const filteredData = filterByCategories(braceletQuantities, allCategories);

  console.log(filteredData);

  const handleUpdateCategories = (items: string[]) => {
    console.log(items);
    setClickedCategory(true);
    setSelectedCategories(items);
  };
  return (
    <div className={`p-4 z-10`}>
      <CategorySelector
        allCategories={allCategories}
        handleFilterCategories={handleUpdateCategories}
      />
      {Object.keys(filteredData).map((key) => (
        <div
          key={key}
          className={`flex items-center justify-between bg-white p-2 rounded-md mb-4 z-10 ${
            braceletQuantities[key].active
              ? `text-${theme}-braceletItemText`
              : "text-disabled"
          }`}
        >
          <span>
            <p
              className={`text-sm md:text-md ${
                braceletQuantities[key].active
                  ? `text-${theme}-braceletItemText`
                  : "text-gray"
              }`}
            >
              {key}
            </p>
          </span>
          <div className="flex items-center text-sm">
            <button
              onClick={() => handleDecrement(key)}
              disabled={braceletQuantities[key].value === 0}
              className={`text-sm bg-${theme}-minus text-white p-2 rounded-l ${
                braceletQuantities[key].active &&
                braceletQuantities[key].value !== 0
                  ? ""
                  : "cursor-not-allowed"
              }`}
            >
              -
            </button>
            <span
              className={`px-4 w-10 text-${theme}-braceletItemText ${
                braceletQuantities[key].active ? `text-black` : "text-gray"
              }`}
            >
              {braceletQuantities[key].value}
            </span>
            <button
              onClick={() => handleIncrement(key)}
              disabled={!braceletQuantities[key].active}
              className={`text-sm text-white p-2 rounded-r ${
                braceletQuantities[key].active
                  ? `bg-${theme}-plus`
                  : "bg-disabled cursor-not-allowed"
              }`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfBraceletIdeas;
