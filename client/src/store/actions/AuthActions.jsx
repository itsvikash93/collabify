import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { signUp, login } from "../reducers/AuthReducer";

export const asyncSignUp =
  (userData, signupSuccessCallback) => async (dispatch) => {
    try {
      const res = await axios.post("/auth/signup", userData);
      if (res?.status === 201) {
        dispatch(signUp(res?.data));
        localStorage.setItem("collabifyToken", res?.data?.token);
        toast.success(res?.data?.message);

        if (signupSuccessCallback) {
          signupSuccessCallback();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const asyncLogin = (userData, loginSuccessCallback) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", userData);
    if (res?.status === 200) {
      dispatch(login(res?.data));
      localStorage.setItem("collabifyToken", res?.data?.token);
      toast.success(res?.data?.message);

      if (loginSuccessCallback) {
        loginSuccessCallback();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
