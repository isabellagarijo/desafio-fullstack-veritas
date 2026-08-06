import { useEffect, useState } from "react";
import "./TaskForm.css";

function TaskForm({
  addTask,
  editingTask,
  saveTask,
  setEditingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;

    const task = {
      title,
      description,
      status: editingTask
        ? editingTask.status
        : "todo",
    };

    if (editingTask) {
      await saveTask({
        ...task,
        id: editingTask.id,
      });
    } else {
      await addTask(task);
    }

    setTitle("");
    setDescription("");
  }

  function cancelEdit() {
    setEditingTask(null);
    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>
        {editingTask ? "Editar tarefa" : "Nova tarefa"}
      </h2>

      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Descrição da tarefa"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <div className="form-buttons">
        <button type="submit" className="primary-button">
          {editingTask ? "Salvar" : "Adicionar"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="cancel-button"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;