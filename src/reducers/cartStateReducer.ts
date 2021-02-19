interface Action {
  type: string;
  cartState: boolean;
}

const initialState = {
  cartState: false
};

export const cartStateReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "CHANGE_CART_STATE":
      return {
        ...state,
        cartState: action.cartState
      };
    default:
      return state;
  }
};
