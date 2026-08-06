import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  updateTaskStatus,
  deleteTask,
  editTask,
}) {
  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div className="column">
      <h2>
        {title} ({filteredTasks.length})
      </h2>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default Column;