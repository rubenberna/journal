import listReducer from "./listReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  active: listReducer,
});

export default rootReducer;
