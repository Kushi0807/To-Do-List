import React, { useEffect, useMemo, useRef, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { storage } from "../utils/storage";

const STORAGE_KEY = "st_tasks_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function AllTasks() {
  const [tasks, setTasks] = useState(() => storage.get(STORAGE_KEY, []));
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const searchRef = useRef(null);

  useEffect(() => {
    storage.set(STORAGE_KEY, tasks);
  }, [tasks]);

  useEffect(() => {
    // focus the search on mount
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(tasks.map((t) => t.category || "General"));
    return ["All", ...Array.from(set)];
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: uid(),
      title: task.title,
      description: task.description || "",
      category: task.category || "General",
      completed: false,
      createdAt: Date.now(),
      dueDate: task.dueDate || null,
    };
    setTasks((s) => [newTask, ...s]);
    setShowModal(false);
  };

  const updateTask = (id, updates) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    setEditingTask(null);
    setShowModal(false);
  };

  const removeTask = (id) => {
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filtered = tasks
    .filter((t) => (query ? t.title.toLowerCase().includes(query.toLowerCase()) : true))
    .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
    .filter((t) => (statusFilter === "all" ? true : statusFilter === "completed" ? t.completed : !t.completed))
    .sort((a, b) => {
      if (sortBy === "newest") return b.createdAt - a.createdAt;
      if (sortBy === "oldest") return a.createdAt - b.createdAt;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div>
      <div className="toolbar">
        <div className="left">
          <input
            ref={searchRef}
            className="input"
            placeholder="Search tasks by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="right">
          <Button onClick={() => { setEditingTask(null); setShowModal(true); }}>+ Add Task</Button>
        </div>
      </div>

      <div className="progress-row">
        <div className="progress-label">Progress: {completedCount}/{tasks.length} completed</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="task-list">
        {filtered.length === 0 ? (
          <div className="empty">No tasks to show. Try adding one!</div>
        ) : (
          filtered.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onEdit={() => {
                setEditingTask(t);
                setShowModal(true);
              }}
              onDelete={() => removeTask(t.id)}
              onToggle={() => toggleComplete(t.id)}
            />
          ))
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <TaskForm
          initial={editingTask}
          onCancel={() => setShowModal(false)}
          onSubmit={(data) => {
            if (editingTask) updateTask(editingTask.id, data);
            else addTask(data);
          }}
        />
      </Modal>
    </div>
  );
}
