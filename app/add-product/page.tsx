import Image from "next/image";
import { prisma } from "../lib/db/prisma";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const metadata = {
  title: "Add Product - Flowmazon ",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const imageUrl = formData.get("imageUrl")?.toString();
  if (!name || !description || !imageUrl)
    throw Error("Missing required fields");

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
    },
  });
}
redirect("/");

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");

  return (
    <>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>

        <input
          required
          name="imageUrl"
          type="url"
          placeholder="imageUrl"
          className="input input-bordered w-full"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <Button className="btn-block">Add Product</Button>
      </form>
    </>
  );
}
