import React, { useEffect, useState, useMemo } from "react";
import Pagination from "../Pagination";
import Table from "../Table";
import { useTheme } from "src/components/ThemeContext";
import { useMediaQuery } from "react-responsive"; // Import react-responsive library
import { useSearch, useNavigate } from "@tanstack/react-router";

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
  const search = useSearch({ from: "/lyrics" });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const hasCommonElement = (arr1: string[], arr2: string[]): boolean => {
    return arr1.some((element) => arr2.includes(element));
  };

  const selectedCategories = useMemo(() => {
    if (search.categories?.length === 1 && search.categories[0] === "all categories") {
      return allCategories;
    }
    else if (search.categories && search.categories.length > 0) {
      return search.categories;
    }
  }, [search.categories]);

  const filteredData = props.data
    .filter((item) => {
      const matchesSearchTerm = item.otherwords
        .toLowerCase()
        .includes(search.searchTerm?.toLowerCase() || ""); // Default to empty string if searchTerm is undefined

      const matchesCategory = selectedCategories?.length
        ? item.categories
          ? hasCommonElement(item.categories.split("|"), selectedCategories)
          : selectedCategories.includes("all categories")
        : true; // Always true if no category is selected

      return matchesSearchTerm && matchesCategory;
    })
    .sort((a, b) => {
      const startsWithSearchTermA = a.otherwords
        .toLowerCase()
        .startsWith(search.searchTerm?.toLowerCase() || "");
      const startsWithSearchTermB = b.otherwords
        .toLowerCase()
        .startsWith(search.searchTerm?.toLowerCase() || "");

      if (startsWithSearchTermA && !startsWithSearchTermB) {
        return -1;
      } else if (!startsWithSearchTermA && startsWithSearchTermB) {
        return 1;
      } else {
        // If both or neither start with the search term, compare consecutive character matches
        const consecutiveMatchesA = getConsecutiveMatches(
          a.otherwords.toLowerCase(),
          search.searchTerm?.toLowerCase() || ""
        );
        const consecutiveMatchesB = getConsecutiveMatches(
          b.otherwords.toLowerCase(),
          search.searchTerm?.toLowerCase() || ""
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

  const handleCategoryClick = (category: string) => {
    // special handling for UX when "all categories" is selected
    // and user selects a specific category, it will only show that one category (and add to if they select more)
    if (search.categories[0] === "all categories") {
      navigate({
        search: ((prev: any) => ({
          ...prev,
          categories: [category],
        })) as any,
      });
      return;
    }
    if (category === "all categories") {
      if (search.categories?.length === 1 && search.categories[0] === "all categories") {
        return; // user is selecting "all categories" when it's already selected, do nothing
      }
      navigate({
        search: ((prev: any) => ({
          ...prev,
          categories: ["all categories"],
        })) as any,
      });
    } else {
      if (selectedCategories?.includes(category)) {
        // deselect the category 
        navigate({
          search: ((prev: any) => {
            const next = { ...prev };
            const updatedCategories = selectedCategories.filter((c) => c !== category);
            if (updatedCategories.length > 0) {
              next.categories = updatedCategories;
            } else {
              delete next.categories;
            }
            return next;
          }) as any,
        });
      } else {
        // select the category 
        navigate({
          search: ((prev: any) => ({
            ...prev,
            categories: [...(prev.categories || []), category],
          })) as any,
        });
      }
    }
  };
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust the breakpoint as needed

  // clean up url in special case of empty search term on load
  useEffect(() => {
    if ("searchTerm" in search && search.searchTerm === "") {
      navigate({
        search: ((prev: any) => {
          const next = { ...prev };
          delete next.searchTerm;
          return next;
        }) as any,
      });
    }
  }, [search.searchTerm, navigate]);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search.searchTerm ?? ""}
          onChange={(e) => {
            const newSearchTerm = e.target.value;
            navigate({
              search: ((prev: any) => {
                const next = { ...prev };
                if (newSearchTerm.length > 0) {
                  next.searchTerm = newSearchTerm;
                } else {
                  delete next.searchTerm;
                }
                return next;
              }) as any,
            });
          }}
          className={`border-2 p-1 m-2 mb-4 md:w-1/3`}
        />
      </div>
      <div className="relative w-full">
        <div
          className={`py-2 mb-2 ${
            theme === "ttpd"
              ? `bg-ttpd-background z-5 border-t-2 border-b-2 border-${theme}-tableBorder`
              : ""
          } fade-right${isMobile ? "" : "-none"}`}
        >
          <div className="all-categories flex flex-row flex-nowrap w-full overflow-auto gap-1 md:flex-wrap md:justify-center">
            {allCategories.map((category, index) => (
              <div
                className={`flex flex-nowrap justify-center items-center w-auto px-3 py-1 text-sm text-white rounded-full cursor-pointer whitespace-nowrap category-color-${
                  ["queer", "midnights"].includes(category)
                    ? category
                    : index > 7
                    ? `100`
                    : index
                }  ${selectedCategories?.includes(category) ? "selected" : ""}`}
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
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
