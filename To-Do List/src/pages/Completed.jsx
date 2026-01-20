import React from "react";
import { Link } from "react-router-dom";
import { storage } from "../utils/storage";
import TaskCard from "../components/TaskCard";

export default function Completed() {
  const tasks = storage.get("st_tasks_v1", []);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {completed.length === 0 ? (
        <div className="empty">No completed tasks yet. <Link to="/">Go add some</Link>.</div>
      ) : (
        <div className="task-list">
          {completed.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}
