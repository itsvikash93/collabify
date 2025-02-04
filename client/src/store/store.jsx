import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import KanbanReducer from "./reducers/KanbanReducer";
import WorkspaceReducer from "./reducers/WorkspaceReducer";
export const store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    userReducer: UserReducer,
    kanbanReducer: KanbanReducer,
    workspaceReducer: WorkspaceReducer,
  },
});
