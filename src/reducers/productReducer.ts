interface Pokemon {
  name: string;
  id: string;
  price: number;
  amount: number;
}

interface Action {
  type: string;
  product: Pokemon;
}

const initialState = {
  products: getProductsFromLocalStorage()
};

function getProductsFromLocalStorage() {
  let products = localStorage.getItem("products");
  if (products) {
    products = JSON.parse(products);
    return products;
  } else {
    return [];
  }
}

function incrementAmount(product: Pokemon) {
  product.amount += 1;
  return product;
}

export const productsReducer = (state = initialState, action: Action) => {
  let products = getProductsFromLocalStorage() as Pokemon[];
  switch (action.type) {
    case "ADD_PRODUCT":
      if (products && products.length > 0) {
        let foundedProduct = products.find(
          product => product.name === action.product.name
        );
        if (foundedProduct) {
          products = products.map(product =>
            product.name === action.product.name
              ? incrementAmount(product)
              : product
          );
        } else {
          products.push(action.product);
        }
        localStorage.setItem("products", JSON.stringify(products));
        return {
          ...state,
          products: products
        };
      } else {
        let newProducts = [];
        newProducts.push(action.product);
        localStorage.setItem("products", JSON.stringify(newProducts));
        return {
          ...state,
          products: newProducts
        };
      }

    case "REMOVE_PRODUCT":
      let newProducts = products.filter(
        product => product.name !== action.product.name
      );
      localStorage.setItem("products", JSON.stringify(newProducts));
      return {
        ...state,
        products: newProducts
      };

    case "CLEAR_PRODUCTS":
      localStorage.setItem("products", JSON.stringify([]));
      return {
        ...state,
        products: []
      };
    default:
      return state;
  }
};
