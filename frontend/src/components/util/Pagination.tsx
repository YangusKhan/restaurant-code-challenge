import React from "react";
import { PaginationContext } from "../../context/util/pagination";

interface Props<D> {
  onPageChange: (offset: number) => () => void;
  data: Array<D>;
  children: React.ReactNode;
}

export function Pagination<D>({ onPageChange, data, children }: Props<D>) {
  const { currentPage, itemsPerPage } = React.useContext(PaginationContext);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const prevButton =
    currentPage === 1 ? null : (
      <button
        className="pagination-prev btn-pagination"
        type="button"
        onClick={onPageChange(-1)}
      >
        Prev Page
      </button>
    );

  return (
    <>
      <div className="pagination-container">
        {prevButton}
        <button
          className="pagination-next btn-pagination"
          type="button"
          onClick={onPageChange(1)}
        >
          Next Page
        </button>
      </div>
      {children}
      <h5>{`Page ${currentPage} of ${totalPages}`}</h5>
    </>
  );
}
