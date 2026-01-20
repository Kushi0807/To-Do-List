import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggle } = useContext(ThemeContext);

  const activeClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="header">
      <div className="brand">Smart To-Do</div>
      <nav className="nav">
        <NavLink to="/" className={activeClass} end>All</NavLink>
        <NavLink to="/completed" className={activeClass}>Completed</NavLink>
        <NavLink to="/about" className={activeClass}>About</NavLink>
      </nav>
      <div className="header-actions">
        <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
