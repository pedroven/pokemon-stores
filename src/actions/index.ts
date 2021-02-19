interface Pokemon {
  name: string;
  id: string;
  price: number;
  amount?: number | 0;
}

export const addProduct = (product: Pokemon) => ({
  type: "ADD_PRODUCT",
  product
});

export const removeProduct = (product: Pokemon) => ({
  type: "REMOVE_PRODUCT",
  product
});

export const changeCartState = (open: boolean) => ({
  type: "CHANGE_CART_STATE",
  cartState: open
});
