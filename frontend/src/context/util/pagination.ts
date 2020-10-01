import React from "react";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export const DefaultPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
};

export const PaginationContext = React.createContext<PaginationState>(
  DefaultPagination
);
