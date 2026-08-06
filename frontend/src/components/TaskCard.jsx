function TaskCard({ task, updateTaskStatus, deleteTask, editTask }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <div>
        <button
          onClick={() =>
            editTask(task)
          }
        >
          Editar
        </button>

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

        <button
          onClick={() =>
            deleteTask(task.id)
          }
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;