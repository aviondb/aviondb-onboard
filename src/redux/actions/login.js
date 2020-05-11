import types from "../constants";
//import { firebase } from "../../utils";

export const login = (payload) => (dispatch) => {
  dispatch({
    type: types.LOGIN,
    payload: payload,
  });
};
