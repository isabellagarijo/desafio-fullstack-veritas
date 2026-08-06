import "./TaskCard.css";

function TaskCard({ task, updateTaskStatus, deleteTask, editTask }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

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
            onClick={() => deleteTask(task.id)}
          >
            Excluir
          </button>
        </div>

        <div className="move-actions">
          <button
            onClick={() =>
              updateTaskStatus(task.id, "todo")
            }
          >
            A Fazer
          </button>

          <button
            onClick={() =>
              updateTaskStatus(task.id, "doing")
            }
          >
            Em Progresso
          </button>

          <button
            onClick={() =>
              updateTaskStatus(task.id, "done")
            }
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;