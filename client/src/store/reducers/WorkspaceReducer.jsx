import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
  loading: false,
  error: null,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    getWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action) => {
      const { workspaceId, newName } = action.payload;
      const workspace = state.workspaces.find(
        (workspace) => workspace._id === workspaceId
      );
      if (workspace) {
        workspace.name = newName;
      }
    },
    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace._id !== action.payload
      );
    },
  },
});

export default workspaceSlice.reducer;

export const { getWorkspaces, addWorkspace, updateWorkspace, deleteWorkspace } =
  workspaceSlice.actions;
