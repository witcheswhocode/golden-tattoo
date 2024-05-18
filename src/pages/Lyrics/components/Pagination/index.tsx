import React, { useState } from "react";

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

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div className="w-full text-center">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        {'<'}
      </button>
      {visiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => goToPage(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          &nbsp;&nbsp;{page}&nbsp;&nbsp;
        </button>
      ))}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
