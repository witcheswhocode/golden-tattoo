import React, { useState } from "react";

export interface TableRow {
  wordid: number;
  word: string;
  otherwords: string;
  categories: string;
  categorieshtml: string;
  songcount: number;
  wordcount: number;
  totalcount: number;
  active: number;
}

interface DataTableProps {
  data: TableRow[];
  openModal: (value: TableRow) => void;
}

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const handleOpenModal = (item: TableRow) => {
    props.openModal(item);
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border-b">ID</th>
          <th className="border-b">Name</th>
          <th className="border-b">Age</th>
          <th className="border-b">Email</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr
            key={item.wordid}
            onClick={() => handleOpenModal(item)}
            className="cursor-pointer"
          >
            <td className="border-b">{item.wordid}</td>
            <td className="border-b">{item.word}</td>
            <td className="border-b">{item.songcount}</td>
            <td className="border-b">{item.categories}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
