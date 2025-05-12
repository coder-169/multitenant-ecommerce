import React from "react";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}
const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  return (
    <div>
      <p>Category {category}</p>
      <p>Sub Category {subcategory}</p>
    </div>
  );
};

export default Page;
