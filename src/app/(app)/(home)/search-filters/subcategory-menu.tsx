import { Category } from "@/payload-types";
import Link from "next/link";
import React from "react";
import { CustomCategory } from "../types";

interface SubCategoryMenuProps {
  category: CustomCategory;
  position: { top: number; left: number } | undefined;
  isOpen: boolean;
}
const SubCategoryMenu = ({
  category,
  position,
  isOpen,
}: SubCategoryMenuProps) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories?.length === 0
  )
    return null;

  const backgroundColor = category.color || "#f5f5f5";
  return (
    <div
      className="fixed z-100 mt-2"
      style={{ top: position?.top, left: position?.left }}
    >
      <div className="h-3 w-60 " />
      <div
        style={{ backgroundColor: backgroundColor }}
        className="w-60 overflow-hidden rounded-md text-black border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-2 -translate-y-2"
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.id}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black font-medium flex justify-between items-center text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMenu;
