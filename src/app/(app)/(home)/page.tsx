import { caller } from "@/trpc/server";

const Home = async () => {
  const products = await caller.products.getMany();

  return <div>{JSON.stringify(products.docs, null, 2)}</div>;
};

export default Home;
