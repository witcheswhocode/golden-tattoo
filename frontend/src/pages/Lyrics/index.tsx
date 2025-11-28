import React, { useState, useEffect } from "react";
import DataTable, { ModalData } from "./components/DataTable";
import Modal from "./components/Modal";
import { apiUrl } from "src/helpers";
import { TableRow } from "./components/DataTable";
import { useTheme } from "src/components/ThemeContext";
import { useSearch, useNavigate } from "@tanstack/react-router";

const LyricsTable: React.FC = () => {
  const { theme } = useTheme();
  const search = useSearch({ from: "/lyrics" });
  const navigate = useNavigate();
  const selectedWord = search.selectedWord || "";
  const [modalContent, setModalContent] = useState<ModalData[] | null>(null);
  const [tableRows, setTableRows] = useState<TableRow[] | null>(null);

  const openModal = (item: TableRow) => {
    navigate({
      search: ((prev: any) => ({
        ...prev,
        selectedWord: item.word,
      })) as any,
    });
    fetch(`${apiUrl}getLyrics/${item.wordid}`)
      .then((response) => response.json())
      .then((data) => setModalContent(data.data))
      .catch((error) => console.error("Error fetching modal data:", error));
  };

  const closeModal = () => {
    setModalContent(null);
    navigate({
      search: ((prev: any) => {
        const next = { ...prev };
        delete next.selectedWord;
        return next;
      }) as any,
    });
  };

  useEffect(() => {
    fetch(`${apiUrl}words`)
      .then((response) => response.json())
      .then((data: any) => {
        setTableRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    if (selectedWord) {
      console.log("Fetching modal data for selectedWord:", selectedWord);
      fetch(`${apiUrl}getLyrics/${selectedWord}`)
        .then((response) => response.json())
        .then((data) => setModalContent(data.data))
        .catch((error) => console.error("Error fetching modal data:", error));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 md:w-2/3 lg:w-1/2 z-20">
      {/*<MetaTags
        title="lyrics - golden tattoo"
        description="Explore lyrical parallels and themes thoroughout Taylor Swift's discography."
        image="/assets/lover-meta-img.png"
      />*/}
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
      {modalContent && (
        <Modal data={modalContent} word={selectedWord} onClose={closeModal} />
      )}
    </div>
  );
};

export default LyricsTable;
