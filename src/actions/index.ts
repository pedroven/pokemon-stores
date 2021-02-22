interface Pokemon {
  name: string;
  id: string;
  price: number;
  amount: number;
  storeType: string;
}

export const addProduct = (product: Pokemon) => ({
  type: "ADD_PRODUCT",
  product
});

export const removeProduct = (product: Pokemon) => ({
  type: "REMOVE_PRODUCT",
  product
});

export const clearProducts = () => ({
  type: "CLEAR_PRODUCTS"
});

export const changesearchedName = (name: string) => ({
  type: "CHANGE_SEARCHED_NAME",
  searchedNameState: name
});
