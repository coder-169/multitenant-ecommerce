"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import SubCategoryMenu from "./subcategory-menu";
import useDropDownPosition from "./use-dropdown-position";
import Link from "next/link";
import { CustomCategory } from "../types";

interface CategoryDropdownProps {
  category: CustomCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}
const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropDownPosition(dropdownRef);
  const dropdownPosition = getDropdownPosition();
  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => setIsOpen(false);

  const catCheck = category.subcategories && category.subcategories?.length > 0;
  // Mobile Nav -> Need to be improved
  // const toggleDropdown = () =>{
  //   if(category.subcategories?.docs?.length){
  //     setIsOpen(!isOpen)
  //   }
  // }
  return (
    <div
      className="relative "
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={()=>toggleDropdown()}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "bg-white border-primary"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug} `}>
            {category.name}
          </Link>{" "}
        </Button>
        {catCheck && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-transparent border-b-black left-1/2 -translate-x-1/2 border-[10px]",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubCategoryMenu
        category={category}
        position={dropdownPosition}
        isOpen={isOpen}
      />
    </div>
  );
};

export default CategoryDropdown;
