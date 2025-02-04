import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;

export const { getUserProfile } = userSlice.actions;
