import Column from "./Column";

function Board({
  tasks,
  updateTaskStatus,
  deleteTask,
  editTask,
}) {
  const columns = [
    {
      title: "A Fazer",
      status: "todo",
    },
    {
      title: "Em Progresso",
      status: "doing",
    },
    {
      title: "Concluído",
      status: "done",
    },
  ];

  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default Board;