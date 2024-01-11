import React, { useState } from "react";
import Pagination from "./Pagination";

export interface TableRow {
  wordid: number;
  word: string;
  otherwords: string;
  categories: string;
  categorieshtml: string;
  songcount: number;
  wordcount: number;
  totalcount: number;
  active: number;
}

export interface ModalData {
  lyricid: number;
  lyric: string;
  subtext: string;
  lyrichtml: string;
  categories: string;
  album: string;
  albumshort: string;
  alb: string;
  song: string;
}

interface DataTableProps {
  data: TableRow[];
  openModal: (value: TableRow) => void;
}

const getConsecutiveMatches = (str: string, searchTerm: string) => {
  let count = 0;
  let maxCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === searchTerm[count]) {
      count++;
      maxCount = Math.max(maxCount, count);
    } else {
      count = 0;
    }
  }

  return maxCount;
};

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = props.data
    .filter((item) =>
      item.otherwords.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const startsWithSearchTermA = a.otherwords
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      const startsWithSearchTermB = b.otherwords
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());

      if (startsWithSearchTermA && !startsWithSearchTermB) {
        return -1;
      } else if (!startsWithSearchTermA && startsWithSearchTermB) {
        return 1;
      } else {
        // If both or neither start with the search term, compare consecutive character matches
        const consecutiveMatchesA = getConsecutiveMatches(
          a.otherwords.toLowerCase(),
          searchTerm.toLowerCase()
        );
        const consecutiveMatchesB = getConsecutiveMatches(
          b.otherwords.toLowerCase(),
          searchTerm.toLowerCase()
        );

        return consecutiveMatchesB - consecutiveMatchesA; // Sort in descending order of consecutive matches
      }
    }).sort((a: any, b: any) => {
      if (sortColumn) {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        } else {
          const stringA = String(valueA).toLowerCase();
          const stringB = String(valueB).toLowerCase();

          return sortOrder === "asc" ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
        }
      }

      return 0; // No sorting column specified
    });;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (item: TableRow) => {
    props.openModal(item);
  };


  const handleHeaderClick = (column: string) => {
    if (sortColumn === column) {
      // Toggle the sort order if clicking on the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorting column and default to ascending order
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b cursor-pointer"
              onClick={() => handleHeaderClick("word")}>word</th>
            <th className="border-b cursor-pointer"
              onClick={() => handleHeaderClick("songcount")}>song count</th>
            <th className="border-b">categories</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr
              key={item.wordid}
              onClick={() => handleOpenModal(item)}
              className="cursor-pointer"
            >
              <td className="border-b">{item.word}</td>
              <td className="border-b">{item.songcount}</td>
              <td className="border-b">{item.categories}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pages={Array.from(Array(props.data.length).keys()).map((x) => x++)}
        totalItems={props.data.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default DataTable;
