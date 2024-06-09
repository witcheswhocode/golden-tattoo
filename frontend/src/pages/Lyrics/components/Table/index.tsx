import React, { useState } from "react";
import { TableRow } from "../DataTable";
import { useTheme } from "src/components/ThemeContext";

interface TableProps {
  data: TableRow[];
  openModal: (value: TableRow) => void;
  headerClick: (value: string) => void;
}
const Table: React.FC<TableProps> = (props: TableProps) => {
  const { theme } = useTheme();
  const handleOpenModal = (item: TableRow) => {
    props.openModal(item);
  };

  const handleHeaderClick = (column: string) => {
    props.headerClick(column);
  };

  return (
    <table className={`min-w-full border bg-${theme}-panel border-${theme}-button`}>
      <thead>
        <tr>
          <th
            className="w-1/2 border-b cursor-pointer text-sm p-2"
            onClick={() => handleHeaderClick("word")}
          >
            word
          </th>
          <th
            className="border-b cursor-pointer text-sm"
            onClick={() => handleHeaderClick("songcount")}
          >
            # of songs
          </th>
          <th className="border-b text-sm">categories</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={item.wordid}
            data-songcount={item.songcount}
            data-word={item.word}
            onClick={() => handleOpenModal(item)}
            className={`cursor-pointer ${
              index % 2 === 0 ? `bg-${theme}-panelSecondary` : "bg-white"
            }`}
          >
            <td className="border-b px-2 py-1">{item.word}</td>
            <td className="border-b text-center">{item.songcount}</td>
            <td className="border-b text-center">
              {item.categories?.split("|").map((cat, index) => (
                <span key={index} className={`category-${cat.trim()}`}></span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
