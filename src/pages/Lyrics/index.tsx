import React, { useState, useEffect } from "react";
import DataTable, { ModalData } from "./components/DataTable";
import Modal from "./components/Modal";
import { TableRow } from "./components/DataTable";

const LyricsTable: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ModalData[] | null>(null);
  const [tableRows, setTableRows] = useState<TableRow[] | null>(null);

  const openModal = (item: TableRow) => {
    fetch(`http://localhost:3001/getLyrics/${item.wordid}`)
      .then((response) => response.json())
      .then((data) => setSelectedItem(data.data))
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    fetch("http://localhost:3001/words")
      .then((response) => response.json())
      .then((data) => setTableRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {tableRows && <DataTable data={tableRows} openModal={openModal} />}
      {selectedItem && <Modal data={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default LyricsTable;
