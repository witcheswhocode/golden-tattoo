import React, { useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";

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

const allCategories = ["parallels", "transportation", "queer"];

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortCategory, setSortCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = props.data
    .filter(
      (item) =>
        item.otherwords.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (sortCategory === null || (item.categories && item.categories.split('|').map(cat => cat.trim()).includes(sortCategory)))
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
    })
    .sort((a: any, b: any) => {
      if (sortColumn) {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        } else {
          const stringA = String(valueA).toLowerCase();
          const stringB = String(valueB).toLowerCase();

          return sortOrder === "asc"
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
        }
      }

      return 0; // No sorting column specified
    });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleCategoryClick = (category: string) => {
    console.log(category);
    if (category === sortCategory) {
      setSortCategory(null);
    } else {
      setSortCategory(category);
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
      {allCategories.map((category) => (
        <div
          className="cursor-pointer"
          key={category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
      <Table openModal={handleOpenModal} headerClick={handleHeaderClick} data={currentItems} />
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
