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

export const asyncAddTask = (workspaceId, task) => (dispatch) => {
  try {
    console.log(task, workspaceId);
    axios.post(`/workspaces/${workspaceId}/tasks`, task).then((res) => {
      dispatch(addTask(res.data));
      toast.success("Task added successfully");
    });
  } catch (error) {
    console.log(error);
    toast.error("Failed to add task");
  }
};

export const asyncUpdateTask =
  (workspaceId, taskId, newStatus) => async (dispatch, getState) => {
    let previousTasks;
    try {
      previousTasks = getState().kanbanReducer.tasks;
      // console.log(previousTasks);
      dispatch(updateTask({ taskId, newStatus }));
      const res = await axios.put(
        `/workspaces/${workspaceId}/tasks/${taskId}`,
        {
          status: newStatus,
        }
      );
      if (res.status == 200) toast.success("Task moved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to move task");
      const task = previousTasks.find((task) => task._id === taskId);
      if (task) {
        dispatch(updateTask({ taskId, status: task.status }));
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
