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
      const { taskId, updatedData } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task._id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedData };
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
