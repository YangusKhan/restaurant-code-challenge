import React from "react";
import { PaginationContext } from "../../context/util/pagination";
import "./Pagination.css";

interface Props<D> {
  onPageChange: (offset: number) => () => void;
  data: Array<D>;
  children: React.ReactNode;
}

export function Pagination<D>({ onPageChange, data, children }: Props<D>) {
  const { currentPage, itemsPerPage } = React.useContext(PaginationContext);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const prevButton = (
    <button
      className="pagination-prev btn-pagination"
      type="button"
      disabled={prevDisabled}
      onClick={onPageChange(-1)}
    >
      Prev Page
    </button>
  );
  const nextButton = (
    <button
      className="pagination-next btn-pagination"
      type="button"
      disabled={nextDisabled}
      onClick={onPageChange(1)}
    >
      Next Page
    </button>
  );
  return (
    <div className="pagination-container">
      <div className="pagination-button-container">
        {prevButton}
        {nextButton}
      </div>
      {children}
      <h5>{`Page ${currentPage} of ${totalPages}`}</h5>
    </div>
  );
}
