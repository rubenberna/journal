import { Types } from "./types";

export const setActiveItem = (name) => {
  return {
    type: Types.SET_ACTIVE_ITEM,
    payload: name,
  };
};
