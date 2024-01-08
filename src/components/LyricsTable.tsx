import React from "react";
import DataTable from "./DataTable";

const LyricsTable: React.FC = () => {
  // Define DataItem interface
  interface DataItem {
    id: number;
    name: string;
    age: number;
    email: string;
    // Add more properties as needed
  }
  const data: DataItem[] = [
    { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
    { id: 2, name: "Jane Doe", age: 30, email: "jane@example.com" },
    { id: 3, name: "Bob Smith", age: 28, email: "bob@example.com" },
    // Add more items as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <DataTable data={data} />
    </div>
  );
};

export default LyricsTable;
