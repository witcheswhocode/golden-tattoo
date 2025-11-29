import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable, { ModalData } from "./components/DataTable";
import Modal from "./components/Modal";
import { apiUrl } from "src/helpers";
import { TableRow } from "./components/DataTable";
import { useTheme } from "src/components/ThemeContext";
import { useSearch, useNavigate } from "@tanstack/react-router";

const fetchWords = async (): Promise<TableRow[]> => {
  const response = await fetch(`${apiUrl}words`);

  if (!response.ok) {
    throw new Error("Failed to load words");
  }

  return response.json();
};

const fetchLyricsForWord = async (
  wordid: string | number
): Promise<ModalData[]> => {
  const response = await fetch(`${apiUrl}getLyrics/${wordid}`);

  if (!response.ok) {
    throw new Error("Failed to load lyrics for word");
  }

  const data = await response.json();
  return data.data;
};

const LyricsTable: React.FC = () => {
  const { theme } = useTheme();
  const search = useSearch({ from: "/lyrics" });
  const navigate = useNavigate();
  const selectedWord = search.selectedWord || "";
  const [modalContent, setModalContent] = useState<ModalData[] | null>(null);
  const {
    data: tableRows,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["words", "lyrics"],
    queryFn: fetchWords,
    staleTime: 1000 * 60 * 5,
  });

  const openModal = async (item: TableRow) => {
    navigate({
      search: ((prev: any) => ({
        ...prev,
        selectedWord: item.word,
      })) as any,
    });
    const lyrics = await fetchLyricsForWord(item.wordid);
    setModalContent(lyrics || null);
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
    if (!selectedWord) {
      setModalContent(null);
      return;
    }

    const loadLyrics = async () => {
      try {
        const lyrics = await fetchLyricsForWord(selectedWord);
        setModalContent(lyrics || null);
      } catch (err) {
        console.error("Error fetching modal data:", err);
        setModalContent(null);
        navigate({
          search: ((prev: any) => {
            const next = { ...prev };
            delete next.selectedWord;
            return next;
          }) as any,
        });
      }
    };

    loadLyrics();
  }, [selectedWord]);

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
      {isLoading && (
        <p className={`text-center text-${theme}-text`}>Loading words...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          {(error as Error)?.message ?? "Failed to load words"}
        </p>
      )}
      {tableRows && <DataTable data={tableRows} openModal={openModal} />}
      {modalContent && (
        <Modal data={modalContent} word={selectedWord} onClose={closeModal} />
      )}
    </div>
  );
};

export default LyricsTable;
