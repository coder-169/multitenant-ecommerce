"use client";

import React from "react";
import SearchInput from "./search-input";
import Categories from "./categories";

const SearchFilters = () => {
  return (
    <div
      style={{ backgroundColor: "#F5F5F5" }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled={false} />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
export const SearchFiltersLoading = () => {
  return (
    <div
      style={{ backgroundColor: "#F5F5F5" }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled={true} />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};

export default SearchFilters;
