interface Action {
  type: string;
  searchedNameState: string;
}

const initialState = {
  searchedNameState: ""
};

export const searchedNameStateReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "CHANGE_SEARCHED_NAME":
      return {
        ...state,
        searchedNameState: action.searchedNameState
      };
    default:
      return state;
  }
};
