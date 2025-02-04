import axios from "../../utils/axios";
import { signUp, login } from "../reducers/AuthReducer";

export const asyncSignUp = (userData) => (dispatch) => {
  try {
    axios.post("/auth/signup", userData).then((res) => {
      dispatch(signUp(res.data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogin = (userData) => (dispatch) => {
  try {
    axios.post("/auth/login", userData).then((res) => {
      dispatch(login(res.data));
    });
  } catch (error) {
    console.log(error);
  }
};
