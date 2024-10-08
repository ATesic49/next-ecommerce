import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/app/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/app/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOprions";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Flowmazon" height={40} width={40}></Image>
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>

          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
