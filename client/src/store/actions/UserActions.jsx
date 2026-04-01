import axios from "../../utils/axios";
import { getUserProfile } from "../reducers/UserReducer";
export const asyncGetUserProfile = () => (dispatch) => {
  try {
    const token = localStorage.getItem("collabifyToken");
    axios
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getUserProfile(res.data));
      });
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateUserProfile = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("collabifyToken");
    const res = await axios.put("/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserProfile(res.data));
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
