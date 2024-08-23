"use server";

import { createCart, getCart } from "@/app/lib/db/cart";
import { prisma } from "@/app/lib/db/prisma";
import { revalidatePath } from "next/cache";
export async function IncrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => {
    return item.productId === productId;
  });
  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: {
              id: articleInCart.id,
            },
            data: {
              quantity: { increment: 1 },
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            quantity: 1,
            productId,
          },
        },
      },
    });
  }
  revalidatePath("/products/[id]", "page");
}
