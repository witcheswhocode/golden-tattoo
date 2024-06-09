import React, { useState, useEffect } from "react";
import DataTable, { ModalData } from "./components/DataTable";
import Modal from "./components/Modal";
import { TableRow } from "./components/DataTable";

const LyricsTable: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModalData[] | null>(null);
  const [tableRows, setTableRows] = useState<TableRow[] | null>(null);

  const openModal = (item: TableRow) => {
    setSelectedWord(item.word);
    fetch(`http://localhost:3001/getLyrics/${item.wordid}`)
      .then((response) => response.json())
      .then((data) => setSelectedItem(data.data))
      .catch((error) => console.error("Error fetching modal data:", error));
      console.log(selectedItem)
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://golden-tattoo-a7c279f70d6d.herokuapp.com/"
        : "http://localhost:3001/";

    fetch(`${apiUrl}words`)
      .then((response) => response.json())
      .then((data) => setTableRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4 md:w-3/4 z-20">
      <p className="text-sm text-center p-2 mb-4">Explore Taylor Swift's lyrics by clicking on the table and filters. The data was collected from multiple sources, learn more about the data.</p>
      {tableRows && <DataTable data={tableRows} openModal={openModal} />}
      {selectedItem && <Modal data={selectedItem} word={selectedWord} onClose={closeModal} />}
    </div>
  );
};

export default LyricsTable;
