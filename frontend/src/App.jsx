import { useEffect, useState } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import "./App.css";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function addTask(task) {
    const newTask = await createTask(task);

    setTasks((oldTasks) => [
      ...oldTasks,
      newTask,
    ]);
  }

  async function updateTaskStatus(id, newStatus) {
    const task = tasks.find(
      (task) => task.id === id
    );

    const updatedTask = await updateTask(id, {
      ...task,
      status: newStatus,
    });

    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id
          ? updatedTask
          : task
      )
    );
  }

  async function removeTask(id) {
    await deleteTask(id);

    setTasks((oldTasks) =>
      oldTasks.filter(
        (task) => task.id !== id
      )
    );
  }

  return (
    <div>
      <h1>Mini Kanban</h1>

      <TaskForm addTask={addTask} />

      <Board
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={removeTask}
      />
    </div>
  );
}

export default App;