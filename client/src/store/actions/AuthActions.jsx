import axios from "../../utils/axios";
import { signUp, login } from "../reducers/AuthReducer";

export const asyncSignUp = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/signup", userData);
    if (res.status === 201) {
      dispatch(signUp(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogin = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", userData);
    if (res.status === 200) {
      dispatch(login(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};
