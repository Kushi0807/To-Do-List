import React, { Suspense, lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import AllTasks from "./pages/AllTasks";
import { ThemeContext } from "./context/ThemeContext"; // to support light/dark theme

// Lazy load secondary pages
const Completed = lazy(() => import("./pages/Completed"));
const About = lazy(() => import("./pages/About"));

export default function App() {
  const { theme } = useContext(ThemeContext); // get current theme

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "light"
          ? "bg-blue-100 text-gray-800"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
