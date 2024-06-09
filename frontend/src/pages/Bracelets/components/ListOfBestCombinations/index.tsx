import React from "react";
import { useTheme } from "src/components/ThemeContext";

interface ListOfBestCombinationsProps {
  combinations: string[][] | null;
  title: string;
  desc: string;
}

const ListOfBestCombinations: React.FC<ListOfBestCombinationsProps> = ({
  combinations,
  title,
  desc,
}) => {
  const { theme } = useTheme();
  return (
    <div className="px-4 pb-2">
      <div className={`font-bold my-1 text-${theme}-panelText`}>{title}</div>
      <div className={`text-xs my-1 mb-2 text-${theme}-panelText`}>{desc}</div>
      <div>
        {combinations?.map((item, index) => (
          <div className={`my-4 bg-white p-2 rounded-md text-center`} key={index}>
            {item.map((word, wordIndex) => (
              <div className={`text-${theme}-tabTextActive`} key={wordIndex}>{word}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfBestCombinations;
