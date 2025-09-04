import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      type="button"
      className="rounded-full bg-gray-800/80 dark:bg-gray-700/80 px-3 py-2 flex items-center gap-2 shadow backdrop-blur hover:bg-gray-700 hover:dark:bg-gray-600 transition border border-gray-600"
      aria-label="Toggle dark/light mode"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? (
        <span className="text-xl text-yellow-400" title="Switch to Light Mode">
          ☀️
        </span>
      ) : (
        <span className="text-xl text-blue-400" title="Switch to Dark Mode">
          🌙
        </span>
      )}
    </button>
  );
}
