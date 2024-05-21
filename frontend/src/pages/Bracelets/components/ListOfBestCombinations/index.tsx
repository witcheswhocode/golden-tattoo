import React, { useState, useEffect } from "react";
interface ListOfBestCombinationsProps {
  combinations: string[][] | null;
  title: string;
}

const ListOfBestCombinations: React.FC<ListOfBestCombinationsProps> = ({
  combinations,
  title,
}) => {
  return (
    <div className="p-4">
      <div className="font-bold">{title}</div>
      <div>
        {combinations?.map((item, index) => (
          <div className="border" key={index}>
            {item.map((word, wordIndex) => (
              <div key={wordIndex}>{word}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfBestCombinations;
