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

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  console.log(totalPages)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (item: TableRow) => {
    props.openModal(item);
  };

  return (
    <>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b">word</th>
            <th className="border-b">song count</th>
            <th className="border-b">categories</th>
            {/* Add more columns as needed */}
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
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={Array.from(Array(props.data.length).keys()).map(x => x++)} totalItems={props.data.length} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange} />
    </>
  );
};

export default DataTable;
