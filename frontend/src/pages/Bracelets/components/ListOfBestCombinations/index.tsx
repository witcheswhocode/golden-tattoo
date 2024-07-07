import React from "react";
import LoadingBeads from "src/components/LoadingBeads";
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

  if (combinations) {
    return (
      <div className="px-4 pb-2">
        <div className={`font-bold my-1 text-${theme}-panelText`}>{title}</div>
        <div className={`text-xs my-1 mb-2 text-${theme}-panelText`}>
          {desc}
        </div>
        <div className={`my-4 bg-white p-2 rounded-md text-center`}>
          {combinations?.map((item, index) => (
            <div className={`text-${theme}-tabTextActive`} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ListOfBestCombinations;
