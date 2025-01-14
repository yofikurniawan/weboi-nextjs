import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPagination = () => {
    const pagination: JSX.Element[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    // First page
    pagination.push(
      <li key="first">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          className={currentPage === 1 ? "disabled" : ""}
        >
          1
        </a>
      </li>
    );

    // Ellipsis if there is a gap before current page
    if (startPage > 2) {
      pagination.push(
        <li key="start-ellipsis">
          <span>...</span>
        </li>
      );
    }

    // Pages between start and end
    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            className={currentPage === i ? "current_page" : ""}
          >
            {i}
          </a>
        </li>
      );
    }

    // Ellipsis if there is a gap after current page
    if (endPage < totalPages - 1) {
      pagination.push(
        <li key="end-ellipsis">
          <span>...</span>
        </li>
      );
    }

    // Last page
    pagination.push(
      <li key="last">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPages);
          }}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          {totalPages}
        </a>
      </li>
    );

    return pagination;
  };

  return (
    <div className="pagination_wrap pt-40">
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "disabled" : ""}
          >
            <i className="far fa-long-arrow-left" />
          </a>
        </li>
        {renderPagination()}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            <i className="far fa-long-arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;