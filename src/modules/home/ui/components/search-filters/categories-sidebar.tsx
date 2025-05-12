import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoriesSidebarProps {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  data: CustomCategory[];
}
const CategoriesSidebar = ({
  isOpen,
  onOpen,
  data,
}: CategoriesSidebarProps) => {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];
  const backgroundColor = selectedCategory?.color || "white";
  const handleOpenChange = (value: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpen(value);
  };
  const handleClickCategory = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };
  const handleBackClick = () => {
    console.log('called')
    setParentCategories(null);
    setSelectedCategory(null);
  };
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="transition-none p-0"
        style={{ backgroundColor }}
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left hover:bg-black hover:text-white flex items-center text-base p-4 font-medium"
            >
              <ChevronLeft className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleClickCategory(category)}
              className="w-full text-left hover:bg-black hover:text-white flex items-center justify-between text-base p-4 font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="" size-4 />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
