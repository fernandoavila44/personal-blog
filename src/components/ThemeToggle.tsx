"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
    >
      <span>{theme === "light" ? "🌙" : "☀️"}</span>
      <span>{theme === "light" ? "Tema Oscuro" : "Tema Claro"}</span>
    </button>
  );
}
