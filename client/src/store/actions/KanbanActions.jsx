import axios from "../../utils/axios";
import {
  getTasks,
  updateTask,
  addTask,
  deleteTask,
} from "../reducers/KanbanReducer";
import { toast } from "react-toastify";
export const asyncGetTasks = (workspaceId) => (dispatch) => {
  try {
    axios.get(`/workspaces/${workspaceId}/tasks`).then((res) => {
      dispatch(getTasks(res.data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const asyncAddTask = (workspaceId, task) => async (dispatch) => {
  try {
    const res = await axios.post(`/workspaces/${workspaceId}/tasks`, task);
    dispatch(addTask(res.data));
    toast.success("Task added successfully");
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || "Failed to add task";
    toast.error(message);
    throw error;
  }
};

export const asyncUpdateTask =
  (workspaceId, taskId, updatedData) => async (dispatch, getState) => {
    let previousTasks;
    try {
      previousTasks = getState().kanbanReducer.tasks;
      dispatch(updateTask({ taskId, updatedData }));
      const res = await axios.put(
        `/workspaces/${workspaceId}/tasks/${taskId}`,
        updatedData
      );
      if (res.status == 200) toast.success("Task updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
      const task = previousTasks.find((task) => task._id === taskId);
      if (task) {
        // Rollback generically to entire previous task state
        dispatch(updateTask({ taskId, updatedData: task }));
      }
    }
  };

export const asyncDeleteTask =
  (workspaceId, taskId, setShowDeleteConfirmation) => (dispatch) => {
    try {
      axios.delete(`/workspaces/${workspaceId}/tasks/${taskId}`).then(() => {
        dispatch(deleteTask(taskId));
        setShowDeleteConfirmation(false);
        toast.success("Task deleted successfully");
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };
