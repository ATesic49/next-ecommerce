import React from "react";
import { prisma } from "./lib/db/prisma";
import ProductCard from "@/app/ProductCard";
import Link from "next/link";
import PriceTag from "./components/PriceTag";
import Image from "next/image";
import PaginationBar from "./components/PaginationBar";
interface HomeProps {
  searchParams: {
    page: string;
  };
}
const page = async ({ searchParams: { page = "1" } }: HomeProps) => {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content mr-auto flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="aspect-square w-full max-w-sm rounded-lg object-cover shadow-sm"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="max-w-[40em] py-6">{products[0].description} </p>
              <Link
                className="btn btn-primary"
                href={"/products/" + products[0].id}
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(currentPage === 1 ? 1 : 0).map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default page;
