import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collaborations: [],
  loading: false,
  error: null,
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  reducers: {
    fetchCollaborationsStart: (state) => {
      state.loading = true;
    },
    fetchCollaborationsSuccess: (state, action) => {
      state.collaborations = action.payload;
      state.loading = false;
    },
    fetchCollaborationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addCollaboration: (state, action) => {
      state.collaborations.push(action.payload);
    },
    updateCollaboration: (state, action) => {
      const index = state.collaborations.findIndex(
        (collab) => collab.id === action.payload.id
      );
      if (index !== -1) {
        state.collaborations[index] = action.payload;
      }
    },
  },
});

export const {
  fetchCollaborationsStart,
  fetchCollaborationsSuccess,
  fetchCollaborationsFailure,
  addCollaboration,
  updateCollaboration,
} = collaborationSlice.actions;

export default collaborationSlice.reducer;
