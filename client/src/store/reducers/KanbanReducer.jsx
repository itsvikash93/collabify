import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export default kanbanSlice.reducer;

export const { getTasks, addTask, updateTask, deleteTask } =
  kanbanSlice.actions;
