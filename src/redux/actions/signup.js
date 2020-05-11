import types from "../constants";
//import { firebase } from "../../utils";

export const signup = (payload) => (dispatch) => {
  const { email, password } = payload;
  /* firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            dispatch({
                type: types.SIGNUP,
                payload: {
                    email: data.user.email,
                    uid: data.user.uid,
                },
            });
        })
        .catch(function (error) {
            // Handle Errors here.
            console.error(error);
            alert(error.message);
        }); */
};
