import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./context";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));

    // Apply theme only to body background, not the entire document
    if (isDark) {
      document.body.style.backgroundColor = "#212529";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#212529";
    }
  }, [isDark]);

  const toggleTheme = (): void => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
