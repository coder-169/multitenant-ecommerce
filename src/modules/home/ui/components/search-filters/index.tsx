"use client";

import React from "react";
import SearchInput from "./search-input";
import Categories from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import BreadcrumbNavigation from "./breadcrumb-navigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      style={{ backgroundColor: activeCategoryColor }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled={false} />
      <div className="hidden lg:block">
        <Categories />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
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
