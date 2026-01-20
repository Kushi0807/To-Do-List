import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function TaskForm({ initial = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || "General");
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.split("T")[0] : "");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      titleRef.current.focus();
      return;
    }
    setError("");
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      dueDate: dueDate || null,
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h3>{initial ? "Edit Task" : "New Task"}</h3>

      <label>
        Title <span className="required">*</span>
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className={error ? "invalid" : ""}
        />
      </label>

      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
      </label>

      <label>
        Category
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>

      <label>
        Due date
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <Button type="submit">{initial ? "Save" : "Add"}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
