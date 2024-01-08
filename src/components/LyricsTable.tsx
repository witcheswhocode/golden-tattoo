import React, { useState } from "react";
import DataTable from "./DataTable";
import Modal from "./Modal";

interface DataItem {
  id: number;
  name: string;
  age: number;
  email: string;
}
const LyricsTable: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const openModal = (item: DataItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };
  const data: DataItem[] = [
    { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
    { id: 2, name: "Jane Doe", age: 30, email: "jane@example.com" },
    { id: 3, name: "Bob Smith", age: 28, email: "bob@example.com" },
    // Add more items as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <DataTable data={data} openModal={openModal} />
      {selectedItem && <Modal data={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default LyricsTable;
