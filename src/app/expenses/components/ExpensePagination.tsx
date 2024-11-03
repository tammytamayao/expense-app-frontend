import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const ExpensePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex-grow flex justify-center">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50 text-sm"
        >
          {"<"}
        </button>
        <span className="mx-2 text-black">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50 text-sm"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ExpensePagination;
