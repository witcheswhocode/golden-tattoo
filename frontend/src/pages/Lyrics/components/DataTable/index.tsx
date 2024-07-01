import React, { useState } from "react";
import Pagination from "../Pagination";
import Table from "../Table";
import { useTheme } from "src/components/ThemeContext";
import { useMediaQuery } from "react-responsive"; // Import react-responsive library
import CategorySelector from "../CategorySelector";

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
  lyricbefore: string;
  lyricafter: string;
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

const allCategories = [
  "all categories",
  "parallels",
  "literature",
  "color",
  "queer",
  "date",
  "number",
  "explicit",
  "alcohol",
  "hiding",
  "secrets",
  "family",
  "body",
  "reflective-light",
  "place",
  "transportation",
  "person",
  "games",
  "spiritual",
  "elements",
  "space",
  "kingdom",
  "no category",
];

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(allCategories);
  const numberOfCategories = allCategories.length;
  const [clickedCategory, setClickedCategory] = useState<Boolean>(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const hasCommonElement = (arr1: string[], arr2: string[]): boolean => {
    return arr1.some((element) => arr2.includes(element));
  };

  const filteredData = props.data
    .filter((item) => {
      const matchesSearchTerm = item.otherwords
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length
        ? item.categories
          ? hasCommonElement(item.categories.split("|"), selectedCategories)
          : selectedCategories.includes("all categories")
        : true; // Always true if no category is selected

      return matchesSearchTerm && matchesCategory;
    })
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
      setSortOrder("desc");
    }
  };

  const handleUpdateCategories = (items: string[]) => {
    console.log(items)
    setClickedCategory(true);
    setSelectedCategories(items);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border-2 p-1 m-2 mb-4 md:w-1/3`}
        />
      </div>
      <CategorySelector allCategories={allCategories} handleFilterCategories={handleUpdateCategories} />
      <Table
        openModal={handleOpenModal}
        headerClick={handleHeaderClick}
        data={currentItems}
      />
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
