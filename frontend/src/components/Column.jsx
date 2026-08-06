import TaskCard from "./TaskCard";

function Column({ title, status, tasks, updateTaskStatus, deleteTask }) {
  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div className="column">
      <h2>{title}</h2>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default Column;