import { ProductInterface } from "../types/Product";

export const updatedCartItems = (
  cartItems: ProductInterface[],
  newItem: ProductInterface
) => {
  const isExist = cartItems.find((item) => item._id === newItem._id);
  if (isExist) {
    return cartItems.map((item) => {
      return item._id === newItem._id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  } else {
    return [...cartItems, { ...newItem, quantity: 1 }];
  }
};
