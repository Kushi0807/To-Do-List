import React from "react";
import Button from "./Button";

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`} aria-live="polite">
      <div className="task-main">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className="badge">{task.category}</span>
            {task.dueDate && <span className="due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
          </div>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>

      <div className="task-actions">
        {onToggle && (
          <Button onClick={onToggle} variant="ghost">
            {task.completed ? "Undo" : "Done"}
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant="outline">Edit</Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} variant="danger">Delete</Button>
        )}
      </div>
    </article>
  );
}
