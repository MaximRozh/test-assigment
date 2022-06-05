export const updatedCartItems = (cartItems: any, newItem: any) => {
  const isExist = cartItems.find((item: any) => item._id === newItem._id);
  if (isExist) {
    return cartItems.map((item: any) => {
      return item._id === newItem._id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  } else {
    return [...cartItems, { ...newItem, quantity: 1 }];
  }
};
