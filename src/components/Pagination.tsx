import React, { useState } from 'react';

interface PaginationProps {
  pages: number[];
  handlePageChange: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pages, handlePageChange }) => {
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

  return (
    <div>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        {'<'}
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => goToPage(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
      <button onClick={goToNextPage} disabled={currentPage === pages.length}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
