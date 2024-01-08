import React, { useState } from "react";

export interface DataItem {
  id: number;
  name: string;
  age: number;
  email: string;
  // Add more properties as needed
}

interface DataTableProps {
  data: DataItem[];
  openModal: (value: DataItem) => void;
}

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const handleOpenModal = (item: DataItem) => {
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
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className="cursor-pointer"
          >
            <td className="border-b">{item.id}</td>
            <td className="border-b">{item.name}</td>
            <td className="border-b">{item.age}</td>
            <td className="border-b">{item.email}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
