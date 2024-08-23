"use client";
import React, { useTransition } from "react";
import { CarItemWithProduct } from "../lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../lib/db/format";

interface CartEntryProps {
  cartItem: CarItemWithProduct;
  setProductQuantityFunction: (
    productId: string,
    quantity: number,
  ) => Promise<void>;
}
const CartEntry = ({
  cartItem: { product, quantity },
  setProductQuantityFunction,
}: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const quantityOption: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOption.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div className="">
          <Link href={"/products/" + product.id} className="mb-4 font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantityFunction(product.id, newQuantity);
                });
              }}
              defaultValue={quantity}
              className="select-borderd select w-full max-w-[80px]"
              name=""
              id=""
            >
              <option value={0}> 0 (Remove)</option>
              {quantityOption}
            </select>{" "}
          </div>
          <div className="item-center flex gap-3">
            Total:{formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default CartEntry;
