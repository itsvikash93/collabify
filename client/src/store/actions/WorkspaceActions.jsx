import axios from "../../utils/axios";
import {
  getWorkspaces,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../reducers/WorkspaceReducer";
import { toast } from "react-toastify";
export const asyncGetWorkspaces = () => (dispatch) => {
  try {
    axios.get("/workspaces").then((res) => {
      dispatch(getWorkspaces(res.data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const asyncAddWorkspace = (workspace) => (dispatch) => {
  try {
    axios.post("/workspaces", workspace).then((res) => {
      dispatch(addWorkspace(res.data));
      toast.success("Workspace added successfully");
    });
  } catch (error) {
    console.log(error);
    toast.error("Failed to add workspace");
  }
};

export const asyncUpdateWorkspace = (workspaceId, newName) => (dispatch) => {
  try {
    axios.put(`/workspaces/${workspaceId}`, { name: newName }).then((res) => {
      dispatch(updateWorkspace({ workspaceId, newName }));
      toast.success("Workspace updated successfully");
    });
  } catch (error) {
    console.log(error);
    toast.error("Failed to update workspace");
  }
};

export const asyncDeleteWorkspace = (workspaceId) => (dispatch) => {
  try {
    axios.delete(`/workspaces/${workspaceId}`).then((res) => {
      dispatch(deleteWorkspace(workspaceId));
      toast.success("Workspace deleted successfully");
    });
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete workspace");
  }
};
