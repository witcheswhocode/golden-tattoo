import React, { useEffect, useState } from "react";
import { useTheme } from "src/components/ThemeContext";
import { useMediaQuery } from "react-responsive"; // Import react-responsive library
import { TableRow } from "../DataTable";

interface CategorySelectorProps {
  handleFilterCategories: (items: string[]) => void;
}

const allCategories = [
  "all categories",
  "parallels",
  "literature",
  "color",
  "queer",
  "date",
  "number",
  "explicit",
  "alcohol",
  "hiding",
  "secrets",
  "family",
  "body",
  "reflective-light",
  "place",
  "transportation",
  "person",
  "games",
  "spiritual",
  "elements",
  "space",
  "kingdom",
  "no category",
];

const CategorySelector: React.FC<CategorySelectorProps> = (
  props: CategorySelectorProps
) => {
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(allCategories);
  const numberOfCategories = allCategories.length;
  const [clickedCategory, setClickedCategory] = useState<Boolean>(false);

  const handleCategoryClick = (category: string) => {
    if (!clickedCategory) {
      setClickedCategory(true);
      setSelectedCategories([category]);
    }
    if (category === "all categories") {
      setClickedCategory(false);
      setSelectedCategories(allCategories);
    } else {
      if (selectedCategories.includes(category)) {
        // Deselect the category if it's already selected
        setSelectedCategories(selectedCategories.filter((c) => c === category));
      } else {
        // Select the category if it's not already selected
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    props.handleFilterCategories(selectedCategories);
  }, [selectedCategories]);

  return (
    <>
      <div className="relative w-full">
        <div
          className={`py-2 mb-2 ${
            theme === "ttpd"
              ? `bg-ttpd-background z-5 border-t-2 border-b-2 border-${theme}-tableBorder`
              : ""
          } fade-right${isMobile ? "" : "-none"}`}
        >
          <div className="all-categories flex flex-row flex-nowrap w-full overflow-auto gap-1 md:flex-wrap md:justify-center">
            {allCategories.map((category, index) => (
              <div
                className={`flex flex-nowrap justify-center items-center w-auto px-3 py-1 text-sm text-white rounded-full cursor-pointer whitespace-nowrap category-color-${
                  ["queer", "midnights"].includes(category)
                    ? category
                    : index > 7
                    ? `100`
                    : index
                }  ${selectedCategories.includes(category) ? "selected" : ""}`}
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySelector;
