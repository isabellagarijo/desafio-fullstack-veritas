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
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  async function loadTasks() {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
      setError("");
    } catch {
      setError("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(task) {
    try {
      const newTask = await createTask(task);

      setTasks((oldTasks) => [
        ...oldTasks,
        newTask,
      ]);

      showMessage("Tarefa adicionada com sucesso!");
    } catch {
      setError("Erro ao criar tarefa");
    }
  }

  async function saveTask(task) {
    try {
      const updatedTask = await updateTask(
        task.id,
        task
      );

      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === updatedTask.id
            ? updatedTask
            : item
        )
      );

      setEditingTask(null);

      showMessage("Tarefa atualizada com sucesso!");
    } catch {
      setError("Erro ao editar tarefa");
    }
  }

  function editTask(task) {
    setEditingTask(task);
  }

  async function updateTaskStatus(id, newStatus) {
    try {
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

      showMessage("Status da tarefa atualizado!");
    } catch {
      setError("Erro ao mover tarefa");
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);

      setTasks((oldTasks) =>
        oldTasks.filter(
          (task) => task.id !== id
        )
      );

      showMessage("Tarefa excluída com sucesso!");
    } catch {
      setError("Erro ao excluir tarefa");
    }
  }

  return (
    <div>
      <h1>Mini Kanban</h1>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {loading && <p>Carregando tarefas...</p>}

      {error && <p>{error}</p>}

      {!loading && (
        <>
          <TaskForm
            addTask={addTask}
            editingTask={editingTask}
            saveTask={saveTask}
            setEditingTask={setEditingTask}
          />

          <Board
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            deleteTask={removeTask}
            editTask={editTask}
          />
        </>
      )}
    </div>
  );
}

export default App;