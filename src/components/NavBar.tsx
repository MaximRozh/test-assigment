import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from ".";
import style from "../styles/NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks";
import { openCart } from "../store/cart";
import { ProductInterface } from "../types/Product";

const Navbar = () => {
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const openSideCart = () => {
    dispatch(openCart());
  };

  const totalInCart = useMemo(
    () =>
      cartItems.reduce(
        (acc: number, next: ProductInterface) => acc + next.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <div className={style["navbar-container"]}>
      <p className={style["logo"]}>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </p>
      <p>
        <Link href="/category">
          <a>Categoty</a>
        </Link>
      </p>
      <button
        type="button"
        className={style["cart-icon"]}
        onClick={openSideCart}
      >
        <AiOutlineShopping />
        <span className={style["cart-item-qty"]}>{totalInCart}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
