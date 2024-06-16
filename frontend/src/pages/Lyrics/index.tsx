import React, { useState, useEffect } from "react";
import DataTable, { ModalData } from "./components/DataTable";
import Modal from "./components/Modal";
import MetaTags from "src/components/MetaTags";
import { TableRow } from "./components/DataTable";
import { useTheme } from "src/components/ThemeContext";

const LyricsTable: React.FC = () => {
  const { theme } = useTheme();
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModalData[] | null>(null);
  const [tableRows, setTableRows] = useState<TableRow[] | null>(null);

  const openModal = (item: TableRow) => {
    setSelectedWord(item.word);
    fetch(`http://localhost:3001/getLyrics/${item.wordid}`)
      .then((response) => response.json())
      .then((data) => setSelectedItem(data.data))
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://golden.tattoo/"
        : "http://localhost:3001/";

    fetch(`${apiUrl}words`)
      .then((response) => response.json())
      .then((data: any) => {
        setTableRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4 md:w-2/3 lg:w-1/2 z-20">
      <MetaTags
        title="lyrics - golden tattoo"
        description="Explore lyrical parallels and themes thoroughout Taylor Swift's discography."
        image="/assets/lover-meta-img.png"
      />
      <p
        className={`text-sm text-center p-2 mb-4 ${
          theme === "ttpd"
            ? `bg-ttpd-background z-10 border-t-2 border-b-2 border-${theme}-tableBorder`
            : ""
        } text-${theme}-text`}
      >
        Explore Taylor Swift's lyrics by clicking on the table and filters. The
        data was collected from multiple sources, learn more about the data.
      </p>
      {tableRows && <DataTable data={tableRows} openModal={openModal} />}
      {selectedItem && (
        <Modal data={selectedItem} word={selectedWord} onClose={closeModal} />
      )}
    </div>
  );
};

export default LyricsTable;
