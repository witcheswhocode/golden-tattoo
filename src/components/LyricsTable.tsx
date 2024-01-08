import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { TableRow } from "./DataTable";

const LyricsTable: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null);
  const [tableRows, setTableRows] = useState<TableRow[] | null>(null);

  const openModal = (item: TableRow) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setTableRows(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {tableRows && <DataTable data={tableRows} openModal={openModal} />}
      {selectedItem && <Modal data={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default LyricsTable;
