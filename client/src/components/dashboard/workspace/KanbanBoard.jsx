import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddTask from "./task/AddTask";
import {
  asyncGetTasks,
  asyncUpdateTask,
  asyncAddTask,
  asyncDeleteTask,
} from "../../../store/actions/KanbanActions";
import DeleteConfirmation from "../delete/DeleteConfirmation";
import TaskDetails from "./task/TaskDetails";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const { tasks } = useSelector((state) => state.kanbanReducer);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const columns = [
    { status: "To-Do", title: "To Do" },
    { status: "In-Progress", title: "In Progress" },
    { status: "Done", title: "Done" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  const getTasks = useCallback(async () => {
    try {
      await dispatch(asyncGetTasks(workspaceId));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks. Retrying...");
      setTimeout(getTasks, 3000); // Retry mechanism
    }
  }, [dispatch]);

  const handleAddTask = (taskData) => {
    dispatch(asyncAddTask(workspaceId, taskData));
  };

  const handleTaskDelete = (taskId) => {
    dispatch(asyncDeleteTask(workspaceId, taskId));
  };

  const handleDragEnd = async (e) => {
    const { active, over } = e;

    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    const taskStatus = active.data.current.status;

    if (taskStatus === newStatus) return;
    await dispatch(asyncUpdateTask(workspaceId, taskId, newStatus));
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="h-full w-full relative rounded-md p-5 shadow-xl overflow-y-auto">
      <button
        className="px-3 py-2 bg-blue-600 text-white rounded absolute bottom-5 right-5 shadow-md flex items-center gap-2"
        onClick={() => setShowModal(true)}
      >
        <i className="ri-add-circle-line text-xl"></i>
        Add New Task
      </button>

      <AddTask
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddTask={handleAddTask}
      />

      <div className="flex gap-10 w-full ">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {columns.map((column, i) => (
            <Column
              key={i}
              column={column}
              tasks={tasks.filter((task) => task.status === column.status)}
              setSelectedTask={setSelectedTask}
              setShowTaskDetails={setShowTaskDetails}
              setShowDeleteConfirmation={setShowDeleteConfirmation}
            />
          ))}
        </DndContext>
      </div>

      {showTaskDetails && (
        <TaskDetails
          task={selectedTask}
          setShowTaskDetails={setShowTaskDetails}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          setSelectedTask={setSelectedTask}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmation
          itemId={selectedTask._id}
          itemName={selectedTask.title}
          onDelete={() => handleTaskDelete(selectedTask._id)}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
