import React, { FC } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import style from "../styles/Cart.module.scss";
import { ProductInterface } from "../types/Product";
import SanityImage from "./SanityImage";

interface CartItemProp {
  item: ProductInterface;
  handleChanhgeQuntity: (product: ProductInterface, type: string) => void;
  handleRemoveItem: (id: number) => void;
}

const CartItem: FC<CartItemProp> = ({
  item,
  handleChanhgeQuntity,
  handleRemoveItem,
}) => {
  console.log(item.image[0]);
  const price = item.quantity * item.price;
  return (
    <div className={style["product"]} key={item._id}>
      <div className={style["item-descriptions"]}>
        <div className={style["cart-product-image"]}>
          <SanityImage imageData={item.image[0]} alt="cart-product-image" />
        </div>
        <div className={style["item-info"]}>
          <h5>{item.name}</h5>
          <h4>${price}</h4>
        </div>
      </div>

      <div className={style["item-actions"]}>
        <button
          type="button"
          className={style["remove-item"]}
          onClick={() => handleRemoveItem(item._id)}
        >
          <AiOutlineClose />
        </button>
        <div className={style["item-amount"]}>
          <span className={style["num"]}>Amount: {item.quantity}</span>
          <div>
            <button
              className={style["item-amount-button"]}
              onClick={() => handleChanhgeQuntity(item, "dec")}
            >
              <AiOutlineMinus />
            </button>
            <button
              className={style["item-amount-button"]}
              onClick={() => handleChanhgeQuntity(item, "inc")}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
