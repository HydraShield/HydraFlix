import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    await axios.post("auth/login", user)
    .then(res => {
      res.data.isAdmin && dispatch(loginSuccess(res.data));
    });
  } catch (err) {
    dispatch(loginFailure());
  }
};
