import "./TaskCard.css";

function TaskCard({ task, updateTaskStatus, deleteTask, editTask }) {

  function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <div className={`status-badge ${task.status}`}>
        {task.status === "todo" && "A Fazer"}
        {task.status === "doing" && "Em Progresso"}
        {task.status === "done" && "Concluído"}
      </div>

      <p>{task.description}</p>

      <div className="task-actions">
        <div className="main-actions">
          <button
            className="edit-button"
            onClick={() => editTask(task)}
          >
            Editar
          </button>

          <button
            className="delete-button"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>

        <div className="move-actions">

          {task.status !== "todo" && (
            <button
              onClick={() =>
                updateTaskStatus(task.id, "todo")
              }
            >
              A Fazer
            </button>
          )}

          {task.status !== "doing" && (
            <button
              onClick={() =>
                updateTaskStatus(task.id, "doing")
              }
            >
              Em Progresso
            </button>
          )}

          {task.status !== "done" && (
            <button
              onClick={() =>
                updateTaskStatus(task.id, "done")
              }
            >
              Concluído
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default TaskCard;