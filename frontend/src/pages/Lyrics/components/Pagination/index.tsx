import React, { useState } from "react";
import CustomButton from "src/components/Button";

interface PaginationProps {
  pages: number[];
  totalItems: number;
  itemsPerPage: number;
  handlePageChange: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  totalItems,
  itemsPerPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pages.length) {
      setCurrentPage(page);
      handlePageChange(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      handlePageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePageChange(currentPage - 1);
    }
  };

  const visiblePages = () => {
    const pageRange = 2;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="flex flex-row justify-center items-center w-full space-x-2 text-center my-4">
      <CustomButton
        text={"<"}
        onClick={goToPrevPage}
        disabled={currentPage === 1}
      />
      {visiblePages().map((page, index) => (
        <CustomButton
          text={`${page}`}
          onClick={() => goToPage(page)}
          selected={page === currentPage ? true : false}
        />
      ))}
      <CustomButton
        text={">"}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
