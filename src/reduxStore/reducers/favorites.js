import { act } from "react-dom/test-utils";

let newArray = [];
const INITIAL_STATE = {
  favorites: []
};

export default function favoriteReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "ADD_FAVORITE_MOVIE":
      newArray.push(action.payload);
      return {
        ...state,
        favorites: newArray,
      };
    default:
      return state;
  }
}