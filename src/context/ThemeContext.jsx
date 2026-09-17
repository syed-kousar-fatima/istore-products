// context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const getStoredTheme = () => {
  try {
    return localStorage.getItem("iStore-theme") || "dark";
  } catch {
    return "dark";
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    root.dataset.theme = theme;

    localStorage.setItem("iStore-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const setDarkMode = () => setTheme("dark");
  const setLightMode = () => setTheme("light");

  const isDark = theme === "dark";
  const isLight = theme === "light";

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      setDarkMode,
      setLightMode,
      isDark,
      isLight,
    }),
    [theme, isDark, isLight]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};

export default ThemeContext;