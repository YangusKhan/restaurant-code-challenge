import React from "react";

export interface FilterState {
  genre: Set<string>;
  state: string | undefined;
  search: string;
}

export const DefaultFilters: FilterState = {
  genre: new Set(),
  state: undefined,
  search: "",
};

export const FilterContext = React.createContext<FilterState>(DefaultFilters);
