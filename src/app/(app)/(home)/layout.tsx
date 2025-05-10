import React from "react";
import { Footer, Navbar } from "./components";
import SearchFilters from "./search-filters";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate subcategories , subCategories[0]. will be a category type
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of depth 1 it will be a category type
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
