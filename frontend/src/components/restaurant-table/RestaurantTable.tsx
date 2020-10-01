import React from "react";
import "./RestaurantTable.css";
import { RestaurantInfo } from "./shared";
import {
  FilterContext,
  FilterState,
  DefaultFilters,
} from "../../context/restaurant-table/filters";
import {
  PaginationState,
  PaginationContext,
  DefaultPagination,
} from "../../context/util/pagination";
import { Pagination } from "../util/Pagination";

export interface Props {
  data: RestaurantInfo[];
}

export const Container: React.FC<Props> = function ({ data }) {
  const [activeFilters, setFilters] = React.useState<FilterState>(
    DefaultFilters
  );

  const [pagination, setPagination] = React.useState<PaginationState>(
    DefaultPagination
  );

  const onPageChange = React.useCallback(
    (offset: number) => {
      return function () {
        setPagination((prev) => {
          return { ...prev, currentPage: prev.currentPage + offset };
        });
      };
    },
    [setPagination]
  );

  const genreList = React.useMemo(() => {
    return data.reduce<Set<string>>((acc, cur) => {
      for (const genre of cur.genre.split(",")) {
        acc.add(genre);
      }
      return acc;
    }, new Set());
  }, [data]);

  const filteredData = React.useMemo(() => {
    return data.filter((r) => {
      if (activeFilters.genre.size) {
        const genreList = r.genre.split(",");
        if (!genreList.some((g) => activeFilters.genre.has(g))) return false;
      }
      if (activeFilters.state) {
        if (activeFilters.state !== r.state) return false;
      }
      if (activeFilters.search) {
        const search = activeFilters.search.toLowerCase();
        if (
          !(
            r.genre.toLowerCase().includes(search) ||
            r.city.toLowerCase().includes(search) ||
            r.name.toLowerCase().includes(search)
          )
        ) {
          return false;
        }
      }
      return true;
    });
  }, [activeFilters, data]);

  const paginatedData = React.useMemo(() => {
    const offset = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredData.slice(offset, offset + pagination.itemsPerPage);
  }, [filteredData, pagination]);

  return (
    <div className="restaurant-container">
      <FilterContext.Provider value={activeFilters}>
        <Filters genreList={genreList} updateFilters={setFilters} />
        <PaginationContext.Provider value={pagination}>
          <Pagination data={filteredData} onPageChange={onPageChange}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Phone</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <Body data={paginatedData} />
            </table>
          </Pagination>
        </PaginationContext.Provider>
      </FilterContext.Provider>
    </div>
  );
};

export interface FilterProps {
  genreList: Set<string>;
  updateFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const Filters: React.FC<FilterProps> = function ({
  genreList,
  updateFilters,
}) {
  const [searchValue, setSearchValue] = React.useState("");
  const onSearch = React.useCallback(() => {
    updateFilters((prevFilters) => {
      return { ...prevFilters, search: searchValue };
    });
  }, [searchValue, updateFilters]);
  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  const onCheckboxChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
      if (e.target.checked) {
        updateFilters((prevFilters) => {
          const genre = prevFilters.genre.add(e.target.value);
          return { ...prevFilters, genre };
        });
      } else {
        updateFilters((prevFilters) => {
          prevFilters.genre.delete(e.target.value);
          return { ...prevFilters };
        });
      }
    },
    [updateFilters]
  );

  const onSelectChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.persist();
      if (e.target.selectedOptions.length) {
        updateFilters((prevFilters) => {
          const state = e.target.selectedOptions[0].value;
          return { ...prevFilters, state };
        });
      }
    },
    [updateFilters]
  );

  const checkboxes = React.useMemo(() => {
    return Array.from(genreList).map((g) => {
      const id = `genre-${g}`;
      return (
        <div className="checkbox-container">
          <label htmlFor={id}>{g}</label>
          <input
            type="checkbox"
            id={id}
            value={g}
            onChange={onCheckboxChange}
          />
        </div>
      );
    });
  }, [genreList, onCheckboxChange]);

  return (
    <div className="filters">
      <div className="filter-container">
        <label htmlFor="state">State:</label>
        <select name="state" id="state" onChange={onSelectChange}>
          <option value="" selected={true}>
            All
          </option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
      <div className="filter-container checkbox-group">{checkboxes}</div>
      <div className="filter-container">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchValue}
          onChange={onSearchChange}
        />
        <input
          type="button"
          id="submitSearch"
          name="submitSearch"
          value="Run Search"
          onClick={onSearch}
        />
      </div>
    </div>
  );
};

export interface BodyProps {
  data: RestaurantInfo[];
}

export const Body: React.FC<BodyProps> = function ({ data }) {
  const rows = React.useMemo(() => {
    return data.map((r) => <Row key={r.id} data={r} />);
  }, [data]);

  return <tbody>{rows}</tbody>;
};

export interface RowProps {
  data: RestaurantInfo;
}

export const Row: React.FC<RowProps> = function ({ data }) {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.city}</td>
      <td>{data.state}</td>
      <td>{data.telephone}</td>
      <td>{data.genre}</td>
    </tr>
  );
};
