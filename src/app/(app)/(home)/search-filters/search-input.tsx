'use client'

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import CategoriesSidebar from "./categories-sidebar";
import { CustomCategory } from "../types";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  disabled?: boolean;
  data: CustomCategory[];
}
const SearchInput = ({ disabled, data }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        isOpen={isSidebarOpen}
        onOpen={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          placeholder="Search products"
          className="pl-8"
          disabled={disabled}
        />
      </div>
      {/* todo Add categories button and library button */}
      <Button onClick={()=>setIsSidebarOpen(true)} variant={"elevated"} className="shrink-0 size-12 flex lg:hidden">
        <ListFilterIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
