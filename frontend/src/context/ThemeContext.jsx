import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("dercy-theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "neon");
    if (theme === "dark") root.classList.add("dark");
    if (theme === "neon") { root.classList.add("dark", "neon"); }
    localStorage.setItem("dercy-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);