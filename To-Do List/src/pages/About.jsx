import React from "react";

export default function About() {
  return (
    <div className="about">
      <h2>About Smart To-Do Manager</h2>
      <p>
        A small single-page React application demonstrating task management features:
        adding, editing, deleting, categorization, search, filtering, progress indicator,
        theme switching, and localStorage persistence.
      </p>

      <h3>Author</h3>
      <p>Your name here — replace this with author details if you'd like.</p>

      <h3>Tech</h3>
      <ul>
        <li>React (hooks, context)</li>
        <li>React Router v6</li>
        <li>localStorage persistence</li>
        <li>CSS variables for theming</li>
      </ul>
    </div>
  );
}
