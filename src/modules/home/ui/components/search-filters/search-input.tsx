"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheck, ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import CategoriesSidebar from "./categories-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps {
  disabled?: boolean;
}
const SearchInput = ({ disabled }: SearchInputProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useQuery(trpc.auth.session.queryOptions());
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
          className="pl-8 bg-white"
          disabled={disabled}
        />
      </div>
      <Button
        onClick={() => setIsSidebarOpen(true)}
        variant={"elevated"}
        className="shrink-0 size-12 flex lg:hidden"
      >
        <ListFilterIcon />
      </Button>
      {session?.user && (
        <Button asChild variant={"elevated"}>
          <Link href="/">
            <BookmarkCheck />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
