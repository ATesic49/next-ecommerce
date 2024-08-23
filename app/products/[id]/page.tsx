import PriceTag from "@/app/components/PriceTag";
import { prisma } from "@/app/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { IncrementProductQuantity } from "./actions";

interface productPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: productPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + "- Flowmazon",
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

const Product = async ({ params: { id } }: productPageProps) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      ></Image>
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag className={"mt-4"} price={product.price} />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          incrementProductQuantity={IncrementProductQuantity}
          productId={product.id}
        />
      </div>
    </div>
  );
};

export default Product;
