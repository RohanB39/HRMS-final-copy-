import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <span className="mx-2 dark:text-darkPrimaryText">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
