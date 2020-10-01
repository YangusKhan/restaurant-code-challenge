import React from "react";
import { PaginationContext } from "../../context/util/pagination";

export function usePagination<D>(data: Array<D>) {
  const pagination = React.useContext(PaginationContext);
}
