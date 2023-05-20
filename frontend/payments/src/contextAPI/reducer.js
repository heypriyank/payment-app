export const initialState = {
  token: null,
  triggerChange: false,
  userData: {},
  isLoading: true
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.data,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.data
      }
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.data,
      };
    case "SET_TRIGGER_CHANGE":
      return {
        ...state,
        triggerChange: action.data,
      };

    default:
      return state;
  }
}

export default reducer;
