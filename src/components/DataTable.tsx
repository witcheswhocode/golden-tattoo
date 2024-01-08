import React, { useState } from "react";
import Modal from "./Modal";

export interface DataItem {
  id: number;
  name: string;
  age: number;
  email: string;
  // Add more properties as needed
}

interface DataTableProps {
  data: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const openModal = (item: DataItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };
  return (
    <>
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
          {data.map((item) => (            
          <tr key={item.id} onClick={() => openModal(item)} className="cursor-pointer">
              <td className="border-b">{item.id}</td>
              <td className="border-b">{item.name}</td>
              <td className="border-b">{item.age}</td>
              <td className="border-b">{item.email}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && <Modal data={selectedItem} onClose={closeModal} />}
    </>
  );
};

export default DataTable;
