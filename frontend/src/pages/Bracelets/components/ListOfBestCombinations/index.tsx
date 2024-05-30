import React, { useState, useEffect } from "react";
interface ListOfBestCombinationsProps {
  combinations: string[][] | null;
  title: string;
  desc: string;
}

const ListOfBestCombinations: React.FC<ListOfBestCombinationsProps> = ({
  combinations,
  title,
  desc
}) => {
  return (
    <div className="p-4">
      <div className="font-bold my-1">{title}</div>
      <div className="text-xs my-1 mb-2">{desc}</div>
      <div>
        {combinations?.map((item, index) => (
          <div className="my-4" key={index}>
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
