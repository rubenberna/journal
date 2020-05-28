import { Types } from "../actions/types";

const listReducer = (state = { name: "Ruben Bernardes" }, action) => {
  switch (action.type) {
    case Types.SET_ACTIVE_ITEM:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default listReducer;
