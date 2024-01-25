import React, { useState } from "react";
import { TableRow } from "./DataTable";

interface TableProps {
  data: TableRow[];
  openModal: (value: TableRow) => void;
  headerClick: (value: string) => void;
}
const Table: React.FC<TableProps> = (props: TableProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleOpenModal = (item: TableRow) => {
    props.openModal(item);
  };

  const handleHeaderClick = (column: string) => {
    props.headerClick(column);
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th
            className="border-b cursor-pointer"
            onClick={() => handleHeaderClick("word")}
          >
            word
          </th>
          <th
            className="border-b cursor-pointer"
            onClick={() => handleHeaderClick("songcount")}
          >
            song count
          </th>
          <th className="border-b">categories</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr
            key={item.wordid}
            onClick={() => handleOpenModal(item)}
            className="cursor-pointer"
          >
            <td className="border-b">{item.word}</td>
            <td className="border-b">{item.songcount}</td>
            <td className="border-b">{item.categories}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
