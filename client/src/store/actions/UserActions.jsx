import axios from "../../utils/axios";
import { getUserProfile } from "../reducers/UserReducer";
export const asyncGetUserProfile = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getUserProfile(res.data));
      });
  } catch (error) {
    console.log(error);
  }
};
