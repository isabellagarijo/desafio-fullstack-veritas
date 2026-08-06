import { useEffect, useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        {editingTask ? "Salvar" : "Adicionar"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={cancelEdit}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TaskForm;